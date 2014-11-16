
var http,
express,
path,
socketio,
app,
logger,
bodyParser,
debug,
server,
port,
io;

http = require('http');
express = require('express');
path = require('path');
socketio = require('socket.io');
logger = require('morgan');
bodyParser = require('body-parser');
debug = require('debug')('jam!');


app = express();
server = http.createServer(app);
io = socketio(server);
port = process.env.PORT || 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
    /*TODO: fix this for launch */
    /*
    try {
        var pid = npid.create('/var/run/pmfat.pid');
        pid.removeOnExit();
    } catch (err) {
        console.log('>> app.js - npmid error : ',err);
        process.exit(1);
    }
    */
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
io.on('connection', function(socket) {
	console.log('new socket connection');
	
		   
	});

	socket.on('disconnect', function(){
    	socket.broadcast.emit("leave", {
      		id: socket.id
    	});
  	});

});
