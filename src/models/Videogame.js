// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//      id: {
//        type: DataTypes.UUID,
//        allowNull: false,
//        defaultValue: DataTypes.UUIDV4,
//        primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     released: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "Unknown"
//     },
//     rating: { 
//       type: DataTypes.DECIMAL,
//       allowNull: false,
//       defaultValue: 0,
//     },
//     image: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     createdInDb: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     }
//   }, {
//     timestamps: false,
//   });
// };

const { model, Schema } = require('mongoose')

const videoGameSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    released: {type: Date, required: true, default: "Unknown"},
    rating: {type: Number, required: true, default: 0},
    image: {type: String},
    genres: [{type: Schema.Types.ObjectId, ref: "genres"}],
    platforms: [{type: Schema.Types.ObjectId, ref: "platforms"}],
    createnInDb: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model('videogames', videoGameSchema)