const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies & Actors API',
    description: 'REST API for managing a database of movies and actors.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Movie: {
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
      duration: 148,
      rating: 8.8,
      language: 'English',
      genre: 'Science Fiction'
    },
    Actor: {
      name: 'Leonardo DiCaprio',
      birthdate: '1974-11-11',
      birthplace: 'Los Angeles, California, USA',
      nationality: 'American',
      awards: ['Academy Award', 'Golden Globe'],
      popularMovies: ['Inception', 'Titanic']
    },
    ValidationError: {
      errors: [
        {
          type: 'field',
          value: 'invalid-data',
          msg: 'Error message text.',
          path: 'fieldName',
          location: 'body'
        }
      ]
    },
    GeneralError: {
      message: 'Error description message.'
    }
  }
};

const outputFile = './swagger-output.json';
const routesEndpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, routesEndpointsFiles, doc);
