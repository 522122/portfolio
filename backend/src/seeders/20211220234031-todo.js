"use strict"

const UserId = "ec44cd8c-6328-47f2-811b-d95bf543634f"

const titles = ["methodologies", "e-business", "markets"]
const contents = [
  "scale out-of-the-box communities",
  "visualize next-generation markets",
  "disintermediate collaborative architectures",
  "synthesize end-to-end ROI",
  "synergize proactive channels",
  "transform killer convergence",
  "empower dot-com niches",
  "architect 24/7 web services",
]

const distribute = (index, insertedLists) => {
  if (index > 2) {
    return insertedLists[0].id
  } else if (index > 6) {
    return insertedLists[1].id
  } else {
    return insertedLists[2].id
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        "TodoLists",
        titles.map((title) => {
          return {
            UserId,
            title,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      )

      const insertedLists = await queryInterface.rawSelect(
        "TodoLists",
        {
          where: {
            title: {
              [Sequelize.Op.in]: titles,
            },
          },
          plain: false,
        },
        ["id"]
      )

      await queryInterface.bulkInsert(
        "Todos",
        contents.map((content, index) => {
          return {
            UserId,
            content,
            completed: false,
            TodoListId: distribute(index, insertedLists),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      )
    } catch (e) {
      console.log(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TodoLists", {
      title: titles,
      UserId,
    })

    await queryInterface.bulkDelete("Todos", {
      content: contents,
      UserId,
    })
  },
}
