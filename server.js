var express = require('express');
var app = express();
var io = require('socket.io')

var rootRouter = require('./routes/rootRouter')

app.use(express.static('public'));
app.use('/', rootRouter);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// io.listen(app);
