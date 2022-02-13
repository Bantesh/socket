const PORT = process.env.PORT || 3000;
const moment = require('moment');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    socket.on('message', (message) => {
        console.log('Message received: ' + message.text);
        message.timestamp = moment.valueOf();
        io.emit('message', message);
    });
    socket.emit('message', {
        text: ' Welcome to the chat application!',
        timestamp: moment.valueOf(),
    });
});
http.listen(PORT, () => {
    console.log('Server started!');
});
