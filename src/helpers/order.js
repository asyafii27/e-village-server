const buildOrder = ({ sortBy = 'created_at', sortDirection = 'DESC' } = {}) => {
  const field = sortBy

  let direction = sortDirection.toString().toUpperCase()
  if (direction !== 'ASC' && direction !== 'DESC') {
    direction = 'DESC'
  }

  return [[field, direction]]
}

module.exports = buildOrder
