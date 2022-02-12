'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.User_order, { foreignKey: 'user_id' })
      User.belongsToMany(models.Group_order, {
        through: models.User_order,
        foreignKey: 'user_id',
        as: 'FoodGroupOrders'
      })
      User.belongsToMany(models.Dish, {
        through: models.User_order,
        foreignKey: 'user_id',
        as: 'UserOrderDishes'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    cell_phone: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
  })
  return User
}