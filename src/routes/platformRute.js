const { Router } = require("express")
const router = Router();
require("dotenv").config();
const { API_KEY } = process.env;
const Platform = require("../models/Platform")
const axios = require("axios")

router.get("/", async (_req, res) => {
    const apiPlatform = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results

    try{
        let getPlatforms = await Platform.find({})

        if(getPlatforms.length === 0){

            let platforms = apiPlatform.map(p => p.platforms ? p.platforms : 'no data')
            let platformNames = platforms.flat().map(p => p.platform ? p.platform.name : 'no data')
            
            let uniquePlatformNames = new Set(platformNames);
            
            await Promise.all(Array.from(uniquePlatformNames).map(async (e) => {
               let succesSearch = await Platform.findOne({ name: e })
               if(!succesSearch){
                 let newPlatform = new Platform({ name: e })
                 await newPlatform.save()
               } 
            }))
        }
        
        let platforms = await Platform.find({})
        let platformNames = platforms.map(p => p.name);
        let uniquePlatformNames = new Set(platformNames);
        
        res.status(200).json(Array.from(uniquePlatformNames));
        
    }catch(err){
        res.status(400).send({error: err.message})
    }
})

module.exports = router;