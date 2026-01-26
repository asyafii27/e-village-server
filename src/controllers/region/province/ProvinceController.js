'use strict'

const db = require('../../../../models')
const paginate = require('../../../helpers/paginate')
const buildOrder = require('../../../helpers/order')
const { Op, Sequelize } = require('sequelize')

const getProvinces = async (req, res) => {
    try {
        const { page, page_size, sort_by, sort_dir, name, code } = req.query

        const order = buildOrder({
            sortBy: sort_by,
            sortDirection: sort_dir
        })

        const where = {}
        if (name) {
            where.name = { [Op.like]: `%${name}%` }
        }
        if (code) {
            where.code = code
        }

        const result = await paginate(db.Province, {
            page,
            pageSize: page_size,
            order,
            where
        })

        return res.json(result)

    } catch (error) {
        console.error('Error fetching provinces:', error)
        return res.errorResponse('Gagal mendapatkan data provinsi', null, 422)
    }
}

const showProvince = async (req, res) => {
    try {
        const { id } = req.params;
        const province = await db.Province.findOne({ where: { code: id } });
        if (!province) {
            return res.errorResponse('Data tidak ditemukan', null, 404)
        }
        return res.json(province);
    } catch (error) {
        console.error('Error fetching province detail:', error);
        return res.errorResponse('Gagal mendapatkan detail provinsi', null, 422);
    }
};

module.exports = {
    getProvinces,
    showProvince
}