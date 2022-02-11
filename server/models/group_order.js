'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Group_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group_order.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
    }
  }
  Group_order.init({
    restaurant_id: DataTypes.INTEGER,
    order_deadline: DataTypes.DATE,
    order_delivery_time: DataTypes.DATE,
    take_meal_at: DataTypes.STRING,
    order_status: DataTypes.INTEGER
    /* order_status code of food-ordering: 1-initial, 2-order placed, 3-food arrived, 4-order completed, 5-canceled  */
  }, {
    sequelize,
    modelName: 'Group_order',
    tableName: 'Group_orders',
    underscored: true,
  })
  return Group_order
}