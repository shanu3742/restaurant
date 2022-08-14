const restaurant = require('../model/restaurant.model');

const validatedRestaurent = async (req, res, next) => {
  try {
    /**
     * get @id from url
     *
     *  */

    const restaurentId = req.params.id;
    let restaurentResponse = await restaurant.findById({ _id: restaurentId });
    if (!restaurentResponse) {
      return res.status(404).send({
        message: 'No Restaurant found with given id',
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      message: `Some error occured while fetching the Restaurant.${e}`,
    });
  }
};
module.exports = { validatedRestaurent };
