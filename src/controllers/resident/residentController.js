'use strict'

const db = require('../../../models')
const paginate = require('../../helpers/paginate')
const buildOrder = require('../../helpers/order')
const { Op, Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const getResidents = async (req, res) => {
    try {
        const { page, page_size, sort_by, sort_order, global_search } = req.query

        const order = buildOrder({
            sortBy: sort_by,
            sortDirection: sort_order,
        })

        const where = {}
        if (global_search) {
            where[Op.or] = [
                { full_name: { [Op.like]: `%${global_search}%` } },
                { nik: { [Op.like]: `%${global_search}%` } }
            ]
        }

        const result = await paginate(db.Resident, {
            page,
            pageSize: page_size,
            order,
            where
        })

        return res.json(result)
    } catch (error) {
        console.error('Error fetching residents:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createResident = async (req, res) => {
    try {
        const {
            full_name,
            nik,
            gender,
            religion,
            place_of_birth,
            date_of_birth,
            rt,
            rw,
            village,
            marital_status,
        } = req.body

        if (!full_name || !nik || !gender || !religion || !place_of_birth || !date_of_birth || !rt || !rw || !marital_status) {
            return res.errorResponse(
                'Validasi gagal',
                { fields: 'Field wajib tidak lengkap' },
                400
            )
        }

        const existing = await db.Resident.findOne({ where: { nik } })
        if (existing) {
            return res.errorResponse(
                'Validasi gagal',
                { nik: 'NIK sudah terdaftar' },
                409
            )
        }

        let formal_foto = null;
        if (req.file) {
            formal_foto = `uploads/residents/${req.file.filename}`;
        }

        const resident = await db.Resident.create({
            full_name,
            nik,
            gender,
            religion,
            place_of_birth,
            date_of_birth,
            rt,
            rw,
            village,
            marital_status,
            formal_foto,
        })

        return res.successResponse('Data warga berhasil dibuat', resident, 201)
    } catch (error) {
        console.error('Error creating resident:', error)
        return res.errorResponse('Internal server error', null, 500)
    }
}

const updateResident = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const resident = await db.Resident.findByPk(id);
        if (!resident) {
            return res.errorResponse('Data tidak ditemukan', null, 404);
        }

        const errors = validateResidentInput(req.body);
        if (Object.keys(errors).length > 0) {
            return res.errorResponse('Validasi Gagal', errors, 422);
        }

        if (updateData.nik && updateData.nik !== resident.nik) {
            const nikUsed = await db.Resident.findOne({
                where: {
                    nik: updateData.nik,
                    id: {
                        [Op.ne]: resident.id
                    }
                }
            });
            if (nikUsed) {
                return res.errorResponse('Validasi gagal', { nik: 'NIK sudah terdaftar oleh orang lain' }, 409);
            }
        }

        if (req.file) {
            if (resident.formal_foto) {
                const oldPath = path.join(__dirname, '../../../', resident.formal_foto);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            updateData.formal_foto = `uploads/residents/${req.file.filename}`;
        }

        await resident.update(updateData);

        return res.successResponse('Data berhasil diedit', resident, 200);
    } catch (error) {
        console.error('Error updating resident: ', error);
        return res.errorResponse('Internal Server error', null, 422);
    }
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function validateResidentInput(data) {
    const errors = {};

    if (!data.full_name) {
        return res.errorResponse('Nama lengkap tidak boleh kosong', null, 422);
    }

    if (!data.nik) {
        return res.errorResponse('NIK tidak boleh kosong', null, 422);
    }

    if (!data.gender) {
        return res.errorResponse('Gender tidak boleh kosong', null, 422);
    }

    if (!data.religion) {
        return res.errorResponse('Agama tidak boleh kosong', null, 422);
    }

    if (!data.place_of_birth) {
        return res.errorResponse('tempat lahir tidak boleh kosong', null, 422);
    }

    if (!data.date_of_birth) {
        return res.errorResponse('Tanggal Lahir tidak boleh kosong', null, 422);
    }

    if (!data.rt) {
        return res.errorResponse('RT tidak boleh kosong', null, 422);
    }

    if (!data.rw) {
        return res.errorResponse('RW tidak boleh kosong', null, 422);
    }

    if (!data.village) {
        return res.errorResponse('Desa tidak boleh kosong', null, 422);
    }

    if (!data.marital_status) {
        return res.errorResponse('Status Perkawinan tidak boleh kosong', null, 422);
    }

    if (!/^\d{2}$/.test(data.rt)) {
        errors.rt = 'RT harus berupa 2 digit angka';
    }
    if (!/^\d{2}$/.test(data.rw)) {
        errors.rw = 'RW harus berupa 2 digit angka';
    }

    if (typeof data.place_of_birth !== 'string' || !data.place_of_birth.trim()) {
        errors.place_of_birth = 'Tempat lahir harus berupa string';
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date_of_birth) || isNaN(Date.parse(data.date_of_birth))) {
        errors.date_of_birth = 'Tanggal lahir harus berupa tanggal valid (YYYY-MM-DD)';
    }

    return errors;
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteResident = async (req, res) => {
    try {
        const { id } = req.params;
        const resident = await db.Resident.findByPk(id);
        if (!resident) {
            return res.errorResponse('Data warga tidak ditemukan', null, 404);
        }

        if (resident.formal_foto) {
            const fotoPath = path.join(__dirname, '../../../', resident.formal_foto);
            if (fs.existsSync(fotoPath)) {
                fs.unlinkSync(fotoPath);
            }
        }
        await resident.destroy();
        return res.successResponse('Data warga berhasil dihapus', null, 200);
    } catch (error) {
        console.error('Error deleting resident:', error);
        return res.errorResponse('Internal server error', null, 500);
    }
}

module.exports = {
    getResidents,
    createResident,
    updateResident,
    deleteResident
}

