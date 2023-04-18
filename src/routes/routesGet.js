const { Router } = require("express")
const { getAllInfo, getVideogamesById } = require("../Controllers/controllers")
const  Genres  = require('../models/Genres')
const  Platforms  = require('../models/Platform')
const  Videogames  = require('../models/Videogame')

const videogameRoutesGet = Router();


videogameRoutesGet.get("/", async (req, res) => {
  let { name } = req.query; 

    try {
      let total = await getAllInfo();
      if(name){
        let found = total.filter(
         f => f.name.toLowerCase().includes(name)
        ) 
        found.length ? 
        res.status(200).send(found) : 
        res.status(400).send('Game not found ..')
      }else{
        res.status(200).send(total.flat())
      }
      } catch (errors) {
      res.status(400).json({err: errors.message})  
    }
})

videogameRoutesGet.get("/:id", async (req, res) => {
  
  const {id} = req.params;

   try {
    const result = await getVideogamesById({id: id});
    result ? res.status(200).send(result) : res.status(400).send('Game not found..')
   } catch (errors) {
    res.status(400).json({err: errors.message})
   } 
})

videogameRoutesGet.post("/", async (req, res) => {
  let {name, description, platforms,released, rating, image, genress} = req.body;

   try {
    if(!image){
      try{
        image = 'https://static.vecteezy.com/system/resources/previews/003/561/078/large_2x/silhouette_of_mysterious-man-free-photo.jpg'
      }catch(err){
        console.log(err)
      }
    }
    

      let createVideogames = new Videogames({
         name: name,
         description: description,
         released: released,
         rating: rating,
         image: image,
       })   

       await createVideogames.save()

       let newArray = []
       for(let i=0; i<genress.length; i++){
        let genresExists = await Genres.findOne({name: genress[i]})
        if(genresExists && !newArray.includes(genress[i])){
            newArray.push(genresExists._id)
        }
       }

       let newArray2 = []
       for(let i=0; i<platforms.length; i++){
        let platformExists = await Platforms.findOne({name: platforms[i]})
        if(platformExists && !newArray2.includes(platforms[i])){
          newArray2.push(platformExists._id)
        }
       }
       
       createVideogames.genres = newArray
       createVideogames.platforms = newArray2

       await createVideogames.save()

    res.status(201).json({createVideogames}) 
 }catch(err){
  res.status(400).json({error: err.message})
 }
})
 

module.exports = videogameRoutesGet;