//starting point for auth server
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//App Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'} ));
app.use(cors());

//db setup
mongoose.connect('mongodb://localhost:auth/auth');

router(app);

// Server Setup
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,function() { 
  console.log('server listening on port...' + port);
}); 