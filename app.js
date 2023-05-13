const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/items.js");

const app = express();

app.use(express.urlencoded({ extended: true }));

// TODO: add mongo db
const mongodb = "";

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(connected);
    app.listen(3000);
  })
  .catch((error) => console.log(error));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/get-items");
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { items: result });
    })
    .catch((error) => console.log(error));
});

app.get("/add-item", (req, res) => {
  res.render("add-item");
});

app.post("/items", (req, res) => {
  const item = Item(req.body);
  item
    .save()
    .then(() => res.redirect("/get-items"))
    .catch((error) => console.log(error));
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    res.render("item-detail", { item: result });
  });
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then((result) => {
    res.json({ redirect: "/get-items" });
  });
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ msg: "Updated Successfully" });
  });
});

app.use((req, res) => {
  res.render("error");
});
