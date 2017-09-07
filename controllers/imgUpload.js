const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'kick-ass-starter', 
    api_key: '483888662317913', 
    api_secret: 'DLckDYFr8Jd0BMWkqmWsQsoe56o' 
  });


const upload = (req, res, next) => {
    cloudinary.uploader.upload(req.files.img.path, (result) => { 
        res.status(200).json({ result: result })
    })
}

module.exports = { imgUpload: upload }