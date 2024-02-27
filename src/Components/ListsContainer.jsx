import CreateList from "./CreateList";

function ListsContainer({ newList, setNewList }) {
  return (
    <div className="listsContainer">
      {" "}
      {newList ? <CreateList setNewList={setNewList} /> : null}
    </div>
  );
}

export default ListsContainer;
