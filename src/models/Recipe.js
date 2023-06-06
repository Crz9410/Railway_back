const { DataTypes } = require('sequelize');

// const { toDefaultValue } = require('sequelize/types/utils');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diets:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    // resumen del plato 
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // nivel de comida saludable
    healthy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // paso a paso
    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
    // { timestamps: false },
  );
};
