const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags = ['Actors']
  // #swagger.description = 'Retrieve a list of all actors from the database.'

  const result = await mongodb.getDatabase().collection('actors').find().toArray();
  res.status(200).json(result);
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Actors']
  // #swagger.description = 'Get a single actor by their unique ID.'
  /* #swagger.parameters['id'] = {
        description: 'Unique MongoDB ObjectId of the actor',
        required: true,
        type: 'string'
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/Actor' },
        description: 'Actor successfully retrieved.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Invalid ID format in URL parameters.' 
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/GeneralError' },
        description: 'Actor with the specified ID does not exist.' 
     } */
  const actorId = new ObjectId(req.params.id);
  const actor = await mongodb.getDatabase().collection('actors').findOne({ _id: actorId });

  if (!actor) {
    const error = new Error('Actor with such ID not found.');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(actor);
};

const createSingle = async (req, res) => {
  // #swagger.tags = ['Actors']
  // #swagger.description = 'Create a new actor record.'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'New actor raw payload data',
        required: true,
        schema: { $ref: '#/definitions/Actor' }
     } */
  /* #swagger.responses = { 
        description: 'Actor successfully created.',
        schema: { id: '60c72b2f9b1d8b2bad000001' }
     } */
  /* #swagger.responses = { 
        schema: { $ref: '#/definitions/ValidationError' },
        description: 'Validation failed for request body payload fields.' 
     } */

  const actor = {
    name: req.body.name,
    birthdate: req.body.birthdate, // Ожидается формат YYYY-MM-DD
    birthplace: req.body.birthplace,
    nationality: req.body.nationality,
    awards: req.body.awards, // Ожидается массив строк или строка
    popularMovies: req.body.popularMovies // Ожидается массив названий фильмов
  };
  const response = await mongodb.getDatabase().collection('actors').insertOne(actor);
  res.status(201).json({ id: response.insertedId });
};

const updateSingle = async (req, res) => {
  // #swagger.tags = ['Actors']
  // #swagger.description = 'Update an existing actor by their ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the actor to update.' } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated fields payload',
        required: true,
        schema: { $ref: '#/definitions/Actor' }
     } */
  /* #swagger.responses = { description: 'Actor successfully updated (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */

  const actorId = new ObjectId(req.params.id);
  const updatedActor = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    birthplace: req.body.birthplace,
    nationality: req.body.nationality,
    awards: req.body.awards,
    popularMovies: req.body.popularMovies
  };
  const response = await mongodb
    .getDatabase()
    .collection('actors')
    .replaceOne({ _id: actorId }, updatedActor);

  if (response.modifiedCount === 0) {
    const error = new Error(
      'The actor data has not been updated (the data may be identical or the record may have been deleted).'
    );
    error.statusCode = 400;
    throw error;
  }
  res.status(204).end();
};

const deleteSingle = async (req, res) => {
  // #swagger.tags = ['Actors']
  // #swagger.description = 'Delete an actor from the database by their ID.'
  /* #swagger.parameters['id'] = { description: 'ID of the actor to delete.' } */
  /* #swagger.responses = { description: 'Actor successfully deleted (No Content returned).' } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/ValidationError' } } */
  /* #swagger.responses = { schema: { $ref: '#/definitions/GeneralError' } } */

  const actorId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().collection('actors').deleteOne({ _id: actorId });

  if (response.deletedCount === 0) {
    const error = new Error('Actor not found for deletion.');
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
