const routes = require("next-routes")();

routes
  .add("/pools/new", "/pools/new")
  .add("/pools/:address", "/pools/show")
  .add("/pools/:address/requests", "/pools/requests/index")
  .add("/pools/:address/requests/new", "/pools/requests/new");

module.exports = routes;
