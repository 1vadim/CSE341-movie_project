const router = require("express").Router();

router.get("/", (req, res) => {
  // #swagger.tags = ['Hello, World!']
  res.send('Hello, World!');
});

router.use('/', require('./swagger'));

router.use("/movies", require("./movies"));
router.use("/actors", require("./actors"));

module.exports = router;
