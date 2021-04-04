
import axios from 'axios';
import React from 'react';
var axios = require('axios');
var data = JSON.stringify(
  {
    "entity": *CurrentEntity*,
    "action": *can be one of: get/create/delete/update...*,
    "json":
    {
      *JSON with the actual data, for exmaple username, lastname, event name...*
    }
    });

var config = {
  method: 'get',
  url: 'http://127.0.0.1:5000/',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});