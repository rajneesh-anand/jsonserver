const blogRoutes = require("./blogs");
const navsRoutes = require("./navs");
const spiritRoutes = require("./spirituality");
const yogaRoutes = require("./yoga");
const holidayRoutes = require("./holiday");
const cultureRoutes = require("./culture");
const scienceRoutes = require("./science");
const artRoutes = require("./art");

const appRouter = (app, fs) => {
  blogRoutes(app, fs);
  navsRoutes(app, fs);
  spiritRoutes(app, fs);
  yogaRoutes(app, fs);
  holidayRoutes(app, fs);
  cultureRoutes(app, fs);
  scienceRoutes(app, fs);
  artRoutes(app, fs);
};

module.exports = appRouter;
