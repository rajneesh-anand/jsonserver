const path = require("path");

const navsRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, "../data/Navbar/navbar.json");

  app.get("/navs", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });
};

module.exports = navsRoutes;
