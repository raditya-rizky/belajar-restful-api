const express = require("express");
const musics = require("./music");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/musics", (req, res) => {
  res.status(200).json(musics);
});

app.get("/api/musics/:id", (req, res) => {
  const document = musics.find((e) => e.id === Number(req.params.id));
  res.status(200).json(document);
});

app.post("/api/musics", (req, res) => {
  const { song, album, band } = req.body;

  // Cara dapatkan id dari item terakhir
  const lastId = musics[musics.length - 1].id;
  const newId = lastId + 1;

  const music = {
    id: newId,
    song,
    album,
    band,
  };

  musics.push(music);

  // Status code untuk post adalah 201 jika berhasil
  res.status(201).json(music);
});

app.put("/api/musics/:id", (req, res) => {
  const { song, title, band } = req.body;

  const indexMusics = musics.findIndex((e) => e.id === Number(req.params.id));

  musics[indexMusics] = {
    id: Number(req.params.id),
    song,
    title,
    band,
  };

  res.status(200).json(musics[indexMusics]);
});

app.delete("/api/musics/:id", (req, res) => {
  const indexMusics = musics.findIndex((e) => e.id === Number(req.params.id));

  musics.splice(indexMusics, 1);

  res.status(200).json({
    message: `Song with Id ${req.params.id} has been deleted`,
  });
});

app.listen(port, () => {
  console.log(`Server nyala di port ${port}`);
});
