import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

// create user
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(
                data.password
            );
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? 'true' : 'false',
                roleId: data.roleId,
            });
            resolve('ok! create a new user success.');
        } catch (error) {
            reject(error);
        }
    });
};

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

// read user
const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({ raw: true });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

const getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
};

// update user
const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id },
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                const allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

// delete user
const deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
            });

            if (user) {
                await user.destroy();
                resolve();
            } else {
                reject();
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUserData,
    deleteUserById,
};
