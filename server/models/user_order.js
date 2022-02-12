'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_order.belongsTo(models.User, { foreignKey: 'user_id' })
      User_order.belongsTo(models.Dish, { foreignKey: 'dish_id' })
      User_order.belongsTo(models.Group_order, { foreignKey: 'group_id' })
    }
  }
  User_order.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    dish_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_order',
    tableName: 'User_orders',
    underscored: true,
  })
  return User_order
}