const express = require("express");
const Game = require("../models/game");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===================================
// Obtener todos los Juegos
// ===================================

app.get("/games", (req, res) => {
  Game.find({})
    .sort("desc")

    .exec((err, games) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        games,
      });
    });
});

// ===================================
// Obtener Juego por Id
// ===================================

app.get("/games/:id", (req, res) => {
  let id = req.params.id;

  Game.findById(id)
    .sort("desc")

    .exec((err, gamesDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!gamesDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Id no existe",
          },
        });
      }

      res.json({
        ok: true,
        games: gamesDB,
      });
    });
});

// ===================================
// Crear Juego
// ===================================

app.post("/gamestarted", (req, res) => {
  let body = req.body;
  let game = new Game({
    name: body.name,
    started: body.started,
  });
  game.save((err, gameDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!game) {
      res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      game: gameDB,
    });
  });
});

// ===================================
// Actualizar Juegos por Id
// ===================================

app.put("/gamestarted/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Game.findById(id, (err, gameDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!gameDB) {
      res.status(400).json({
        ok: false,
        err: {
          message: "El juego no existe",
        },
      });
    }

    gameDB.started = body.started;
    gameDB.ganador = body.ganador;

    gameDB.save((err, gameGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        game: gameGuardado,
      });
    });
  });
});

// ===================================
// Actualizar Jugadas
// ===================================

app.put("/savegameplay/:id", (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Game.findById(id, (err, gameDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!gameDB) {
      res.status(400).json({
        ok: false,
        err: {
          message: "El juego no existe",
        },
      });
    }

    gameDB.field = body.field;

    gameDB.save((err, gameGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        game: gameGuardado,
      });
    });
  });
});

// ===================================
// Eliminar Juegos
// ===================================

app.delete("/gamedelete/:id", (req, res) => {
  let id = req.params.id;
  Game.findByIdAndRemove(id, (err, gameDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!gameDB) {
      res.status(400).json({
        ok: false,
        err: {
          message: "El id no existe",
        },
      });
    }

    res.json({
      ok: true,
      message: "Juego borrado",
    });
  });
});

module.exports = app;
