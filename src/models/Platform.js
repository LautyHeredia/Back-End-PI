// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {
//     sequelize.define("platform", {
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     }, {
//         timestamps: false
//     })
// }

const { model, Schema } = require('mongoose')

const platformSchema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
     versionKey: false,
     timestamps: false
    }
)

module.exports = model('platforms', platformSchema)