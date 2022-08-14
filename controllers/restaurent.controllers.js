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

/**
 * update restaurent based on id
 * create middleWare to check restaurent with provided id is persent
 * or not
 *
 */
exports.updateRestaurant = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Restaurant data is required',
      });
    }
    const restaurentId = req.params.id;
    let restaurentResponse = await restaurant.findOne({ _id: restaurentId });
    restaurentResponse.name =
      req.body.name !== undefined ? req.body.name : restaurentResponse.name;
    restaurentResponse.description =
      req.body.description !== undefined
        ? req.body.description
        : restaurentResponse.description;
    restaurentResponse.category =
      req.body.category !== undefined
        ? req.body.category
        : restaurentResponse.category;
    restaurentResponse.imageURL =
      req.body.imageURL !== undefined
        ? req.body.imageURL
        : restaurentResponse.imageURL;
    restaurentResponse.location =
      req.body.location !== undefined
        ? req.body.location
        : restaurentResponse.location;
    restaurentResponse.phone =
      req.body.phone !== undefined ? req.body.phone : restaurentResponse.phone;
    restaurentResponse.rating =
      req.body.rating !== undefined
        ? req.body.rating
        : restaurentResponse.rating;

    const savedData = await restaurentResponse.save();

    res.status(200).send(savedData);
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while updating the Restaurant.`,
    });
  }
};

exports.deleteRestaurent = async (req, res) => {
  try {
    let restaurentId = req.params.id;
    //get index of that id
    let deletedData = await restaurant.findOne({ _id: restaurentId });
    if (!deletedData) {
      return res.status(200).send({
        restaurant: null,
        message: 'Restaurant deleted successfully.',
      });
    }
    let restaurentResponse = await restaurant.deleteOne({ _id: restaurentId });
    res.status(200).send({
      restaurant: deletedData,
      message: 'Restaurant deleted successfully.',
    });
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while deleting the Restaurant.`,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    if (!restaurant) {
      res.status(200).send({
        restaurants: {
          acknowledged: true,
          deletedCount: 0,
        },
        message: 'Restaurants deleted successfully.',
      });
    }
    let result = await restaurant.collection.drop();

    res.status(200).send({
      restaurants: result,
      message: 'Restaurant deleted successfully.',
    });
  } catch (e) {
    res.status(500).send({
      message: 'Some error occured while deleting the Restaurant.',
    });
  }
};
