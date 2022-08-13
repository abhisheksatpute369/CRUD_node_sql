const express = require('express');

const Router = express.Router();
const Vehicle = require("../Models/vehicle.model");


// getting all data of vehicle table using simple consept

// Router.get('/getall', (req, res) => {
//     connectdb.query('SELECT * FROM vehicle', (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     }
//     )
// });

//get all data of vehicle using sequelize concept

Router.get('/getall', (req, res) => {
    if(req.headers.origin === "http://localhost:3000" ){
        console.log("geting data");
        Vehicle.findAll().then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        }
        );
    }
    else{
        res.send("restricted origin");
    }
    
}
);

// for grt singlr vehicle by its id using simple method

// Router.get('/singlevehicle/:id', (req, res) => {
//     const id = req.params.id;
//     connectdb.query('SELECT * FROM vehicle WHERE id = ?', [id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     }
//     )
    
// });

//  for get single vehicle by its id using sequalize method

Router.get('/singlevehicle/:id', (req, res) => {
    if(req.headers.origin === "http://localhost:3000" ){
        console.log("geting data");
        Vehicle.findAll({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.send(data);
        }
        ).catch(err => {
            res.send(err);
        }
        );
    }
    else{
        res.send("restrictred origin")
    }

}
);

// for delete perticular vehicle by simple concept
// Router.delete('/delete/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `delete from vehicle where id = ${id}`;
//     connectdb.query(sql, id, function (err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// }
// );

//for delete perticular vehicle by sequalize concept

Router.delete('/delete/:id', (req, res) => {
    if(req.headers.origin === "http://localhost:3000" )
    {
        Vehicle.destroy({
            where: {
                id: Number(req.params.id)
            }
        }).then(data => {
            res.sendStatus(200).send(data);
        }).catch(err => {
            res.send(err);
        }
        );
    }
    else{
        res.send("Restricted Origin")
    }
}
);

//FOR POSTING NEW VEHICLE IN TABLE using simple method
// Router.post('/addvehicle', (req, res) => {
//     const post = req.body;
//     const sql = "insert into vehicle (Name, Company, Milage, Launchyear) values (?, ?, ?, ?)";
//     connectdb.query(sql, [post.Name, post.Company, post.Milage, post.Launchyear], function (err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// }
// );

//FOR POSTING NEW VEHICLE IN TABLE using sequalize method

Router.post('/addvehicle', (req, res) => {
    if(req.headers.origin === "http://localhost:3000" ){
        console.log("data added");
        Vehicle.create(req.body).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        }
        );
    }
    else{
        res.send("restricted origin")
    }
    
}
);

//for updating existing vehicle using simple concept
// Router.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     const post = req.body;
//     const sql= "update vehicle SET Name= ? , Company = ?, Milage = ?, Launchyear = ? where id = ?";
//     connectdb.query(sql, [post.Name, post.Company, post.Milage, post.Launchyear, id], function(err, result){
//         if(err) throw err;
//         console.log("record updated");
//         res.send(result)
//     })
// }
// );

//for updating existing vehicle using sequalize concept

Router.put('/update/:id', (req, res) => {
    if(req.headers.origin === "http://localhost:3000" ){
        Vehicle.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.send(data);
        }).catch(err => {
            
            res.send(err);
        }
        );
    }
    else{
        res.send("restricted Origin");
    }
    
}
);

module.exports = Router;