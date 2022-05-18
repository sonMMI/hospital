import servicesUsers from '../services/servicesUsers';

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!',
        });
    }

    const userData = await servicesUsers.handleUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData?.user || {},
    });
};

const handleRegister = async (req, res) => {
    const data = req.body.data;
    const email = data.email;
    const password = data.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs email or password!',
        });
    }

    const createUser = await servicesUsers.handleUserRegister(data);

    return res.status(200).json({
        errCode: createUser.errCode,
        message: createUser.errMessage,
        user: createUser?.user || {},
    });
};

module.exports = {
    handleLogin,
    handleRegister,
};
