import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exists
                const user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                });
                if (user) {
                    // compare password
                    const check = bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Match success';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Your's not found`;
                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't existing. Please try other email!`;
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

const handleUserRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};
            const isExist = await checkUserEmail(data.email);

            //user not already exists
            if (!isExist) {
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
                    roleId: data.roleId || 3,
                });

                const newUser = await db.User.findOne({
                    where: { email: data.email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true,
                });
                userData.errCode = 0;
                userData.errMessage = 'Create user success';

                delete newUser.password;
                userData.user = newUser;
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email is existing. Please try other email!`;
            }
            resolve(userData);
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

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    handleUserLogin,
    handleUserRegister,
};
