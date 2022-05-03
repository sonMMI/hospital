'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'doanson@gmail.com',
                password: '123456',
                firstName: 'John',
                lastName: 'Doe',
                address: 'Bắc Ninh',
                phoneNumber: '0347200992',
                gender: 1,
                image: '../public/image',
                roleId: 'R1',
                positionId: 'admin',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
