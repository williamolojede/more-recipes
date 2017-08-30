import http from 'http';
import app from '../app';

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
console.log(`server is listening on port: ${server.address().port}`);

module.exports = app;
