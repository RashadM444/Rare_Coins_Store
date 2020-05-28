const express = require("express");
const app = express();
const port = 3005;
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const randomString = require("./randomString");
// const checkToken = require("./checkToken");
const cors = require("cors");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "coins",
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Check LOGIN

// The route to get all coins

app.get("/allCoins", (req, res) => {
  pool.query(
    `SELECT id,name, obverse, reverse, country, metal, quality, faceVal, year, weight, price, shortInfo, longInfo, type FROM coins`,
    (err, data) => {
      if (err) {
        res.status(500);
      } else {
        res.json(data);
      }
    }
  );
});

// The Route to get Bullion coins

app.get("/coins", (req, res) => {
  const { type } = req.query;
  const query = `SELECT id,name, obverse, shortInfo, type FROM coins WHERE type= '${type}'`;
  pool.query(query, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.json(data);
    }
  });
});

// The Route to get coin by id
app.get("/coin/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT id,name, obverse, reverse, country, metal, quality, faceVal, year, weight, price, shortInfo, longInfo, type FROM coins WHERE id= ${id}`;
  pool.query(query, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.json(data[0]);
    }
  });
});

//THe route to get coin info for select tags

app.get("/coin/options/:id", (req, res) => {
  const value = req.params.id;
  const sql = `SELECT ${value} FROM coins GROUP BY ${value} HAVING count(*) > 0`;
  pool.query(sql, (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.json(data);
    }
  });
});

//The route to post a new coin
app.post("/addCoin", (req, res) => {
  let {
    name,
    faceVal,
    year,
    price,
    country,
    metal,
    shortInfo,
    longInfo,
    quality,
    weight,
    obverse,
    reverse,
  } = req.body;
  let coin = {
    name: name,
    faceVal: faceVal,
    year: Number(year),
    price: Number(price),
    country: country,
    metal: metal,
    shortInfo: shortInfo,
    longInfo: longInfo,
    quality: quality,
    weight: weight,
    obverse: obverse,
    reverse: reverse,
  };

  pool.query(
    `INSERT INTO coins (name, obverse, reverse, country, metal, quality, faceVal, year, weight, price, shortInfo, longInfo, type) 
      VALUES ('${coin.name}', '${coin.obverse}', '${coin.reverse}', '${coin.country}', '${coin.metal}', '${coin.quality}','${coin.faceVal}', ${coin.year}, '${coin.weight}', '${coin.price}', '${coin.shortInfo}', '${coin.longInfo}', '${coin.type}')`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.json(coin);
      }
    }
  );
});
// });
//The route to edit a coin

//The route to delete a coin

app.delete("/deleteCoin/:id", (req, res) => {
  pool.query(`DELETE FROM coins WHERE id = '${req.params.id}'`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(204);
    }
  });
});

// The route to token/login

app.post("/token", (req, res) => {
  const reqLogin = req.body.login;
  const reqPass = req.body.pass;
  const newToken = randomString(255);
  const SEARCH_ADMIN = `SELECT id, user, hash, salt FROM admin WHERE user= '${reqLogin}'`;
  const SET_TOKEN = `UPDATE admin SET token = '${newToken}' WHERE user='${reqLogin}'`;

  pool.query(SEARCH_ADMIN, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      const salt = data[0].salt;
      const hash = data[0].hash;
      const checkHash = bcrypt.hashSync(reqPass, salt);
      if (checkHash === hash) {
        pool.query(SET_TOKEN, (err, data) => {
          if (err) {
            res.sendStatus(401);
          } else {
            res.json({ login: reqLogin, token: newToken });
          }
        });
      } else {
        res.sendStatus(401);
      }
    }
  });
});

//The route to register

app.post("/register", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.pass, salt);
  const user = {
    login: req.body.login,
    hash: hash,
    salt: salt,
  };
  console.log(user);
  pool.query(
    `INSERT INTO admin (user, hash, salt) VALUES ('${user.login}', '${user.hash}', '${user.salt}')`,
    (err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({ user: user.login });
      }
    }
  );
});

//The route to search

app.post("/search", (req, res) => {
  function clear(searchObj) {
    for (let key in searchObj) {
      if (!searchObj[key]) {
        delete searchObj[key];
      }
    }
  }
  const {
    search,
    country,
    metal,
    quality,
    fromPrice,
    toPrice,
    fromYear,
    toYear,
  } = req.body.searchObj;

  const searchObj = { ...req.body.searchObj };
  search
    ? (searchObj.search = `(name LIKE '%${search}%' OR shortInfo LIKE '%${search}%' OR longInfo LIKE '%${search}%')`)
    : (searchObj.search = `(name LIKE '%' '%' OR shortInfo LIKE '%' '%' OR longInfo LIKE '%' '%')`);
  country ? (searchObj.country = `country = '${country}'`) : "";
  metal ? (searchObj.metal = `metal = '${metal}'`) : "";
  quality ? (searchObj.quality = `quality = '${quality}'`) : "";
  fromPrice ? (searchObj.fromPrice = `price>=${fromPrice}`) : "";
  toPrice ? (searchObj.toPrice = `price<=${toPrice}`) : "";
  fromYear ? (searchObj.fromYear = `year>=${fromYear}`) : "";
  toYear ? (searchObj.yearTo = `year<=${toYear}`) : "";

  clear(searchObj);
  // console.log(searchObj);

  const info = Object.values(searchObj);
  const sql = `SELECT * FROM coins WHERE ${info.join(" AND ")} ${
    search
      ? `ORDER BY CASE WHEN name LIKE '${search}%' THEN 1 WHEN name LIKE '%${search}' THEN 3 ELSE 2 END`
      : ""
  }`;
  console.log(sql);
  pool.query(sql, (err, data) => {
    if (!err) {
      // console.log(data);
      res.json(data);
    } else {
      res.sendStatus(500);
    }
  });
});

// The route to update coin

app.post("/updateCoin/:id", (req, res) => {
  const { coin } = req.body;
  const sql = `UPDATE coins 
  SET
      name = '${coin.name}', obverse= '${coin.obverse}', reverse = '${coin.reverse}',  country = '${coin.country}',  metal = '${coin.metal}', quality = '${coin.quality}', faceVal = '${coin.faceVal}', year = ${coin.year}, weight = '${coin.weight}', price = ${coin.price}, shortInfo = '${coin.shortInfo}', longInfo = '${coin.longInfo}', type = '${coin.type}' WHERE id = ${coin.id}`;
  pool.query(sql, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      console.log(err);
      res.sendStatus(500);
    }
  });
});

//listen
app.listen(port, function () {
  console.log(`Server is up at port ...${port}`);
});
