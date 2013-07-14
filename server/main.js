var extensions = nodeRequire("engine/extensions.js");
console.log(extensions.onAssetsReady)
extensions.onAssetsReady.listen(function() {
	console.log("start")
	var self = extensions.get("host_server");
	self.startServer();
});
exports.startServer = function() {
	var http = require('http');
	var app = require('http').createServer(handler);
	io = require('socket.io').listen(app),
	fs = require('fs')

	app.listen(80, "localhost");
	console.log("Listening on localhost:80")
	function handler(req, res) {
		fs.readFile(__dirname + '/index.html',

		function(err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			res.writeHead(200);
			res.end(data);
		});
	}

	io.sockets.on('connection', exports.onConnect);
};

exports.onConnect = function(socket) {
	socket.emit('news', {
		hello: 'world'
	});
	socket.on('my other event', exports.onMessage);
};

exports.onMessage = function(data) {
	console.log(data);
};