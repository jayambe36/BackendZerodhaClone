require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const HoldingsModel = require("./models/HoldingsModel.js");
const { PositionsModel } = require("./models/PositionsModel.js");
const { OrdersModel } = require("./models/OrdersModel.js");
const cookieParser = require("cookie-parser");
const AuthRoute = require("./AuthRoute.js");

const Port = process.env.PORT || 3004;
const url = process.env.MONGO_URL;
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "*",  // ✅ Allows requests from ALL origins
  credentials: true
}));


app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let  allOrders =  [
//     {
//       name: "INFY",
//       price: 1555.45,
//       percent: "-1.60%",
//       isDown: true,
//     },
//     {
//       name: "ONGC",
//       price: 116.8,
//       percent: "-0.09%",
//       isDown: true,
//     },
//     {
//       name: "TCS",
//       price: 3194.8,
//       percent: "-0.25%",
//       isDown: true,
//     },
//     {
//       name: "KPITTECH",
//       price: 266.45,
//       percent: "3.54%",
//       isDown: false,
//     },
//     {
//       name: "QUICKHEAL",
//       price: 308.55,
//       percent: "-0.15%",
//       isDown: true,
//     },
//     {
//       name: "WIPRO",
//       price: 577.75,
//       percent: "0.32%",
//       isDown: false,
//     },
//     {
//       name: "M&M",
//       price: 779.8,
//       percent: "-0.01%",
//       isDown: true,
//     },
//     {
//       name: "RELIANCE",
//       price: 2112.4,
//       percent: "1.44%",
//       isDown: false,
//     },
//     {
//       name: "HUL",
//       price: 512.4,
//       percent: "1.04%",
//       isDown: false,
//     },
//   ];
//   allOrders.forEach((data) => {
//     let newOrder = new OrdersModel({
//     name: data.name,
//     price: data.price,
//     percent: data.percent,
//     isDown: data.isDown,
//     });

//     newOrder.save();
//     console.log("data saved");
//   });

//   res.send("aDone");
// });

app.use(cookieParser());

app.use(express.json());

app.use("/", AuthRoute);

app.get("/allHoldings", async(req, res)=>{
  const allHoldings = await HoldingsModel.find();
  res.send(allHoldings);
})

app.get("/allPositions", async(req, res)=>{
  const allPositions = await PositionsModel.find();
  res.send(allPositions);
})

app.post("/addNewOrder", (req, res) =>{
  const {name, qty, price,mode} = req.body;
  let newOrder = new OrdersModel({
    name,
    qty,
    price,
    mode,
  });

  newOrder.save();
  res.send("Order added");
})

app.get("/allOrders", async(req, res) =>{
  const allOrders = await OrdersModel.find({});
  res.send(allOrders);
})

app.listen(Port, () => {
  console.log("Server started at port", Port);
});

mongoose.connect(url)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  })


