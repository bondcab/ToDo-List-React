import CreateList from "./CreateList";

function ListsContainer({ newList, setNewList, setToDoLists, toDoLists }) {
  const toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists"));
  console.log("ToDo List in Storage", toDoListStorage);
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
            <div className="list" key={list.id}>
              <h2>{list.name}</h2>
              <ul>
                {list.tasks.map((task) => (
                  <li>{task}</li>
                ))}
              </ul>
            </div>
          ))
        : null}
    </div>
  );
}

export default ListsContainer;
