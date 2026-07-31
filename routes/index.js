const router = require("express").Router();
const passport = require('passport');

// router.get("/", (req, res) => {
//   // #swagger.tags = ['Hello, World!']
//   res.send('Hello, World!');
// });

router.use('/', require('./swagger'));

router.use("/movies", require("./movies"));
router.use("/actors", require("./actors"));

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect('/');
  });
});

router.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
      : 'Logged Out'
  );
});

module.exports = router;
