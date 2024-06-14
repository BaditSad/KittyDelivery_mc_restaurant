require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
