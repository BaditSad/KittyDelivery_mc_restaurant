require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restRoutes = require("./routes/restRoutes");
const sequelize = require("./config/pgsql.config");
const fs = require("fs");
const path = require("path");
const allowRequest = require("./middlewares/allowRequest");

const app = express();
const port = process.env.PORT;

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"))
);

app.use(cors());
app.use(bodyParser.json());
app.use(allowRequest);

app.use("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/rest", restRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✔️ All models were synchronized successfully.");
    app.listen(port, () =>
      console.log(`🚀 App running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("❌ Unable to synchronize the models:", err);
  });
