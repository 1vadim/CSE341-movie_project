const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const mongodb = require('./data/database');
const { globalErrorHandler } = require('./middleware/errorHandler');

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Z-Key',
      'Authorization'
    ]
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || 'https://cse341-movie-project.onrender.com/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use('/', require('./routes'));

app.use(globalErrorHandler);

process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
  process.exit(1);
});

mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database is listening and node server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
  });
