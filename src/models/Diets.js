const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('diets', {
        idDiets: {
            type: DataTypes.INTEGER,
            // toDefaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            autoincrement: true,
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
};


