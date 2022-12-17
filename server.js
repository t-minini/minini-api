const http = require('http');
const {
  getConcerts,
  getConcert,
  createConcert,
  updateConcert,
  deleteConcert,
} = require('./controllers/concertController');

const server = http.createServer((req, res) => {
  if (req.url === '/concerts' && req.method === 'GET') {
    getConcerts(req, res);
  } else if (req.url.match(/\/concerts\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getConcert(req, res, id);
  } else if (req.url === '/concerts' && req.method === 'POST') {
    createConcert(req, res);
  } else if (req.url.match(/\/concerts\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updateConcert(req, res, id);
  } else if (req.url.match(/\/concerts\/\w+/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deleteConcert(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the concerts endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
