const {model} = require("mongoose");
const {HoldingsSchema} = require("../schemas/HoldingsSchema.js");

const HoldingsModel = model("holding", HoldingsSchema);

module.exports = HoldingsModel;
    
