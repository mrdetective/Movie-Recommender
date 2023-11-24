const router = require("express").Router();
const {getMovie} = require("../controllers/fetchMovie");

router.route("/getmovie").post(getMovie);

module.exports = router;
