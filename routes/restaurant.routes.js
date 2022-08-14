const restaurantController = require('../controllers/restaurent.controllers');

module.exports = (app) => {
  app.post('/api/restaurant/add', restaurantController.createRestaurant);
};
