const path = require("path");

const servicesRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, "../data/Services/services.json");

  app.get("/services", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.status(200).send(JSON.parse(data));
    });
  });
};

module.exports = servicesRoutes;
