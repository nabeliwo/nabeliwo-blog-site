const Hapi = require('hapi');
const vision = require('vision');
const handlebars = require('handlebars');
const inert = require('inert');

const server = new Hapi.Server();

const routing = require('./app/routes');


// Connect the server
server.connection({
  host: 'localhost',
  port: 3000
});


// serving static files and directories
server.register(inert, err => {
  if (err) {
    throw err;
  }
});


// routing
server.route(routing);


// template engine
server.register(vision, err => {
  if (err) {
    return console.dir(err);
  }

  server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: './views'
  });
});


// Start the server
server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
