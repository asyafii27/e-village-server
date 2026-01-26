const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    static associate(models) {
      Village.belongsTo(models.District, { foreignKey: 'district_code', targetKey: 'code' });
    }
  }
  Village.init({
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district_code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Village',
    tableName: 'villages',
  });
  return Village;
};
