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
      // define association here
    }
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }
    static getTodos(){
      return this.findAll();
    }
    static async remove(id){
      return this.destroy({
        where:{
          id,
        },
      });
    }
    static getOverdueTodos() {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
        },
      });
    }
    static getDueTodayTodos() {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate:new Date().toISOString().slice(0, 10),        
          completed: false,
        },
      });
    }
    static getdueLaterTodos() {
      const { Op } = require("sequelize");
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
          completed: false,
        },
      });
    }
    markAsCompleted() {
      return this.update({ completed: true });
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
