(function () {
  var init = function () {
    var socket = io.connect('', { port: 9001 }),
        button = document.querySelector('.button'),
        status = document.querySelector('.status'),
        on     = false;

    var toogleButton = function (on) {
      status.innerText = on.toUpperCase();
      button.className = 'button '+ on;
    };

    //When connect
    socket.on('connect', function () {
      socket.emit('led-off');
    });

    //update other buttons
    socket.on('clicked', function (data) {
      toogleButton(data.status);
    });

    //button click
    button.addEventListener('click', function () {
      on = !on;
      var status = (on) ? 'on' : 'off';

      toogleButton(status);
      socket.emit('led-'+ status);
    });
  };

  window.onload = init();
})();
