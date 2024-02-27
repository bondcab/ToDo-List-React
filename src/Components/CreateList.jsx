import { useState, useEffect } from "react";

function CreateList({ setNewList }) {
  const [listTitle, setListTitle] = useState("");
  console.log("List Title: ", listTitle);
  const [newTask, setNewTask] = useState("");
  const [listTasks, setListTasks] = useState([]);

  console.log("New Task: ", newTask);
  console.log("List Tasks Array: ", listTasks);

  function handleOnClick() {
    console.log("Add icon clicked");
    if (newTask !== "") {
      let tasksArray = [...listTasks];
      tasksArray.push(newTask);

      setListTasks(tasksArray);
      setNewTask("");
      localStorage.setItem(listTitle, JSON.stringify(listTasks));
    }
  }

  useEffect(() => {
    localStorage.setItem(listTitle, JSON.stringify(listTasks));
  }, [listTasks]);

  function handleOnCancel() {
    console.log("Cancel button clicked");
    setNewList(false);
  }

  let storedTasks = localStorage.getItem(listTitle);
  let storedTasksParsed = storedTasks ? JSON.parse(storedTasks) : [];
  console.log("Stored tasks: ", storedTasks);

  return (
    <div className="createListContainer">
      <div className="createListOptions">
        <form className="newListForm">
          <input
            className="listTitleInput"
            placeholder="List Title"
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
          <div className="addTaskContainer">
            <input
              className="newTaskInput"
              placeholder="Add a Task"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <img
              alt="add icon"
              src="/images/add_icon.png"
              className="addTaskIcon"
              onClick={handleOnClick}
            />
          </div>
        </form>
        <ul className="unorderedList">
          {storedTasksParsed.map((task) => (
            <li>{task}</li>
          ))}
        </ul>
        <div className="cancelContainer">
          <h3 className="cancel" onClick={handleOnCancel}>
            Cancel
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CreateList;
