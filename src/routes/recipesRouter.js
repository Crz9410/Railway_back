const { Router } = require("express");

const { 
    getRecipeHandler,
    getRecipesHandler,
    createRecipeHandler
} = require("../handlers/recipesHandler");


const recipesRouter = Router();
recipesRouter.post("/" , createRecipeHandler);

recipesRouter.get("/",getRecipesHandler);

recipesRouter.get("/search", getRecipesHandler);
recipesRouter.get("/:id", getRecipeHandler);



module.exports = recipesRouter;