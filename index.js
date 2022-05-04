const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./db');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/images", express.static(path.join(__dirname, "public/images")));


const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const authRouter = require('./Routes/authRoutes');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({storage});
  
  app.post('/upload',upload.single('file'),(req,res)=>{
    try{
      return res.status(200).json("File uploaded successfully")
    }
    catch(error){
      console.log(error);
  
    }
  
  })


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/auth',authRouter);

app.get("/", (req, res) => {
    res.send("Api Running!!!");
  });

  app.listen(PORT, () => {
    console.log(`listen to port ${PORT}!`);
  });