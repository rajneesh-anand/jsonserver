const path = require("path");

const spiritRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, "../data/Spirituality/data.json");

  const groupPath = path.join(__dirname, "../data/Spirituality/category.json");

  const singlePath = path.join(__dirname, "../data/Spirituality/single.json");

  app.get("/spirituality", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        res.status(403).send({ error: err });
        // throw err;
      }

      res.status(200).send(JSON.parse(data));
    });
  });

  app.get("/spirituality/:slug", (req, res) => {
    const slug = req.params["slug"];
    console.log(slug);
    fs.readFile(groupPath, "utf8", (err, data) => {
      if (err) {
        res.status(403).send({ error: err });
      }
      const inventory = JSON.parse(data);
      const result = inventory.filter(
        ({ category }) => category == titleCase(slug),
      );
      res.status(200).send(result);
    });
  });

  function upperCase(str) {
    return str.toUpperCase();
  }
  function titleCase(str) {
    var splitStr = str.replace(/-/gi, " ");
    var firstLetterRx = /(^|\s)[a-z]/g;
    return splitStr.replace(firstLetterRx, upperCase);
  }

  app.get("/spirituality/:slug/:id", (req, res) => {
    const blogId = req.params["id"];
    console.log(titleCase(blogId));
    fs.readFile(singlePath, "utf8", (err, data) => {
      if (err) {
        res.status(403).send({ error: err });
      }
      const inventory = JSON.parse(data);
      const result = inventory.find(({ title }) => title === titleCase(blogId));
      console.log(result);
      res.status(200).send(result);
    });
  });
};

module.exports = spiritRoutes;
