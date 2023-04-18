const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const {Videogame, Genres, Platform} = require("../db");


//TRAIGO EL ARRAY DE TODOS LOS VIDEOGAMES

  //OBTENGO TODOS LOS VIDEOJUEGOS
 const  getApiInfo =  async function() {
   
  var api = `https://api.rawg.io/api/games?key=${API_KEY}`;

     let api1 = (await axios.get(api)).data;
     let page1 = await api1.results;
     let api2 = (await axios.get(api1.next)).data;
     let page2 = await api2.results;

     let api3 = (await axios.get(api2.next)).data;
     let page3 = await api3.results;

     let api4 = (await axios.get(api3.next)).data;
     let page4 = await api4.results;

     let api5 = (await axios.get(api4.next)).data;
     let page5 = await api5.results;

     const totalPage = [...page1, ...page2, ...page3, ...page4, ...page5]

     const apidata = totalPage.map((e) => {
      return {
        id: e.id,
        name: e.name,
        image: e.background_image,
        genres: e.genres,
        released: e.released,
        rating: e.rating,
        description: e.description,
        platforms: e.platforms,
      }
     })
   return apidata;  
}
  
 const getDbInfo =  async () => {
  const db = await Videogame.findAll({
    include: [{
      model: Genres,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }, {
      model: Platform,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }]
  })
  return db;
 }
  
 const getAllInfo =  async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo)

  return allInfo;
 }

 const getVideogamesById =  async function(id) {
  
    if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)){
      try{
        let dbID = await Videogame.findByPk(
          id,
          {
            include: [{
              model: Genres,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }, {
              model: Platform,
              attributes: ['name'],
              through: {
                attributes: [],
              }
            }],
            attributes: ['id', 'name', 'description', 'released', 'rating', 'image', 'createInDb']
          }
        )
        return dbID;
      }
      catch(err){
        console.log(err)
      }
    }else{
      try{
        const idApi = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;

        const game = {
          id: idApi.id,
          name: idApi.name,
          released: idApi.released,
          rating: idApi.rating,
          genres: idApi.genres,
          platforms: idApi.parent_platforms,
          image: idApi.background_image,
          description: idApi.description_raw
        }
        return  game;        
      }catch(err){
        console.log(err)
      }
    }    
}

module.exports = {
  getAllInfo,
  getApiInfo,
  getDbInfo,
  getVideogamesById  
}

