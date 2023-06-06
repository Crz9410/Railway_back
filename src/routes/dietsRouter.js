const { Router } = require("express");
const { getDietsHandler, createDietHandler } = require("../handlers/dietsHandler");

const dietsRouter = Router();
dietsRouter.get("/", getDietsHandler);
dietsRouter.post("/", createDietHandler)

module.exports = dietsRouter;