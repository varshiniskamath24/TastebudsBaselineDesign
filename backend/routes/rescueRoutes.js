const express = require("express");
const { donateFood } = require("../controllers/rescueController");

const router = express.Router();

router.post("/donate", donateFood);

module.exports = router;
