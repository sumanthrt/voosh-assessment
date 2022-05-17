module.exports = (router) => {
    const userController = require("../controllers/user.controller");

    router.post("/add-user", userController.addUser);
    router.post("/login-user", userController.loginUser);
    
    return router;
}