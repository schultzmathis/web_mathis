import React from "react";
import { TodoItem } from "../todoItem";

export default {
  title: "todo",
  component: TodoItem,
};

const Template = (args) => (
  <TodoItem
    task={{ title: "Bonjour", done: true }}
    setAsDone={() => {}}
    setAsTodo={() => {}}
    removeTask={() => {}}
  />
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
