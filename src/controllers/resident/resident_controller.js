'use strict'

const db = require('../../../models')
const paginate = require('../../helpers/paginate')
const buildOrder = require('../../helpers/order')

const getResidents = async (req, res) => {
    try {
        const { page, page_size, sort_by, sort_order } = req.query

        const order = buildOrder({
            sortBy: sort_by,
            sortDirection: sort_order,
        })

        const result = await paginate(db.Resident, {
            page,
            pageSize: page_size,
            order,
        })

        return res.json(result)
    } catch (error) {
        console.error('Error fetching residents:', error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

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
        })

        return res.successResponse('Data warga berhasil dibuat', resident, 201)
    } catch (error) {
        console.error('Error creating resident:', error)
        return res.errorResponse('Internal server error', null, 500)
    }
}

module.exports = {
    getResidents,
    createResident,
}

