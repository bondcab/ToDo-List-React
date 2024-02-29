import { useState, useEffect } from "react";

// Component which appears when you click 'New List'
function CreateList({ setNewList }) {
  // Defines the list title
  const [listTitle, setListTitle] = useState("");
  console.log("List Title: ", listTitle);
  // Defines the new task being typed in the input box
  const [newTask, setNewTask] = useState("");
  // Defines the array of tasks currently set
  const [listTasks, setListTasks] = useState([]);

  console.log("New Task: ", newTask);
  console.log("List Tasks Array: ", listTasks);

  function handleOnClick() {
    console.log("Add icon clicked");
    if (newTask !== "") {
      let tasksArray = [...listTasks];
      tasksArray.push(newTask);

      setListTasks(tasksArray);

      localStorage.setItem("Current list tasks", JSON.stringify(listTasks));
      setNewTask("");
    }
  }

  useEffect(() => {
    localStorage.setItem("Current list tasks", JSON.stringify(listTasks));
  }, [listTasks]);

  useEffect(() => {
    if (listTitle !== "") {
      localStorage.setItem("Current list title", JSON.stringify(listTitle));
    }
  }, [listTitle]);

  // Runs once on component mount. Gets the stored values for the current list title and values
  useEffect(() => {
    const localStorageTitle = JSON.parse(
      localStorage.getItem("Current list title")
    );
    const localStorageTasks = JSON.parse(
      localStorage.getItem("Current list tasks")
    );

    setListTitle(localStorageTitle);
  }, []);

  function handleOnCancel() {
    console.log("Cancel button clicked");
    setNewList(false);
    localStorage.removeItem("Current list tasks");
  }

  let storedTasks = localStorage.getItem("Current list tasks");
  let storedTasksParsed = storedTasks ? JSON.parse(storedTasks) : [];
  // console.log("Stored tasks Parsed: ", storedTasksParsed);

  function handleBinClick(index) {
    console.log("Bin clicked");
    console.log("Bin index: ", index);
    let array = [...listTasks];
    console.log("Array: ", array);
    array.splice(index, 1);
    console.log("Updated Array", array);
    setListTasks(array);
  }

  // Returns an array of React elements
  let lineItems = () => {
    let items = [];
    for (let i = 0; i < listTasks.length; i++) {
      items.push(
        <div className="lineItemContainer" key={i}>
          <li className="lineItemName">{listTasks[i]}</li>
          <div className="binContainer">
            <img
              src="/images/trash.png"
              alt="bin"
              className="bin"
              onClick={() => handleBinClick(i)}
            />
          </div>
        </div>
      );
    }

    return items;
  };

  function handleCreateClick() {
    console.log("Create list clicked");
    setNewList(false);
  }

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
        <ul className="unorderedList">{lineItems()}</ul>
        <div className="createButtonContainer">
          <button className="createListButton" onClick={handleCreateClick}>
            Create List
          </button>
        </div>

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
