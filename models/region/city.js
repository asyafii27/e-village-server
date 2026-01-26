const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.Province, { foreignKey: 'province_code', targetKey: 'code' });
      City.hasMany(models.District, { foreignKey: 'city_code', sourceKey: 'code' });
    }
  }
  City.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'cities',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return City;
};
