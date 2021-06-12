const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const upload = require("../middleware/uploadprocess");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const UserModel = mongoose.model("users");
const UploadUserImagesModel = mongoose.model("images");

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

router.post("/signup", (req, res) => {
  const { name, email, password, lastname, username, phone } = req.body;
  if (!name || !email || !password || !lastname || !username || !phone) {
    //ตรวจสอบว่าใส่ครบหรือไม่
    res.status(422).json({ error: "please add all field" });
  }

  UserModel.findOne({
    $or: [
      //ตรวจสอบว่าซ้ำหรือไม่
      { email: email },
      { username: username },
    ],
  })
    .then((saveUser) => {
      if (saveUser) {
        return res
          .status(422)
          .json({ error: "email or username already exist" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        //สามารถเพิ่มค่าให้มากขึ้นได้
        const user = new UserModel({
          email,
          name,
          lastname,
          username,
          password: hashedpassword,
          phone,
        });
        user
          .save()
          .then((user) => {
            res.json({ messege: "save successfull" });
          })
          .catch((error) => {
            A;
            console.log(console.error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username: username }).then((saveUser) => {
    if (!saveUser) {
      return res.status(422).json({ error: "Not found username" });
    }
    bcrypt
      .compare(password, saveUser.password)
      .then((passMatch) => {
        if (passMatch) {
          const token = jwt.sign({ _id: saveUser._id }, JWT_SECRET);
          res.json({ token });
        } else {
          return res
            .status(422)
            .json({ messege: "Invalid Username or Password" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

router.post("/deleteImage", (req, res) => {
  const { username, images } = req.body;
  UploadUserImagesModel.deleteOne({ username: username, images: images })
    .then((result) => {
      console.log("deleteSuccess");
      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/permit", requirelogin, (req, res) => {
  res.send("you have authorization");
});

router.post("/upload", upload.single("images"), (req, res) => {
  const { username, date, images } = req.body;
  if (!username || !date || !req.file) {
    return res.status(422).json({ error: "please add all field" });
  }

  UploadUserImagesModel.findOne({ date: date }).then((saveUser) => {
    if (saveUser) {
      return res.status(422).json({ error: "Date invalided" });
    }
    const uploadImage = new UploadUserImagesModel({
      username,
      date,
      images: req.file.filename,
    });

    uploadImage
      .save()
      .then((user) => {
        res.json({ messege: "save successfull" });
      })
      .catch((error) => {
        console.log(console.error);
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////

router.get("/showimages/:name", (req, res) => {
  var filename = req.params.name;
  res.sendFile(path.resolve(`./images/${filename}`));
});

router.get("/showimageUser/:username", (req, res) => {
  const username = req.params.username;
  UploadUserImagesModel.find({ username: username })
    .select("images")

    .then((data) => {
      return res.json({ data });
    })
    .catch((error) => res.status(400).json({ messege: "something wrong!" }));
});

module.exports = router;
