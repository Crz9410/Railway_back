const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
const {
    API_KEY,
} = process.env;

const cleanArray = (elem) => {
    let elementFilter = {};
    if (elem.length) {
        elementFilter = elem.map((e) => ({
            id: e.id,
            name: e.title,
            image: e.image,
            diets: e.diets,
            summary: e.summary,
            healthy: e.healthScore,
            steps: e.analyzedInstructions[0].steps[0].step,
        }));
    } else {
        elementFilter = {
            id: elem.id,
            name: elem.title,
            image: elem.image,
            diets: e.diets,
            summary: elem.summary,
            healthy: elem.healthScore,
            steps: elem.analyzedInstructions[0].steps[0].step,
        };
    }
    return elementFilter;
};

const getRecipeById = async (id, source) => {
    const recipes = source === "api" ?
        (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
        : await Recipe.findByPk(id);

    return cleanArray(recipes);
};

const searchRecipeByName = async (name) => {
    const response = await axios.get(`https://api.spoonacular.com/food/search?query=${name}&apiKey=${API_KEY}`);

    return response.data;

};

const getAllRecipes = async (offset) => {
    // buscar en la bdd
    const databaseRecipes = await Recipe.findAll({include:Diets});

    // buscar en la api
    const apiRecipesRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&offset=${offset}`)
    ).data.results
      
      const apiRecipes = cleanArray(apiRecipesRaw).map((recipe) => ({
        ...recipe,
        source: "api",
      }));


    // unificar 
    let results= [...databaseRecipes, ...apiRecipes];
    
    return results;
};

const createRecipe = async ( name, image, diets,  summary, healthy, steps) => {
    if ( name && image && diets && summary && healthy && steps) {

        
     const newRecipe = await Recipe.create({  name, image, diets, summary, healthy, steps});
    //  for(let i=0; i < diets.length; i++){
    //     const dbDiets = await Diets.findAll({ where: { name : {
    //         [Op.iLike]: `%${diets[i]}%`
            
    //     }}})
    //     newRecipe.addDiet(dbDiets)
    //  }
   
    return newRecipe;
    };
}



module.exports = { getRecipeById, searchRecipeByName, getAllRecipes, createRecipe }; 