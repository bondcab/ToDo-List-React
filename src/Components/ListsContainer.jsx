import CreateList from "./CreateList";
import EditList from "./EditList";
import { useState, useEffect } from "react";

function ListsContainer({
  newList,
  setNewList,
  setToDoLists,
  toDoLists,
  editList,
  setEditList,
  setEditListName,
  editListName,
}) {
  let toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists")); // Variable holding the value of "ToDo Lists" in local storage
  const [checked, setChecked] = useState([]); // useState variable holding array of tasks which have been checked

  // If toDoListStorage value is null (hasnt been assigned a value yet), set its value to empty array
  if (toDoListStorage === null) {
    const checkedItems = [];
    localStorage.setItem("Checked Items", JSON.stringify(checkedItems));
  }

  // Runs once on component mounting. Creates a variable holding the value of the local storage "Checked Items" array and updates useState variable "checked" to it
  useEffect(() => {
    const checkedStorage = JSON.parse(localStorage.getItem("Checked Items"));
    setChecked(checkedStorage);

    const currentListTitle = JSON.parse(
      localStorage.getItem("Current list title")
    );

    const currentListTitleEdit = JSON.parse(
      localStorage.getItem("Current list title edit")
    );

    if (currentListTitle) {
      setNewList(true);
    }

    if (currentListTitleEdit) {
      setEditList(true);
    }
  }, [setEditList, setNewList]);

  // Function which runs when you click the unchecked box icon
  function handleUncheckedClick(list, task) {
    const checkedArray = [...checked]; // Copy of useState variable checked put stored in variable
    checkedArray.push(`${list.name}-${task}`); // Pushes into array list title and the task from parameters as indentifier
    setChecked(checkedArray); // Updates useState checked variable to checkedArray
    localStorage.setItem("Checked Items", JSON.stringify(checkedArray)); // Updates local storage "Checked Items"
  }

  // Function which runs when you click the checked box icon
  function handleCheckedClick(list, task) {
    // Variable which is a copy of useState checked variable minus the task parameter
    const checkedFiltered = checked.filter(
      (taskItem) => taskItem !== `${list.name}-${task}`
    );
    setChecked(checkedFiltered); // useState checked variable updated
    localStorage.setItem("Checked Items", JSON.stringify(checkedFiltered)); // Updates local storage "Checked Items"
  }

  // Function which runs when you click the edit icon
  function handleEditClick(editListName, editListTasks) {
    setEditList(true); // editList value changed to 'true' revealing the EditList component

    // Puts in local storage the current list title being changed
    localStorage.setItem(
      "Current list title edit",
      JSON.stringify(editListName)
    );

    // Puts in local storage the current list tasks being changed
    localStorage.setItem(
      "Current list tasks edit",
      JSON.stringify(editListTasks)
    );
    setEditListName(editListName);
  }

  return (
    <div className="listsContainer">
      {" "}
      {newList ? (
        // If newList useState variable is true then CreateList component is visible
        <CreateList
          setNewList={setNewList}
          setToDoLists={setToDoLists}
          toDoLists={toDoLists}
        />
      ) : null}
      {editList ? (
        // If editList useState variable is true then CreateList component is visible
        <EditList
          setToDoLists={setToDoLists}
          toDoLists={toDoLists}
          setEditList={setEditList}
          editListName={editListName}
        />
      ) : null}
      {toDoListStorage
        ? toDoListStorage.map((list) => (
            <div className="list" key={list.name}>
              <h2 className="listName">{list.name}</h2>
              <div className="lineItemContainer">
                <ul className="listUL">
                  {list.tasks.map((task, index) => (
                    <li key={`${list.id}-${index}`} className="lineItem">
                      <p
                        className={
                          checked.includes(`${list.name}-${task}`)
                            ? "taskStrike"
                            : "task"
                        }
                      >
                        {task}
                      </p>
                      <div className="checkboxContainer">
                        {checked.includes(`${list.name}-${task}`) ? (
                          <div
                            className="checkbox"
                            onClick={() => {
                              handleCheckedClick(list, task);
                            }}
                          >
                            <img
                              alt="tick"
                              src="/images/tick.png"
                              className="tick"
                            />
                          </div>
                        ) : (
                          <div
                            className="checkbox"
                            onClick={() => {
                              handleUncheckedClick(list, task);
                            }}
                          ></div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="gapFill"></div>
              <div className="editContainer">
                <img
                  alt="edit icon"
                  src="/images/edit.png"
                  className="editIcon"
                  onClick={() => handleEditClick(list.name, list.tasks)}
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ListsContainer;
