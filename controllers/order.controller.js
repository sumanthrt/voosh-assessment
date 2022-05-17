const Order = require("../models").order;

exports.addOrder = (req, res) => {
    if (!req.body.user_id || !req.body.sub_total || !req.body.phone_number) {
        res.status(400).send({
            message: "Please provide user id, sub total and phone number to continue.",
        });
        return;
    }
    const filter = { user_id: req.body.user_id };

    Order.findOne(filter, (err, order) => {
        if (!order) {
            const order = new Order({
                user_id: req.body.user_id,
                phone_number: req.body.phone_number,
                sub_total: req.body.sub_total,
            });

            order.save(order)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        } else {
            res.status(400).send({ message: "Order already exists" });
        }
    });
};

exports.getOrder = (req, res) => {
    const { user_id } = req.params; // get user_id from params
    Order.find({ user_id: user_id })
        .then((data) => {
            if (data === null) {
                res.send({ message: "User ID invalid" });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Order Not Found",
            });
        });
};