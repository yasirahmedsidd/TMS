const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

//  @route      GET api/profile/:id
//  @desc       Get Profile by User Id
//  @access     Private

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

//  @route      GET api/profile/me
//  @desc       Get current user's profile
//  @access     Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("tms_user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route      Post api/profile
//  @desc       Get all Profiles
//  @access     Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("tms_user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route      Post api/profile/me
//  @desc       create or update a user profile
//  @access     Private

router.post(
  "/",
  auth,
  [
    check("status", "status is required").not().isEmpty(),
    check("skills", "skills is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills
        .split(",")
        .map((skill) => skill && skill.trim());
    }
    // Build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id }, // where condition
          { $set: profileFields },
          { new: true } // return document after update
        );
        return res.json(profile);
      }
      //   Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Server Error" });
    }
  }
);

module.exports = router;
