/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    const arr = all.filter((item) => {
      return item.dueDate.split("-")[2] < new Date().toISOString().slice(8, 10);
    });
    return arr;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    const arr = all.filter((item) => {
      return (
        item.dueDate.split("-")[2] == new Date().toISOString().slice(8, 10)
      );
    });
    return arr;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    const arr = all.filter((item) => {
      return item.dueDate.split("-")[2] > new Date().toISOString().slice(8, 10);
    });
    return arr;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    const arr = list.map((item) => {
      let x = " ";
      if (item.completed) x = "x";
      if (item.dueDate.split("-")[2] == new Date().toISOString().slice(8, 10)) {
        return `[${x}] ${item.title}`;
      }
      return `[${x}] ${item.title} ${item.dueDate}`;
    });
    return arr.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #
