//starting point for auth server
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config')

//App Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'} ));
app.use(cors());

//db setup
mongoose.connect(config.db_url);

router(app);

// Server Setup
app.listen(config.port,function() { 
  console.log('server listening on port...' + config.port);
});

module.exports = app;