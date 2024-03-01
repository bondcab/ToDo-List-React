import { useState, useEffect } from "react";
import Heading from "./Components/Heading";
import AddNewList from "./Components/AddNewList";
import ListsContainer from "./Components/ListsContainer";

function App() {
  const [newList, setNewList] = useState(false);
  const [toDoLists, setToDoLists] = useState([]);

  // const toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists"));
  // console.log(toDoListStorage);
  // console.log("ToDo Lists: ", toDoLists);

  // useEffect(() => {
  //   // localStorage.setItem("ToDo Lists", JSON.stringify(toDoLists));
  //   const toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists"));
  //   console.log("ToDo List in Storage", toDoListStorage);

  // }, [toDoLists]);

  return (
    <div className="appContainer">
      <Heading />
      <AddNewList setNewList={setNewList} toDoLists={toDoLists} />
      <ListsContainer
        newList={newList}
        setNewList={setNewList}
        setToDoLists={setToDoLists}
        toDoLists={toDoLists}
      />
    </div>
  );
}

export default App;
