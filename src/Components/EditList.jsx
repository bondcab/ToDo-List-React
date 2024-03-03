import { useState, useEffect } from "react";

// Component which appears when you click 'New List'
function EditList({ setEditList, setToDoLists, toDoLists, editListName }) {
  // Defines the list title
  const [listTitleEdit, setListTitleEdit] = useState("");
  console.log("List Title Edit: ", listTitleEdit);
  // Defines the new task being typed in the input box
  const [newTask, setNewTask] = useState("");
  // Defines the array of tasks currently set
  const [listTasks, setListTasks] = useState([]);

  // Function which runs when Add task icon clicked
  function handleOnClick() {
    // If input field has a value it will run
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

  // When listTitleEdit changes then local storage "Current list title edit" gets updated
  useEffect(() => {
    if (listTitleEdit !== "") {
      localStorage.setItem(
        "Current list title edit",
        JSON.stringify(listTitleEdit)
      );
    }
  }, [listTitleEdit]);

  // Runs once on component mounts
  useEffect(() => {
    const localStorageTitleEdit = JSON.parse(
      localStorage.getItem("Current list title edit")
    );

    // Variable holding local storage "Current list tasks edit"
    const localStorageTasks = JSON.parse(
      localStorage.getItem("Current list tasks edit")
    );

    setListTitleEdit(localStorageTitleEdit); // Updates useState variable with value from local storage

    if (localStorageTasks) {
      setListTasks(localStorageTasks);
    }
  }, []);

  // Function which runs when Cancel is clicked
  function handleOnCancel() {
    setEditList(false); // Hides EditList component
    localStorage.removeItem("Current list tasks edit"); // Removes from local storage
    localStorage.removeItem("Current list title edit"); // Removes from local storage
  }

  // Function which runs when Trash icon clicked
  function handleBinClick(index) {
    let array = [...listTasks];
    array.splice(index, 1);
    setListTasks(array);
    localStorage.setItem("Current list tasks edit", JSON.stringify(array));
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

  // New list object
  const list = {
    name: listTitleEdit,
    tasks: listTasks,
  };

  // Function which runs when Done button clicked
  function handleDoneClick() {
    setEditList(false);
    localStorage.removeItem("Current list tasks edit");
    localStorage.removeItem("Current list title edit");
    let localStorageLists = JSON.parse(localStorage.getItem("ToDo Lists"));
    let listsArray = [];
    const taskName = editListName;

    listsArray = [...localStorageLists];
    const listsArrayFilter = listsArray.filter(
      (task) => task.name !== taskName
    );

    listsArrayFilter.push(list);

    setToDoLists(listsArrayFilter);

    localStorage.setItem("ToDo Lists", JSON.stringify(listsArrayFilter));
  }

  // Function that runs when Delete icon clicked
  function handleDeleteList() {
    let localStorageLists = JSON.parse(localStorage.getItem("ToDo Lists"));
    const taskName = editListName;
    let localStorageListsFiltered = localStorageLists.filter(
      (task) => task.name !== taskName
    );

    localStorage.setItem(
      "ToDo Lists",
      JSON.stringify(localStorageListsFiltered)
    );
    setEditList(false);

    localStorage.removeItem("Current list tasks edit"); // Removes from local storage
    localStorage.removeItem("Current list title edit"); // Removes from local storage
  }

  return (
    <div className="createListContainer">
      <div className="createListOptions">
        <form className="newListForm">
          <input
            className="listTitleInput"
            placeholder="List Title"
            type="text"
            value={listTitleEdit}
            onChange={(e) => setListTitleEdit(e.target.value)}
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
          <button className="createListButton" onClick={handleDoneClick}>
            Done
          </button>
        </div>

        <div className="cancelEditContainer">
          <div className="deleteIconContainer">
            <img
              alt="deleteListIcon"
              src="/images/trash.svg"
              className="deleteListIcon"
              onClick={handleDeleteList}
            />
          </div>
          <h3 className="editCancel" onClick={handleOnCancel}>
            Cancel
          </h3>
        </div>
      </div>
    </div>
  );
}

export default EditList;
