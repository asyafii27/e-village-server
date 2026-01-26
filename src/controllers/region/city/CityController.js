'use strict'

const db = require('../../../../models')
const paginate = require('../../../helpers/paginate')
const buildOrder = require('../../../helpers/order')
const { Op, Sequelize } = require('sequelize')


const getCities = async (req, res) => {

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

        const results = await paginate(db.Province, {
            page,
            pageSize: page_size,
            order,
            where
        })

        return res.json(results)
    } catch (error) {
        console.error('Error fteching cities: ', error)
        return res.errorResponse('Gagal mengambil data kabupaten/kota', null, 422)
    }
}

const showCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await db.City.findOne({ where: { code: id } })
        if (!city) {
            return res.errorResponse('Data tidak ditemukan', null, 404)
        }

        return res.successResponse('Success', city, 200)
    } catch (error) {
        console.error('Error fetching city detail: ', error)
        return res.errorResponse('Gagal mengambil data detail kabupaten/kota', null, 422);
    }
}

module.exports = {
    getCities,
    showCity
}