import { useState, useEffect } from "react";

// Component which appears when you click 'New List'
function CreateList({ setNewList, setToDoLists, toDoLists }) {
  // Defines the list title
  const [listTitle, setListTitle] = useState("");

  // Defines the new task being typed in the input box
  const [newTask, setNewTask] = useState("");

  // Defines the array of tasks currently set
  const [listTasks, setListTasks] = useState([]);

  // Function which runs when the Add icon is clicked
  function handleOnClick() {
    // If input field has a value it will run
    if (newTask !== "") {
      let tasksArray = [...listTasks]; // Variable holding a copy of the current listTasks useState array

      tasksArray.push(newTask); // Add the value of the newTask input

      setListTasks(tasksArray); // Updates the useState variable to tasksArray

      localStorage.setItem("Current list tasks", JSON.stringify(tasksArray)); // Updates the local storage "Current list tasks"

      setNewTask(""); // Sets the input value back to nothing ready for new input
    }
  }

  function handleEnterPressed() {
    if (newTask !== "") {
      let tasksArray = [...listTasks]; // Variable holding a copy of the current listTasks useState array

      tasksArray.push(newTask); // Add the value of the newTask input

      setListTasks(tasksArray); // Updates the useState variable to tasksArray

      // Updates the local storage "Current list tasks edit"
      localStorage.setItem(
        "Current list tasks edit",
        JSON.stringify(tasksArray)
      );

      setNewTask(""); // Sets the input value back to nothing ready for new input
    }
  }

  // Every time listTitle useState variable changes and if its value is not "" local storage "Current list title" updated
  useEffect(() => {
    if (listTitle !== "") {
      localStorage.setItem("Current list title", JSON.stringify(listTitle));
    }
  }, [listTitle]);

  // Runs once on component mount
  useEffect(() => {
    // Stores a copy of the local storage "Current list title" in a variable
    const localStorageTitle = JSON.parse(
      localStorage.getItem("Current list title")
    );

    // Stores a copy of the local storage "Current list tasks" in a variable
    const localStorageTasks = JSON.parse(
      localStorage.getItem("Current list tasks")
    );

    // Restores the useState listTitle variable with the value in local storage
    setListTitle(localStorageTitle);

    // Restores the useState listTasks variable with the value in local storage if it has a value
    if (localStorageTasks) {
      setListTasks(localStorageTasks);
    }
  }, []);

  // Function ran when Cancel is clicked
  function handleOnCancel() {
    setNewList(false); // Hides the CreateList component
    localStorage.removeItem("Current list tasks"); // Removes reference of the list tasks you are working on from local storage
    localStorage.removeItem("Current list title"); // Removes reference of the list title you are working on from local storage
  }

  // Function ran when Bin icon is clicked. Removes task from list
  function handleBinClick(index) {
    let array = [...listTasks]; // Copy of useState listTasks put in variable

    array.splice(index, 1); // Takes the index value of the task and updates the array variable to remove that task

    setListTasks(array); // Updates the useState listTasks variable to array

    localStorage.setItem("Current list tasks", JSON.stringify(array)); // Updates the local storage reference to tasks being worked on
  }

  // Returns an array of React elements
  let lineItems = () => {
    let items = [];

    // Loops throught the useState listTasks variable and for each item returns a element showing the task name and a trash icon to remove it
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

  // New list object
  const list = {
    name: listTitle,
    tasks: listTasks,
  };

  // Function which runs when "Create List" button is clicked
  function handleCreateClick() {
    setNewList(false); // Hides the CreateList component
    localStorage.removeItem("Current list tasks"); // Removes reference to list tasks you are workig on from local storage
    localStorage.removeItem("Current list title"); // Removes reference to list title you are workig on from local storage
    let localStorageLists = JSON.parse(localStorage.getItem("ToDo Lists")); // Stores value of local stoage "ToDo Lists" in variable
    let listsArray = [];

    listsArray = localStorageLists ? [...localStorageLists] : []; // Sets value of variable to copy of local storage refernce variable if value if truthy

    listsArray.push(list); // Add the list object to listsArray variable

    setToDoLists(listsArray); // Updates the toDoLists useState variable

    localStorage.setItem("ToDo Lists", JSON.stringify(listsArray)); // Updates local storage key holding info on current application lists
    // const checkedItems = [];
    // localStorage.setItem("Checked Items", JSON.stringify(checkedItems));
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnterPressed();
                }
              }}
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
