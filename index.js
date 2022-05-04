const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./db');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const authRouter = require('./Routes/authRoutes');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/auth',authRouter);

app.get("/", (req, res) => {
    res.send("Api Running");
  });

  app.listen(PORT, () => {
    console.log(`listen to port ${PORT}!`);
  });