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
  const { name, email, password, lastname, username, phone, profile } = req.body;
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
          .json({ message: "email or username already exist" });
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
          profile
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "save successfull" });
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
      return res.status(422).json({ message: "Not found username" });
    }

    bcrypt
      .compare(password, saveUser.password)
      .then((passMatch) => {
        if (passMatch) {
          const token = jwt.sign({ _id: saveUser._id }, JWT_SECRET);
          res.json({ token: token, message: "Have Login" });

        } else {
          return res
            .status(422)
            .json({ messege: "Invalid Username or Password" });
        }
      })
      .catch((error) => {
        res.status(422).json({ message: "Error Something" });
        console.log(error);
      });

  });
});

router.post("/permit", requirelogin, (req, res) => {
  const { username } = req.body;
  UserModel.find({ username: username }).then((data) => {
    return res.json(data);
  });
});

router.post("/uploadprofile", upload.single("uploadProfile"), (req, res) => {
  const imagesProfile = req.file.filename;
  const { username } = req.body;
  try {
    UserModel.find({ username: username }).updateOne({ profile: imagesProfile }).then(() => {
      return res.json({ message: "upload profile Success" });
    });

  }
  catch {
    res.status(500).json({ message: "fail upload" });
  }

});

///////////////////////////////////////////////////////////////////////////////////////
router.post("/uploadLeft", upload.single("imagesLeft"), (req, res) => {
  const imagesLeft = req.file.filename;

  try {
    res.json({ message: "finish upload", imagesLeft });
  }
  catch {
    res.status(500).json({ message: "fail upload" });
  }

});

router.post("/uploadRight", upload.single("imagesRight"), (req, res) => {
  const imagesRight = req.file.filename;

  try {
    res.json({ message: "finish upload", imagesRight });
  }
  catch {
    res.status(500).json({ message: "fail upload" });
  }

});

router.post("/uploadTop", upload.single("imagesTop"), (req, res) => {
  const imagesTop = req.file.filename;

  try {
    res.json({ message: "finish upload", imagesTop });
  }
  catch {
    res.status(500).json({ message: "fail upload" });
  }

});

router.post("/uploadBottom", upload.single("imagesBottom"), (req, res) => {
  const imagesBottom = req.file.filename;

  try {
    res.json({ message: "finish upload", imagesBottom });
  }
  catch {
    res.status(500).json({ message: "fail upload" });
  }
});

router.post("/upload", (req, res) => {
  const { username, date, imagesLeft, imagesRight, imagesTop, imagesBottom } = req.body;

  if (!username || !date || !imagesLeft || !imagesRight || !imagesTop || !imagesBottom) {
    return res.status(422).json({ message: "please add all field" });
  }

  UploadUserImagesModel.findOne({ date: date }).then((saveUser) => {
    if (saveUser) {
      return res.status(422).json({ message: "Date invalided" });
    }
    const uploadImage = new UploadUserImagesModel({
      username,
      date,
      imagesLeft,
      imagesRight,
      imagesTop,
      imagesBottom,
    });

    uploadImage
      .save()
      .then((user) => {

        res.json(user);

      })
      .catch((error) => {
        return res.status(422).json({ message: "Error Upload" });

      });
  });
});

router.post("/deleteImage", (req, res) => {
  const { username, images } = req.body;
  UploadUserImagesModel.deleteOne({ username: username, images: images })
    .then((result) => {

      res.status(200).json(result);
    })
    .catch((err) => res.status(500).json({ error: err }));
});
///////////////////////////////////////////////////////////////////////////////////////




router.get("/showimages/:name", (req, res) => {
  var filename = req.params.name;

  res.sendFile(path.resolve(`./images/${filename}`));
});

router.get("/showimageUser/:username", (req, res) => {
  const username = req.params.username;
  UploadUserImagesModel.find({ username: username }).sort({ _id: -1 })
    .select()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => res.status(400).json({ messege: "something wrong!" }));
});
module.exports = router;
