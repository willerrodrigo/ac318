const Market = require('../models/market');
const Shopping = require('../models/shopping');

module.exports = {
  async store(req, res) {
    const {
      totalPrice, totalWeight, bags, market
    } = req.body;

    const loggedMarket = await Market.findById(market);

    const shopping = await Shopping.create({
        totalPrice,
        totalWeight,
        bags,
        market
      });

    loggedMarket.shopping.push(shopping._id);

    await loggedMarket.save(function (err) {
      if (err) return res.send(err);

      return res.json(shopping);
    });
  },
  async index(req, res) {
    const { market } = req.headers;

    await Shopping.find({ market: market}, ['totalWeight', 'bags'], function(err, doc) {
      if(err) return res.send(err);

      return res.json(doc);
    }).sort('+createdAt').limit(4);
  },
};
