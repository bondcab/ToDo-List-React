function AddNewList({ setNewList, toDoLists }) {
  function handleOnClick() {
    setNewList(true);
    localStorage.setItem("ToDo Lists", JSON.stringify(toDoLists));
  }
  return (
    <div className="addListContainer">
      <div className="addList" onClick={handleOnClick}>
        <img src="/images/plus_icon.svg" alt="add symbol" className="addIcon" />
        <h2 className="newListText">New List</h2>
      </div>
    </div>
  );
}

export default AddNewList;
