const { Diets } = require("../db");
const { UUIDV4 } = require('sequelize');
const axios = require("axios");
const {
    API_KEY,
} = process.env;

const getAllDiets = async () => {
    // buscar en la bdd
    const databaseDiets = await Diets.findAll();

    // buscar en la api
    const apiDietsRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true#`)
    ).data.results[0].diets;

    const createDietPromises = apiDietsRaw.map(async (e, i) => {
        const idDiets = i;
        const name = e;
  
        await Diets.create({ idDiets, name });
    });
  
    await Promise.all(createDietPromises);
  
    // unificar 
    return [...databaseDiets, ...apiDietsRaw];
};
const createDiets = async (idDiets, name) => {
    if (idDiets && name ) {

        
     const newDiet = await Diets.create({ idDiets, name});
    
    
    return newDiet;
    };
}

module.exports = { getAllDiets, createDiets };
