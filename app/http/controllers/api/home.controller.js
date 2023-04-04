const Controller = require("../controller");

module.exports = new class HomeController extends Controller {
    index(req, res, next) {
        return res.status(200).send("index page")
    }
}