const db = require('../../../models')
const paginate = require('../../helpers/paginate')
const buildOrder = require('../../helpers/order')

const getUsers = async (req, res) => {
  try {
    const { page, page_size, sort_by, sort_order } = req.query

    const order = buildOrder({
      sortBy: sort_by,
      sortDirection: sort_order,
    })

    const result = await paginate(db.User, {
      page,
      pageSize: page_size,
      attributes: { exclude: ['password'] },
      order,
    })

    return res.json(result)
  } catch (error) {
    console.error('Error fetching users:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getUsers,
}
