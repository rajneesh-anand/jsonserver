const path = require("path");

const cultureRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, "../data/Culture/culture.json");

  app.get("/culture-traditions", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.status(200).send(JSON.parse(data));
    });
  });

  app.get("/culture-traditions/:slug/:id", (req, res) => {
    const blogId = req.params["id"];
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const inventory = JSON.parse(data);
      const result = inventory.find(({ id }) => id == blogId);
      res.status(200).send(result);
    });
  });
};

module.exports = cultureRoutes;
