const express = require("express");
const serverless = require("serverless-http");
require('dotenv').config();
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
const port = process.env.PORT || 9000;


app.get('/fixtures', async(req, res) => {
  const { date } = req.query;
  const today = new Date().toISOString().split('T')[0];
  const selectedDate = date || today;

  try {
      fetch(`https://v3.football.api-sports.io/fixtures?date=${selectedDate}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io',
            
          },
      })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        res.json(data);});
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching data.");
  }
});

app.get('/epl', async(req, res) => {
    try {
        fetch('https://v3.football.api-sports.io/standings?league=39&season=2024', {
            method: 'GET',
            headers: {
              'x-rapidapi-key': process.env.API_KEY,
              'x-rapidapi-host': 'v3.football.api-sports.io',
              
            },
        })
        .then((response) => response.json())
        .then((data) => res.json(data));
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.get('/laliga', async(req, res) => {
  try {
    fetch('https://v3.football.api-sports.io/standings?league=140&season=2024', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        
      },
    })
    .then((response) => response.json())
    .then((data) => res.json(data));   
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get('/ucl', async(req, res) => {
  try {
    fetch('https://v3.football.api-sports.io/standings?league=2&season=2024', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        
      },
    })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);});   
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get('/uel', async(req, res) => {
  try {
    fetch('https://v3.football.api-sports.io/standings?league=3&season=2024', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        
      },
    })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);});   
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

module.exports.handler = serverless(app)