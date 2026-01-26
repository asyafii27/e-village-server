const apiResponse = (req, res, next) => {
  res.successResponse = (message = null, data = null, code = 200) => {
    return res.status(code).json({
      status: code,
      message,
      data,
    })
  }

  res.errorResponse = (message = null, errors = null, code = 422) => {
    return res.status(code).json({
      status: code,
      message,
      errors,
      data: null,
    })
  }

  next()
}

module.exports = apiResponse
