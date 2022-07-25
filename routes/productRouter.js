const Container = require("../services/productServices");
const service = new Container();

const router = require("express").Router();

router.get("/", (req, res) => {
  const resp = service.getAll();
  res.status(200).send(resp);
});

router.post("/", (req, res) => {
  const prod = req.body;
  res.status(200).send(service.save(prod));
});

module.exports = router;
