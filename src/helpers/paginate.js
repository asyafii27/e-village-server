const paginate = async (model, options = {}) => {
  const {
    page,
    pageSize,
    where = {},
    attributes,
    order,
  } = options

  if (!page) {
    const rows = await model.findAll({ where, attributes, order })
    return rows
  }

  const currentPage = Number(page) > 0 ? Number(page) : 1
  const limit = Number(pageSize) > 0 ? Number(pageSize) : 10
  const offset = (currentPage - 1) * limit

  const { rows, count } = await model.findAndCountAll({
    where,
    attributes,
    order,
    limit,
    offset,
  })

  return {
    data: rows,
    meta: {
      page: currentPage,
      page_size: limit,
      total: count,
      total_pages: Math.ceil(count / limit) || 1,
    },
  }
}

module.exports = paginate
