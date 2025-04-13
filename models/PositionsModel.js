const {model} = require("mongoose");
const {PositionsSchema} = require("../schemas/PositionsSchema.js");

const PositionsModel = model("position", PositionsSchema);
module.exports = {
    PositionsModel
}