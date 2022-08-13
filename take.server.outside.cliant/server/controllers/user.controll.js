const express = require('express');
const register = require("../Models/user.model")
const Router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
require("dotenv").config()


const newToken = (user) => {
    return jwt.sign({ user}, process.env.SECRETE, {
        expiresIn: 60*30
    })
}

//for getting all user data using simple method

// Router.get('/login', (req, res) => {
//     connectdb.query('SELECT * FROM users', (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     }
//     )
// });

//for getting all user data using sequalize mwthod
Router.get("/user", (req, res) => {
    register.findAll().then(data => {
      res.send(data);
      }).catch(err => {
          res.send(err);
      }
      );
  }
  );

//FOR POSTING NEW user IN TABLE using simple method
// Router.post('/adduser', async (req, res) => {
//     const post = req.body;
//     const hash  = await bcrypt.hash(post.password, 10)
//     const sql = "insert into users (firstName, lastName, email, password) values (?, ?, ?, ?)";
//     await connectdb.query(sql, [post.firstName, post.lastName, post.email, hash], function (err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// }
// );


//FOR POSTING NEW user IN TABLE using sequalize method
Router.post('/adduser', (req, res) => {
    console.log("data added");
    const {firstName, lastName, Email, Password} = req.body;
    const hash = bcrypt.hashSync(Password, 10);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

         register.findOne({
             where: {
                 Email
             }
         }).then(user => {
             if (user) {
                 res.send("User already exists")
             } else {
                register.create({firstName, lastName, Email, Password : hash}).then(user => {
                    res.send({
                        message: "User created successfully",
                        user,
                        token: newToken(user)
                    })
                }).catch(err => {
                    res.send( err.message)
                }
                )
             }
         }
         ).catch(err => {
             res.send(err.message)
         }
         )
}
);

// for searching perticular user at time of login 
Router.post("/login", (req, res) => {
    const { Email, Password } = req.body;
    register.findOne({
        where: {
            Email
        }
    }).then(user => {
        if (user) {
            var validate =  bcrypt.compareSync(Password, user.Password);
            if (validate) {
                res.send({
                    message:"Login Success",
                    user,
                    token: newToken(user)
                })
            } else {
                res.send("Password is incorrect")
            }
        } else {
            res.send("User not found")
        }
    }
    ).catch(err => {
        res.send(err.message)
    }
    )
}
)


module.exports = Router;