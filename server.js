const express      = require('express')
const http         = require('http')
const path         = require('path')
const Pool         = require('pg-pool')
const bodyParser   = require('body-parser')
const app          = express()
const pool         = new Pool()
const apiRoutes    = express.Router()
const port         = process.env.PORT || 3003
const morgan       = require('morgan')
const router       = require('./routes/router')
const cors         = require('cors')
const formidable   = require('express-formidable')
const upload       = require('./controllers/imgUpload')
const uploadRouter = express.Router()
//const pgURL      = process.env.DATABASE_URL || 'postgresql://localhost:5432'


///APP SETUP

//app.use('/api', apiRoutes);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next();
});


//{ type: '*/*'}
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build/')))
router(app)


//// UPLOAD IMAGE
app.use('/post-image', uploadRouter)
uploadRouter.use(formidable())
uploadRouter.post('/', upload.imgUpload)


/// SERVER SETUP
const server = http.createServer(app)
server.listen(port, () =>{
    console.log(`Servering at port ${port}`)
})