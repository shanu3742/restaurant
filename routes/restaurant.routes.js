const restaurantController = require('../controllers/restaurent.controllers');
const { validatedRestaurent } = require('../middleware/restaurant.middleware');

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
  app.put(
    '/api/restaurant/:id',
    [validatedRestaurent],
    restaurantController.updateRestaurant
  );
  app.delete(
    '/api/restaurant/:id',
    [validatedRestaurent],
    restaurantController.deleteRestaurent
  );
  app.delete(
    '/api/restaurant',

    restaurantController.deleteAll
  );
};

// api/restaurant/rating/ratingValue
