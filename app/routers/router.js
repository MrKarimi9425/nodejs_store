const { homeRouters } = require("./api/home.route");

const router = require("express").Router();

router.use("/", homeRouters)

module.exports = {
    allRoutes: router
}