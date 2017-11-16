var mongoose = require('mongoose');

module.exports = mongoose.model('deviceDetails', {
    deviceTag : {
      type: String,
      default: ''
    },
    status : {
      type : String,
      default : ''
    }
});
