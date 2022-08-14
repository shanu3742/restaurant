const restaurantController = require('../controllers/restaurent.controllers');

module.exports = (app) => {
  app.post('/api/restaurant/add', restaurantController.createRestaurant);
  app.get('/api/restaurant', restaurantController.getRestaurant);
  app.get(
    '/api/restaurant/categories/:categoryName',
    restaurantController.getBasedonCategories
  );
  app.get('/api/restaurant/categories', restaurantController.getCategories);
  app.get('/api/restaurant/:id', restaurantController.getRestaurentBasedOnId);
  app.get(
    '/api/restaurant/rating/:ratingValue',
    restaurantController.getRestaurentBasedOnRating
  );
};

// api/restaurant/rating/ratingValue
