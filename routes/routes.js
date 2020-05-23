const blogRoutes = require("./blogs");
const appRouter = (app, fs) => {
  blogRoutes(app, fs);
};

module.exports = appRouter;
