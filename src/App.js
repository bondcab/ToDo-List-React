import { useState } from "react";
import Heading from "./Components/Heading";
import AddNewList from "./Components/AddNewList";
import ListsContainer from "./Components/ListsContainer";

function App() {
  const [newList, setNewList] = useState(false); // If set to true then CreateList component will be displayed
  const [editList, setEditList] = useState(false); // If set to true then EditList compoent will be displayed
  const [toDoLists, setToDoLists] = useState([]); //
  const [editListName, setEditListName] = useState("");

  return (
    <div className="appContainer">
      <Heading />
      <AddNewList setNewList={setNewList} toDoLists={toDoLists} />
      <ListsContainer
        newList={newList}
        setNewList={setNewList}
        setToDoLists={setToDoLists}
        toDoLists={toDoLists}
        editList={editList}
        setEditList={setEditList}
        setEditListName={setEditListName}
        editListName={editListName}
      />
    </div>
  );
}

export default App;
