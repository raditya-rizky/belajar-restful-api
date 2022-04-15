const express = require("express");
const data = require("./data");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/articles", (req, res) => {
  res.status(200).json(data);
});

app.get("/api/articles/:id", (req, res) => {
  const document = data.find((e) => e.id === Number(req.params.id));
  res.status(200).json(document);
});

app.post("/api/articles", (req, res) => {
  const { title, body } = req.body;

  // Cara dapatkan id dari item terakhir
  const lastId = data[data.length - 1].id;
  const newId = lastId + 1;

  const article = {
    id: newId,
    title: title,
    body: body,
  };

  data.push(article);

  // Status code untuk post adalah 201 jika berhasil
  res.status(201).json(article);
});

app.put("/api/articles/:id", (req, res) => {
  const { title, body } = req.body;

  const indexData = data.findIndex((e) => e.id === Number(req.params.id));

  data[indexData] = {
    id: Number(req.params.id),
    title,
    body,
  };

  res.status(200).json(data[indexData]);
});

app.delete("/api/articles/:id", (req, res) => {
  const indexData = data.findIndex((e) => e.id === Number(req.params.id));

  data.splice(indexData, 1);

  res.status(200).json({
    message: `Data with Id ${req.params.id} has been deleted`,
  });
});

app.listen(port, () => {
  console.log(`Server nyala di port ${port}`);
});
