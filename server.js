const PORT = process.env.PORT || 3000;
const moment = require('moment');
const express = require('express');
const { del } = require('express/lib/application');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
var clientInfo = {};
io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    socket.on('disconnect', function () {
        var userData = clientInfo[socket.id];
        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf(),
            });
            delete clientInfo[socket.io];
        }
    });
    socket.on('joinRoom', function (req) {
        console.log('Req: ', req);
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment.valueOf(),
        });
    });
    socket.on('message', (message) => {
        console.log('Message received: ' + message.text);
        message.timestamp = moment.valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });
    socket.emit('message', {
        name: 'System',
        text: ' Welcome to the chat application!',
        timestamp: moment.valueOf(),
    });
});
http.listen(PORT, () => {
    console.log('Server started!');
});
