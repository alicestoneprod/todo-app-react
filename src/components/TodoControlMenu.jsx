import { FaTrash, FaRedo } from "react-icons/fa"

function TodoControlMenu({
  onDeleteAllClick,
  onDeleteAllCompletedTodos,
  countOfCompletedTodos,
}) {
  return (
    <div className='menu-container'>
      <div>
        <FaTrash
          onClick={() => onDeleteAllClick()}
          className='delete-all-todos todo-option'
        />
        {countOfCompletedTodos > 0 ? (
          <FaRedo
            className='delete-completed-todos todo-option'
            onClick={() => onDeleteAllCompletedTodos()}
            style={{
              marginLeft: "20px",
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default TodoControlMenu
