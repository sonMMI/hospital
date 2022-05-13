import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    // create user
    router.get('/crud', homeController.getCRUDPage);
    router.post('/post-crud', homeController.postCRUD);

    // read user
    router.get('/get-crud', homeController.getCRUD);

    // update user
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);

    // delete user
    router.get('/delete-crud', homeController.deleteCRUD);

    // API users
    router.post('/api/login', userController.handleLogin);

    return app.use('/', router);
};

module.exports = initWebRoutes;
