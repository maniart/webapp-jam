
var http,
express,
path,
socketio,
app,
server,
port,
io;


http = require('http');
express = require('express');
path = require('path');
socketio = require('socket.io');

app = express();
server = http.createServer(app);
io = socketio(server);
port = process.env.PORT || 3030;

// express static server
app.use(express.static(path.join(__dirname , 'static')));

// setup routes
app.get('/', function(req, res) {
  res.json({});
});

// socket.io setup
io.on('connection', function(socket) {
	console.log('new socket connection');
	
		   
	});

	socket.on('disconnect', function(){
    	socket.broadcast.emit("leave", {
      		id: socket.id
    	});
  	});

});

// http server setup
server.listen(port, function() {
	console.log('&#9836; Jam! &#9836;', port);
});



