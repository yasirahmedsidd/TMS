const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

//  @route      POST api/tasks
//  @desc       Post a Task
//  @access     Private

router.post(
  "/",
  auth,
  [check("task", "Task is required")],
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

module.exports = router;
