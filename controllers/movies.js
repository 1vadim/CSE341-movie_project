const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Retrieve a list of all movies from the database.'

  const result = await mongodb.getDatabase().collection('movies').find().toArray();
  res.status(200).json(result);
};



const getSingle = async (req, res) => {
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Get a single movie by its unique ID.'
  /* #swagger.parameters['id'] = {
        description: 'Unique MongoDB ObjectId of the movie',
        required: true,
        type: 'string'
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/Movie' },
        description: 'Movie successfully retrieved.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Invalid ID format in URL parameters.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/GeneralError' },
        description: 'Movie with the specified ID does not exist.' 
     } */
  const userId = new ObjectId(req.params.id);
  const movie = await mongodb.getDatabase().collection('movies').findOne({ _id: userId });

  if (!movie) {
    const error = new Error('Movie with such ID not found.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(movie);
};

const createSingle = async (req, res) => {
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Create a new movie.'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'New movie raw payload data',
        required: true,
        schema: { $ref: '#/definitions/Movie' }
     } */
  /* #swagger.responses = { 
        description: 'Movie successfully created.',
        schema: { id: '60c72b2f9b1d8b2bad000001' }
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Validation failed for request body payload fields.' 
     } */

   const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
    rating: req.body.rating,
    language: req.body.language,
    genre: req.body.genre
  };
  const response = await mongodb.getDatabase().collection('movies').insertOne(movie);
  res.status(201).json({ id: response.insertedId });
};


const updateSingle = async (req, res) => {
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Update an existing movie by its ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the movie to update.' } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated fields payload',
        required: true,
        schema: { $ref: '#/definitions/Movie' }
     } */
  /* #swagger.responses = { description: 'Movie successfully updated (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */



  const userId = new ObjectId(req.params.id);
  const updatedMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    duration: req.body.duration,
    rating: req.body.rating,
    language: req.body.language,
    genre: req.body.genre
  };
  const response = await mongodb
    .getDatabase()
    .collection('movies')
    .replaceOne({ _id: userId }, updatedMovie);

  if (response.modifiedCount === 0) {
    const error = new Error(
      'The movie has not been updated (the data may be identical or the movie may have been deleted).'
    );
    error.statusCode = 400;
    throw error;
  }
  res.status(204).end();
};

const deleteSingle = async (req, res) => {
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Delete a movie from the database by its ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the movie to delete.' } */
  /* #swagger.responses = { description: 'Movie successfully deleted (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/GeneralError' } } */

   const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection('movies').deleteOne({ _id: userId });

  if (response.deletedCount === 0) {
    const error = new Error('Movie not found for deletion.');
    error.statusCode = 404;
    throw error;
  }
  res.status(204).end();
};

module.exports = {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle
};
