const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser=require('body-parser')
const cors = require('cors');
var multer = require('multer');
const fs = require('fs');
 const ImageModel =require('./model/photomodel')

const app = express();
app.set('view engine' ,'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
// app.use(express.json());
app.use(bodyParser.json());

//Database 
mongoose.connect('mongodb://localhost:27017/login',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Login database is connected"))
.catch(error => console.log(error));

app.get("/",(req,res)=> res.send("this is working fine"));

const storage =multer.diskStorage({
          destination:(req,file,cb)=>{
                    cb(null,'uploads')
          },
          filename: (req,file,cb)=>{
                    cb(null,file.originalname)
          }
})
const upload = multer({storage:storage})
 
app.post('/',upload.single('testImage'),(req,res)=>{
          const saveImage = new ImageModel({
                    Name: req.body.Name,
                    Profile_img:{
                              data:fs.readFileSync("uploads/"+req.file.filename),
                              contentType:"image/png"
                    },
          });
          saveImage.save()
          .then((res)=>{
            console.log('image is saved');
        })
          .catch((err) =>{
            console.log(err,'error  has occur');
        })
        res.send('image is saved')
});
//Port 
const PORT = process.env.PORT || 4000;

app.use(cors({origin: '*'}))
// Server Connetion
app.listen(PORT, ()=> console.log("Server is conneted on port "+PORT))
