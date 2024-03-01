const express = require('express');
const fitnessRoutes = express.Router();
const fs = require('fs');

// setup variables
const basePath = `/fitness`;
const dataPath = `./data/fitness.json`;

// create function that will save the data to our resource (fitness.json)
const saveResourceData = (data) => {
  const result = JSON.stringify(data);
  fs.writeFileSync(dataPath, result);
};

// create function that will retrieve the resource data (fitness.json)
const getResourceData = () => {
  const result = fs.readFileSync(dataPath);
  // change the result to a Javascript object
  return JSON.parse(result);
};

// Read - get all data from the (fitness.json file) using GET
// creating an API endpoint to get all data from the (fitness.json file)
fitnessRoutes.get(`${basePath}`, (req, response) => {
  const resource = getResourceData();
  response.send({ status: 'SUCCESS', payload: resource });
});

// delete - delete a specific data from the (fitness.json file) using DELETE
fitnessRoutes.delete(`${basePath}/delete/:id`, (req, response) => {
  fs.readFile(
    dataPath,
    'utf8',
    async (err, data) => {
      var currentResource = getResourceData();
      const id = req.params['id'];
      delete currentResource[id];

      await saveResourceData(currentResource);
      response.send({
        status: 'SUCCESS',
        payload: !!currentResource ? currentResource : {},
      });
    },
    true
  );
});

// Update - using PUT method
fitnessRoutes.put(`${basePath}/update/:id`, (req, res) => {
  var currentResource = getResourceData();
  fs.readFile(
    dataPath,
    'utf8',
    async (err, data) => {
      const id = req.params['id'];
      currentResource[id] = req.body;
      await saveResourceData(currentResource);
      res.send({
        status: 'SUCCESS',
        payload: !!currentResource ? currentResource : {},
      });
    },
    true
  );
});

module.exports = fitnessRoutes;
