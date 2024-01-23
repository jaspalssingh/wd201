/* eslint-disable no-unused-vars */
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User,{
        foreignKey:'userId'
      })
      // define association here
    }
    static addTodo({ title, dueDate, userId }) {
      return this.create({ title: title, dueDate: dueDate, completed: false,userId });
    }
    static getTodos(){
      return this.findAll();
    }
    static async remove(id,userId){
      return this.destroy({
        where:{
          id,
          userId
        },
      });
    }
    static getOverdueTodos(userId) {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
          userId,
        },
      });
    }
    static getDueTodayTodos(userId) {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate:new Date().toISOString().slice(0, 10),        
          completed: false,
          userId,
        },
      });
    }
    static getdueLaterTodos(userId) {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
          userId,
        },
      });
    }
    static getCompletedTodos(userId) {
      return this.findAll({
        where: {
          completed: true,
          userId,
        },
      });
    }
    setCompletionStatus(status) {
      return this.update({ completed: !status });
    }
    
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
