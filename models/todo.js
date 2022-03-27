const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      check: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "TODO",
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todolist',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Todo.belongsTo(db.User);
  }
};
