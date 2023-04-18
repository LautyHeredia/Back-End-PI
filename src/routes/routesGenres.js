const { Router } = require("express")
const axios = require("axios");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const  Genres = require("../models/Genres")

const videoGameRoutesGenres = Router();

videoGameRoutesGenres.get("/", async (req, res) => {
  try {
    const genreDB = await Genres.find({});
    if(genreDB.length === 0){
      const apigenres = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
      let apiGen = apigenres;
      
      await Promise.all(apiGen.map(async (e) => {
        let succesSearch = await Genres.findOne({ rawgId: e.id })
        if(!succesSearch){
          let newGenres = new Genres({ name: e.name, rawgId: e.id })
          await newGenres.save()
        } 
      }));
    }
    const updatedGenreDB = await Genres.find({});
    res.status(200).json(updatedGenreDB);
  } catch (errors) {
    res.status(400).json({message: errors.message})  
  }
})

module.exports = videoGameRoutesGenres;