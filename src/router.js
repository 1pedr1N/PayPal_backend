const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/users/create', userController.create);
router.put('/users/update', userController.update);
router.post('/users/auth', userController.authUser);
router.get('/payment', userController.createPayment);
router.get("/users/:email", userController.getUserInfo);
module.exports = router;