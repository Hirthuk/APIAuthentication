import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";
const API_URL_Random = "https://secrets-api.appbrewery.com/random"
const API_URL_Basic_Auth = "https://secrets-api.appbrewery.com/all?page=2"


//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "24d23a26-69c8-4070-a45f-69e8835ead54";
const yourBearerToken = "";

const Apai_Key = "https://secrets-api.appbrewery.com/filter"

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async  (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
  const response = await axios.get(API_URL_Random);
  const result = JSON.stringify(response.data);
  console.log("Response went succesfully");
  res.render("index.ejs",{content: result});
  } catch (error) {
    console.log("Error occured");
    res.render("index.ejs",{content: error});
  }
  

});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
 try{
  const respone = await axios.get(API_URL_Basic_Auth, {
    auth: {
      username: "Sharan",
      password: "Sharan@007"
    }
  }
  
  )
  const result = JSON.stringify(response.data);
  res.render("index.ejs",{content: result});
 }
 catch(error){
  console.log(error);
  res.render("index.ejs",{content: error});
 }


});

app.get("/apiKey",async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const response = await axios.get(Apai_Key,{
      params:{
          score : 5,
          apiKey : yourAPIKey
      }
    })
    const result = JSON.stringify(response.data);
    console.log("Response went succesfully");
    res.render("index.ejs",{content: result});
    } catch (error) {
      console.log("Error occured");
      res.render("index.ejs",{content: error});
    }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42",{
      headers: {
        Authorization: `Bearer ${yourBearerToken} `
      }
    }); // two use awai the function shouold be async
    const result = JSON.stringify(response.data);
    console.log("Response went succesfully");
    res.render("index.ejs",{content: result});
    } catch (error) {
      console.log("Error occured");
      res.render("index.ejs",{content: error});
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//I couldn't register showing error so I couldn't complete the Basic auth, and bearer token tasks.