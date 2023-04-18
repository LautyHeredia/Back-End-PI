const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videoGameRoutesGet = require("./routesGet")
const routesGetGenres = require("./routesGenres")
const PlatformRute = require("./platformRute")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videoGameRoutesGet)
router.use("/genres", routesGetGenres)
router.use("/platforms", PlatformRute)

module.exports = router;
