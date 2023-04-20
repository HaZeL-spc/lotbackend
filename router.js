const API_KEY = "hW7zBPegWAepqNZuHkLD4tuTNXzQYpUI";
const API_SECRET = "JWBnHpATsIGHt48U";

const Amadeus = require("amadeus");
const express = require("express");
// Create router
const router = express.Router();

const amadeus = new Amadeus({
  clientId: API_KEY,
  clientSecret: API_SECRET,
});

const API = "api";
// City search suggestions
router.get(`/${API}/search_flights`, async (req, res) => {
  const { origin, destination, date } = req.query;
  const adults = 1;
  console.log(origin, destination, date);
  //   const keyword = "NYC";
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: date,
    adults: adults,
  });

  //console.log(response.body);
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
  //res.status(201).send({ msg: "Created User" });
});

router.get(`/${API}/search`, async (req, res) => {
  const { keyword } = req.query;

  const response = await amadeus.referenceData.locations.get({
    keyword,
    subType: "AIRPORT",
  });

  //console.log(response.body);
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

router.get(`/${API}/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;

  // API call with params we requested from client app
  const response = await amadeus.client.get("/v1/reference-data/locations", {
    keyword,
    subType,
    "page[offset]": page * 10,
  });
  //console.log(response.body);
  // Sending response for client
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

module.exports = router;
