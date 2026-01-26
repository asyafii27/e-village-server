const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      Province.hasMany(models.City, { foreignKey: 'province_code', sourceKey: 'code' });
    }
  }
  Province.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Province',
    tableName: 'provinces',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Province;
};
