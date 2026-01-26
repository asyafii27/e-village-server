const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      District.belongsTo(models.City, { foreignKey: 'city_code', targetKey: 'code' });
      District.hasMany(models.Village, { foreignKey: 'district_code', sourceKey: 'code' });
    }
  }
  District.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'District',
    tableName: 'districts',
  });
  return District;
};
