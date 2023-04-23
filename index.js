const express = require("express");
const router = require("./router");
const path = require("path");
const PORT = process.env.PORT || 1338;
const app = express();
// Apply JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Apply router

app.use(express.static(path.join(__dirname + "/public")));

app.use("/", router);
// Serving app on defined PORT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express is running on port ${PORT}`);
});
