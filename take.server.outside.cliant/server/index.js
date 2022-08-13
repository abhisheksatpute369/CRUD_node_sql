const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./config/db');
require("dotenv").config(); 


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require('./controllers/vehicle.controller'));

app.use("/", require('./controllers/user.controll'));

app.use("/", require('./controllers/bikedetail.controller'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    sequelize.authenticate().then(() => {
        console.log('Yep! you connected to database');
    }).catch(err => {
        console.error('Sorry! unable to connect', err);
    }
    );
})

// const db = {};
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // import all models here 

// db.vehicle = require("./Models/vehicle.model")(sequelize, DataTypes)


// db.bikedetail = require("./Models/bikedetail.model")(sequelize, DataTypes)
// db.sequelize.sync({force:false}).then(()=>{console.log("resync")});


// // one to one relation ship 

// db.vehicle.hasOne(db.bikedetail,{
//     foreignKey : "id",
//     as : "bikedetails"
// })

// db.bikedetail.belongsTo(db.vehicle,{
//     foreignKey: "id",
//     as : "vehicle"
// })

// module.exports = db;