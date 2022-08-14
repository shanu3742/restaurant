/**
 * get all  require  detalis  from body
 *  body must have data
 *
 */
const restaurant = require('../model/restaurant.model');

exports.createRestaurant = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(204).send({
        message: 'Content cannot be empty',
      });
    }
    let restaurnntData = {
      name: req?.body?.name,
      description: req?.body?.description,
      category: req?.body?.category,
      imageURL: req?.body?.imageURL,
      location: req?.body?.location,
      phone: req?.body?.phone,
      rating: req?.body?.rating,
    };
    let restaurantResponse = await restaurant.create(restaurnntData);
    res.status(200).send(restaurantResponse);
  } catch (e) {
    res.status(500).send({
      message: `Some error occurred while creating the Restaurant$`,
    });
  }
};
