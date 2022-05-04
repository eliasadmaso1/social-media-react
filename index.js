const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./db');


const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Api Running");
  });

  app.listen(PORT, () => {
    console.log(`listen to port ${PORT}!`);
  });