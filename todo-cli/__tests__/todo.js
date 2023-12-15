const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();
const today = new Date().toISOString().split("T")[0];
const time = new Date();
describe("ToDo Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
  });
  test("Should add new todo", () => {
    const length = all.length;
    expect(length).toBe(1);
    add({
      title: "Test todo",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(length + 1);
  });
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Should Display overdue items", () => {
    add({
      title: "Test1",
      completed: false,
      dueDate: new Date(time.getTime() - 1 * 60 * 60 * 24 * 1000)
        .toISOString()
        .split("T")[0],
    });
    const items = overdue();
    expect(items.length).toBe(1);
  });
  test("Should Display due today items", () => {
    const items = dueToday();
    expect(items.length).toBe(2);
  });
  test("Should Display due later items", () => {
    add({
      title: "Test1",
      completed: false,
      dueDate: new Date(time.getTime() + 1 * 60 * 60 * 24 * 1000)
        .toISOString()
        .split("T")[0],
    });
    const items = dueLater();
    expect(items.length).toBe(1);
  });
});
