const { Router } = require("express")
const router = Router();
require("dotenv").config();
const { API_KEY } = process.env;
const { Platform } = require("../db")
const axios = require("axios")

router.get("/", async (_req, res) => {
    const apiPlatform = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results

    try{
        let platforms = apiPlatform.map(p => p.platforms ? p.platforms : 'no data')
        let platform = platforms.flat().map(p => p.platform ? p.platform.name : 'no data')

        platform.forEach(e => {
           if(e){
            Platform.findOrCreate({
                where : {name: e}
            })
           } 
        });

        platform = await Platform.findAll()
        res.status(200).send(platform)
    }catch(err){
        res.status(400).send({error: err.message})
    }
})

module.exports = router;