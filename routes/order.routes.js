module.exports = (router) => {
    const orderController = require("../controllers/order.controller");

    router.post("/add-order", orderController.addOrder);
    router.get("/get-order/:user_id", orderController.getOrder);
    
    return router;
}