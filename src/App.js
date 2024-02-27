import { useState } from "react";
import Heading from "./Components/Heading";
import AddNewList from "./Components/AddNewList";
import ListsContainer from "./Components/ListsContainer";

function App() {
  const [newList, setNewList] = useState(true);

  return (
    <div className="appContainer">
      <Heading />
      <AddNewList setNewList={setNewList} />
      <ListsContainer newList={newList} setNewList={setNewList} />
    </div>
  );
}

export default App;
