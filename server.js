
var http,
	express,
	path,
	socketio,
	app,
	logger,
	bodyParser,
	debug,
	server,
	io,
	routes;

http = require('http');
express = require('express');
path = require('path');
socketio = require('socket.io');
logger = require('morgan');
bodyParser = require('body-parser');
app = express();
server = http.createServer(app);
io = socketio(server);
controllers = {
	index : require('./controllers/index'),
	instruments : require('./controllers/instruments'),
	synth : require('./controllers/synth')
};

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', controllers.index);
app.use('/instruments', controllers.instruments);
app.use('/instruments/synth', controllers.synth);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // respond with html page
    if (req.accepts('html')) {
        /*TODO: handle 404 errors here */
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

/// error handlers
if(app.get('env') === 'production') {
    
}


// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// socket.io setup

// socket.io setup
io.on('connection', function(socket) {
	console.log('new socket connection');
	
    socket.on('note', function(freq) {
        console.log('server.js >> note received: ', freq);
        socket.broadcast.volatile.emit('note', freq); 
    });

    socket.on('orientation', function(data) {
        console.log('server.js >> orientation received: ', ' data: ', data);
        socket.broadcast.volatile.emit('orientation', data); 
    });


	socket.on('disconnect', function(){
    	socket.broadcast.emit("leave", {
      		id: socket.id
    	});
  	});
});

module.exports = server;
