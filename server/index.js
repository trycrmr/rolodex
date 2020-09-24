const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const faker = require("faker");
const { ContactsDB } = require("./contacts-db");
const webpack = require("webpack");
const hotLoader = require("react-hot-loader");
const path = require("path");

const port = 3001;
const app = express();

// middleware to allow standard client requests
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configures dev middleware
hotLoader.setConfig({ logLevel: "debug" });
const webpackConfig = require("../webpack.config.js");
const compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  })
);
app.use(require("webpack-hot-middleware")(compiler));

// Configures directory for static assets
app.use("/dist", express.static(path.join(__dirname, "dist")));

// populate a "DB" with 20 random contacts
const contactsDB = new ContactsDB(
  [...Array(20)].map((i) => ({
    name: faker.name.findName(),
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumberFormat(),
    id: faker.random.uuid(),
  }))
);

// util to return an error if present, otherwise return expected data
const responseHandler = ({ data, error, code }, res) => {
  if (error) {
    res.status(code).send(error);
  } else {
    res.send(data);
  }
};

// Serves the single page app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// returns an array of contact objects
app.get("/contacts", (req, res) => {
  const result = contactsDB.all();
  responseHandler(result, res);
});

// returns a contact object
app.post("/contacts", (req, res) => {
  const result = contactsDB.create(req.body);
  responseHandler(result, res);
});

// returns a contact object
app.get("/contacts/:id", (req, res) => {
  const result = contactsDB.read(req.params.id);
  responseHandler(result, res);
});

// returns a contact object
app.put("/contacts/:id", (req, res) => {
  const result = contactsDB.update({ ...req.body, id: req.params.id });
  responseHandler(result, res);
});

// returns a 200 status code if successful (no response body)
app.delete("/contacts/:id", (req, res) => {
  const { error, code } = contactsDB.delete(req.params.id);
  if (error) {
    res.status(code).send(error);
  } else {
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(
    `Listening on port ${port}. Check http://localhost:${port}/contacts to ensure this is working properly.`
  );
});
