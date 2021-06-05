const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const { feature } = require("../model/feature");
var get_ip = require('ipware')().get_ip;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.get("/", async (req, res) => {
  try {
    var mysort = { Name: 1 };
    const feed = await feature.find().sort(mysort);
    if (!feed) {
      return res.status(400).json({ msg: "Feature is not Available" });
    }
    res.json(feed);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.post("/insert", urlencodedParser, async (req, res) => {
  try {
    const feed = await feature.insertMany([req.body]);
    if (!feed) {
      return res.status(400).json({ msg: "Feature is not Available" });
    }
    res.json(feed);
  } catch (err) {
    console.log("ERROR",err);
    res.status(500).json({ msg: err.message });
  }
});

router.post(
  "/react",
  async (req, res) => {
    const { feed, like} = req.body;
    const dbPost = await feature.findById(feed);

    var ip_info = get_ip(req);
    var uid =  ip_info.clientIp
    //  console.log("xcfvgbh",);


    try {
      if (!dbPost) {
        return res.status(401).json({ msg: "Feed does not exist anymore." });
      }
      var exits1 = dbPost.upVoted.includes(uid)
      var exits2 = dbPost.downVoted.includes(uid)
      if (!exits1 && !exits2 ) {
        if(like){
        let up = dbPost.upVoted;
        up.push(uid)
        console.log("up", up)
        await feature.findByIdAndUpdate(feed, {
          $set: { upVoted: up },
        });
        res.status(200).json({ msg: "Reaction updated" });
      } else {
        let up = dbPost.upVoted;
        up.push(uid)
        await feature.findByIdAndUpdate(feed, {
          $set: { downVoted: up },
        });
        res.status(200).json({ msg: "Reaction updated" });
      }}
      else res.status(200).json({ msg: "Already reacted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
