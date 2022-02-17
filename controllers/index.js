const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const searchRoutes = require("./searchRoutes");

router.use("/", homeRoutes);
router.use("/search", searchRoutes);
router.use("/api", apiRoutes);

module.exports = router;
