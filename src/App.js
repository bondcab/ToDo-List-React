import { useState } from "react";
import Heading from "./Components/Heading";
import AddNewList from "./Components/AddNewList";
import ListsContainer from "./Components/ListsContainer";

function App() {
  const [newList, setNewList] = useState(true);
  const [toDoLists, setToDoLists] = useState([]);

  const toDoListStorage = JSON.parse(localStorage.getItem("ToDo Lists"));
  console.log(toDoListStorage);

  return (
    <div className="appContainer">
      <Heading />
      <AddNewList setNewList={setNewList} toDoLists={toDoLists} />
      <ListsContainer newList={newList} setNewList={setNewList} />
    </div>
  );
}

export default App;
