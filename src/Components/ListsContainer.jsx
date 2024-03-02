import CreateList from "./CreateList";
import { useState, useEffect } from "react";

function ListsContainer({ newList, setNewList, setToDoLists, toDoLists }) {
  const toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists"));
  console.log("ToDo List in Storage", toDoListStorage);
  const [checked, setChecked] = useState([]);

  if (toDoListStorage === null) {
    const checkedItems = [];
    localStorage.setItem("Checked Items", JSON.stringify(checkedItems));
  }

  useEffect(() => {
    const checkedStorage = JSON.parse(localStorage.getItem("Checked Items"));
    setChecked(checkedStorage);
  }, []);

  useEffect(() => {
    console.log("Checked: ", checked);
  }, [checked]);

  function handleUncheckedClick(list, index, task) {
    console.log("Checkbox clicked");
    console.log("List: ", list);
    console.log("Task: ", task);
    console.log("Index: ", index);

    const checkedArray = [...checked];
    checkedArray.push(`${list.name}-${task}`);
    setChecked(checkedArray);
    localStorage.setItem("Checked Items", JSON.stringify(checkedArray));
  }

  function handleCheckedClick(list, index, task) {
    console.log("Checked clicked");
    const checkedFiltered = checked.filter(
      (taskItem) => taskItem !== `${list.name}-${task}`
    );
    console.log("Checked filtered", checkedFiltered);
    setChecked(checkedFiltered);
    localStorage.setItem("Checked Items", JSON.stringify(checkedFiltered));
  }

  return (
    <div className="listsContainer">
      {" "}
      {newList ? (
        <CreateList
          setNewList={setNewList}
          setToDoLists={setToDoLists}
          toDoLists={toDoLists}
        />
      ) : null}
      {toDoListStorage
        ? toDoListStorage.map((list) => (
            <div className="list" key={list.name}>
              <h2>{list.name}</h2>
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
                              handleCheckedClick(list, index, task);
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
                              handleUncheckedClick(list, index, task);
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
                />
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default ListsContainer;
