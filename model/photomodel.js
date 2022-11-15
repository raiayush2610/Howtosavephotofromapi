const mongoose = require('mongoose');
 
const photoSchema = new mongoose.Schema({
        Name:{type: String},
        
        Profile_img:{
                data: Buffer,
                contentType: "String"
        }

})
 
// module.exports = mongoose.model('photoSchwma',photoSchema);
module.exports = ImageModel = mongoose.model("Image",photoSchema)