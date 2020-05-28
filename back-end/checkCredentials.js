//function to check credentials
const bcrypt = require("bcrypt");
const checkCredentials = (req) => {
  const userLogin = req.body.login;
  const userPass = req.body.pass;


  pool.query(`SELECT id, user, hash FROM admin WHERE user= '${userLogin}'`, (err,data)=> {

    if(err) {
      res.sendStatus()
    }
  })
  
  if (!user) {
    return false;
  }
  const salt = user.salt;
  const hash = bcrypt.hashSync(userPass, salt);
  if (user.hash === hash) {
    return true;
  } else {
    return false;
  }
};

module.exports = checkCredentials;


// app.all("/", function (req, res, next) {
//   res.set("Content-Type", "application/json");
//   next();
// });

// app.all("/", function (req, res, next) {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });