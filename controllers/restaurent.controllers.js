/**
 * get all  require  detalis  from body
 *  body must have data
 *
 */
const restaurant = require('../model/restaurant.model');
const { uniqueObject } = require('../utils/uniqueObject');

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
      message: `Some error occurred while creating the Restaurant`,
    });
  }
};

/**
 * get all listed restaurant
 * end point api/restaurant/
 */
exports.getRestaurant = async (req, res) => {
  try {
    let restaurentList = await restaurant.find({});
    if (!restaurentList) {
      return res.status(200).send({
        restaurants: [],
        message: 'restaurants fetched successfully',
      });
    }
    res.status(200).send({ restaurants: restaurentList });
  } catch (e) {
    res.status(500).send({
      message: `Some error occurred while creating the Restaurant`,
    });
  }
};
exports.getBasedonCategories = async (req, res) => {
  console.log(req.params);

  try {
    let resturantBasedOnType = await restaurant.find({
      category: req.params.categoryName,
    });
    if (!resturantBasedOnType) {
      return res.status(200).send({});
    }
    res.status(200).send(resturantBasedOnType);
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while fetching the Restaurant.`,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let restaurentCategories = await restaurant.find({});

    const response = uniqueObject(restaurentCategories);
    res.status(200).send(response);
    // console.log(response);
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while fetching the Restaurant.${e}`,
    });
  }
};

exports.getRestaurentBasedOnId = async (req, res) => {
  // console.log(req.params);

  try {
    let resturantBasedOnId = await restaurant.find({
      _id: req.params.id,
    });
    if (resturantBasedOnId.length === 0) {
      return res.status(404).send({
        message: 'No Restaurant found with given id',
      });
    }
    res.status(200).send(resturantBasedOnId);
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while fetching the Restaurant.`,
    });
  }
};

exports.getRestaurentBasedOnRating = async (req, res) => {
  // console.log(req.params);

  try {
    let resturantBasedOnRating = await restaurant.find({
      rating: req.params.ratingValue,
    });
    if (resturantBasedOnRating.length === 0) {
      return res.status(404).send({
        message: 'No Restaurant found with given rating',
      });
    }
    res.status(200).send(resturantBasedOnRating);
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while fetching the Restaurant.`,
    });
  }
};
