const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// User routes
router.post('/post_order', orderController.postOrder);
router.get('/get_order_history/:user_id', orderController.getOrder);
router.put('/update_order/:order_id', orderController.updateOrder);
router.delete('/delete_order/:order_id', orderController.deleteOrder);

module.exports = router; 