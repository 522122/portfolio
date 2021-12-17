"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: "ec44cd8c-6328-47f2-811b-d95bf543634f",
          loginName: "lolofon@icloud.com",
          displayName: "522122",
          password: "$2b$12$FwauqeSWca0X5bv6BMqNieNM.n2YPzKNo3ynKYI0E.PpunRSYUXGu",
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "Users",
      {
        id: "ec44cd8c-6328-47f2-811b-d95bf543634f",
      },
      {}
    )
  },
}
