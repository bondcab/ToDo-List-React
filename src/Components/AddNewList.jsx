function AddNewList({ setNewList, toDoLists }) {
  // Reveals the CreateList component when ran
  function handleOnClick() {
    setNewList(true);
  }
  return (
    <div className="addListContainer">
      <div className="addList" onClick={handleOnClick}>
        <img src="/images/plus_icon.svg" alt="add symbol" className="addIcon" />
        <h2 className="newListText">New List</h2>
      </div>
      <div className="addListBackground">
        <h1 className="backgroundText">ToDo List App</h1>
      </div>
    </div>
  );
}

export default AddNewList;
