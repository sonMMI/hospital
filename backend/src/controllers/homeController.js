import db from '../models/index';
import servicesCRUD from '../services/servicesCRUD';

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (error) {
        console.log(error);
    }
};

const getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

// create user
const getCRUDPage = (req, res) => {
    return res.render('createCRUD.ejs');
};

const postCRUD = async (req, res) => {
    const message = await servicesCRUD.createNewUser(req.body);
    const data = await servicesCRUD.getAllUsers();
    return res.render('displayCRUD.ejs', { data });
};

// read user
const getCRUD = async (req, res) => {
    const data = await servicesCRUD.getAllUsers();
    return res.render('displayCRUD.ejs', { data });
};

// update user
const editCRUD = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        const userData = await servicesCRUD.getUserInfoById(userId);
        return res.render('editCRUD.ejs', { userData });
    } else {
        return res.send('Not found User');
    }
};

const putCRUD = async (req, res) => {
    const data = req.body;
    const allUsers = await servicesCRUD.updateUserData(data);
    return res.render('displayCRUD.ejs', { data: allUsers });
};

// delete user
const deleteCRUD = async (req, res) => {
    const id = req.query.id;
    if (id) {
        await servicesCRUD
            .deleteUserById(id)
            .then(() => res.send('Delete Successfully'))
            .catch(() => res.send('User not found'));
    } else {
        return res.send('User not found');
    }
};

module.exports = {
    getHomePage,
    getAboutPage,
    getCRUDPage,
    getCRUD,
    postCRUD,
    editCRUD,
    putCRUD,
    deleteCRUD,
};
