"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { stock, customers } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    const customerData = req.body;
    const stockData = stock;
    const { order, size } = req.body;
  
    console.log(req.body)

    //confirming if existing customer
    customers.filter((customer) => {
      if (
        (customerData.givenName === customer.givenName &&
          customerData.surname === customer.surname &&
          customerData.email === customer.email) ||
          customerData.address === customer.address
      ) {
          //console.log("repeatcustomer")
        return res.status(200).json({ status: "error", error: "repeat-customer" })
      }
    })

  //Confirming if item is indeed in stock
  if (order == "tshirt" && stockData[order][size] <= 0) {
    res.status(200).json({ status: "error", error: "unavailable"})
    } else if (stockData[order] <= 0) {
      res.status(200).json({ status: "error", error: "unavailable"})
    }

  //Confirming if the customer email is valid
  if (customerData.email.includes("@") == false) {
    //console.log("invalemail")
    return res.status(200).json({ status: "error", error: "missing-data"})
  }

  //validating we are able to ship to the desired country
  if (customerData.country.toLowerCase() != "canada") {
    //console.log("invaldata")
    return res.status(200).json({ status: "error", error: "undeliverable"})
  }

  res.status(200).json({ status: "success" })
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
