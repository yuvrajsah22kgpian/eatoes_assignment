const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/postgresql');


const Order= sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue:'pending',
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_details: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.FLOAT,
  
}, 
  order_details: {
    type: DataTypes.JSONB,
    allowNull: false
  }
}, {
  tableName: 'Orders',
  timestamps: true,
  hooks: {
    beforeCreate: async (order) => {
      if (order.status === 'pending') {
        order.status = 'pending';
      }
    }
  }
}
);

module.exports = Order;