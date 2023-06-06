const { getAllDiets, createDiets } = require("../controllers/dietsConrollers");

const getDietsHandler = async (req, res) => {
    try {
        const response = await getAllDiets();
        res.status(200).json (response);
    } catch (error) {
        res.status(400).json({ message: "No se encuentra la dieta buscada" });
    }
};
const createDietHandler = async (req, res) => {
    const { idDiets, name, } = req.body
   
    try {
        const newDiet = await createDiets(idDiets, name, );
        res.status(200).json(newDiet)
       
    } catch (error) {
        res.status(400).json({ error: error.message });
    };
};

module.exports = {
    getDietsHandler, createDietHandler
};
