var mongoose = require('mongoose');

module.exports = mongoose.model('metadataDetails', {
    sensorID : {
      type: String,
      default: ''
    },
    status : {
      type : String,
      default : ''
    },
    sensorData : {
      type : String,
      default : ''
    }
});
