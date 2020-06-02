const path = require("path");

const blogRoutes = (app, fs) => {
  const dataPath = path.join(__dirname, "../data/Blog/blog.json");
  // helper methods
  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8",
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8",
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get("/blogs", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  app.get("/blogs/:id", (req, res) => {
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

  // CREATE
  app.post("/blogs", (req, res) => {
    readFile((data) => {
      const newUserId = Object.keys(data).length + 1;

      // add the new user
      data[newUserId.toString()] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new blog added");
      });
    }, true);
  });

  // UPDATE
  app.put("/blogs/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const blogId = req.params["id"];
      data[blogId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`blogs id:${blogId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/blogs/:id", (req, res) => {
    readFile((data) => {
      // add the new user
      const blogId = req.params["id"];
      delete data[blogId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`blogs id:${blogId} removed`);
      });
    }, true);
  });
};

module.exports = blogRoutes;
