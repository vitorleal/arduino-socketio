var five   = require('johnny-five'),
    io     = require('socket.io').listen(9001),
    board  = new five.Board(),

    connect = require('connect'),
    http    = require('http');

//on board ready
board.on('ready', function () {
  var led = new five.Led(13);

  //socket
  io.sockets.on('connection', function (socket) {

    io.sockets.emit('connected');

    //Turn the light on
    socket.on('led-on', function () {
      led.on();
      socket.broadcast.emit('clicked', { status: 'on' });
    });

    //Turn the light off
    socket.on('led-off', function () {
      led.off();
      socket.broadcast.emit('clicked', { status: 'off' });
    });
  });

  led.off();
});

//Web server
connect()
  .use(connect.static(__dirname + '/web'))
  .listen(4000);

console.log('Webserver listening on port 4000');
