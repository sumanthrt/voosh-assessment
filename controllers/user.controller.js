const User = require("../models").user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.addUser = (req, res) => {
    //Validate API call
    if (!req.body.name || !req.body.password || !req.body.phone_number) {
        res.status(400).send({
            message: "Please provide name, phone number and password to continue.",
        });
        return;
    }
    //filter db based on phone number to check for duplicate user
    const filter = { phone_number: req.body.phone_number };
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);// hashed password

    User.findOne(filter, (err, user) => {
        if (!err && user === null) {
            //create user object
            const user = new User({
                name: req.body.name,
                phone_number: req.body.phone_number,
                password: hashedPassword,
            });

            user.save(user)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        } else {
            res.status(400).send({ message: "User already exists" });
        }
    });
};

exports.loginUser = (req, res) => {
    if (!req.body.phone_number || !req.body.password) {
        res.status(400).send({
            message: "Please provide phone number and password to continue.",
        });
        return;
    }
    const filter = { email: req.body.phone_number };

    User.findOne(filter, (err, user) => {
        if (user === null) {
            res.status(401).send({ message: "User Not Found. Please Register" });
            return;
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                user.isLoggedIn = true;
                User.findOneAndUpdate(filter, user)
                    .then((data) => {
                        const token = jwt.sign({ _id: data._id }, "privatekey");
                        console.log(token);
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Some error occured.",
                        });
                    });
            } else {
                res.status(401).send({
                    message: "Incorrect Password. Please Try Again",
                });
            }
        }
    });
};