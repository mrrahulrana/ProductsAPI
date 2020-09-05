var db = require('../db');
var mongoose = require('mongoose');

var counters = db.collection('counters');

function getNextSequenceValue(sequenceName){
   return new Promise(function(resolve, reject){
       counters.findOneAndUpdate(
           {_id: sequenceName },
           {$inc:{sequence_value:1}},
           {returnOriginal: false}
        )
        .then(doc => {
           resolve(doc.value.sequence_value);});        
   });
  }

 module.exports = getNextSequenceValue;
