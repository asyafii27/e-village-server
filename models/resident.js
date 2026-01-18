'use strict'

// Wrapper agar models/index.js bisa mendaftarkan model Resident
module.exports = (sequelize, DataTypes) => {
  return require('./resident/resident')(sequelize, DataTypes)
}
