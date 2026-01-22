const db = require('../../../models')
const paginate = require('../../helpers/paginate')
const buildOrder = require('../../helpers/order')
const Sequelize = require('sequelize')

const getUsers = async (req, res) => {
  try {
    const { page, page_size, sort_by, sort_order, global_search } = req.query

    const order = buildOrder({
      sortBy: sort_by,
      sortDirection: sort_order,
    })

    // Build where clause for global search
    const where = {}
    if (global_search) {
      where[Sequelize.Op.or] = [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${global_search.toLowerCase()}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', `%${global_search.toLowerCase()}%`)
      ]
    }

    const result = await paginate(db.User, {
      page,
      pageSize: page_size,
      attributes: { exclude: ['password'] },
      order,
      where,
    })

    // Ensure result.rows is defined
    const usersWithNumber = (result.rows || []).map((user, index) => ({
      no: (result.page - 1) * result.pageSize + index + 1,
      ...user.toJSON(),
    }))

    return res.json({
      ...result,
      rows: usersWithNumber,
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getUsers,
}
