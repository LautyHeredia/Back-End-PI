const { Router } = require("express")
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const {  Genres } = require("../db")

const videoGameRoutesGenres = Router();

videoGameRoutesGenres.get("/", async (req, res) => {
    try {
      const apigenres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results   
      const apiGen = apigenres;

      apiGen.map(async (e) => await Genres.findOrCreate({
        where: {
          id: e.id,
          name: e.name  
        }    
    }))

    const genreDB = await Genres.findAll();
     
    res.status(200).send(genreDB)

    } catch (errors) {
      res.status(400).json({err: errors.message})  
    }
})

module.exports = videoGameRoutesGenres;