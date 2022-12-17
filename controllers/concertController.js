const Concert = require("../models/concertModel");

const { getPostData } = require("../utils");

// @desc    Gets All Concerts
// @route   GET /concerts
async function getConcerts(req, res) {
  try {
    const concerts = await Concert.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(concerts));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Concert
// @route   GET /concerts/:id
async function getConcert(req, res, id) {
  try {
    const concert = await Concert.findById(id);

    if (!concert) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Concert Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(concert));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Concert
// @route   POST /concerts
async function createConcert(req, res) {
  try {
    const body = await getPostData(req);

    const { owner, tour, artist, date, country, city, rating } =
      JSON.parse(body);

    const concert = {
      owner,
      tour,
      artist,
      date,
      country,
      city,
      rating,
    };

    const newConcert = await Concert.create(concert);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newConcert));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a Concert
// @route   PUT /concerts/:id
async function updateConcert(req, res, id) {
  try {
    const concert = await Concert.findById(id);

    if (!concert) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Concert Not Found" }));
    } else {
      const body = await getPostData(req);

      const { owner, tour, artist, date, country, city, rating } =
        JSON.parse(body);

      const concertData = {
        owner: owner || concert.owner,
        tour: tour || concert.tour,
        artist: artist || concert.artist,
        date: date || concert.date,
        country: country || concert.country,
        city: city || concert.city,
        rating: rating || concert.rating,
      };

      const updConcert = await Concert.update(id, concertData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updConcert));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete a Concert
// @route   DELETE /concert/:id
async function deleteConcert(req, res, id) {
  try {
    const concert = await Concert.findById(id);

    if (!concert) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Concert Not Found" }));
    } else {
      await Concert.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Concert ${concert.tour} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getConcerts,
  getConcert,
  createConcert,
  updateConcert,
  deleteConcert,
};
