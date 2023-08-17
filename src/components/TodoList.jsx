import React, { useContext, useState } from "react"
import { RiDeleteBinLine, RiInformationFill } from "react-icons/ri"
import { FaCheck } from "react-icons/fa"
import InfoModalWindow from "./UI/InfoModalWindow"
import TodosContext from "../context/TodosContext"
import CurrentTodoContext from "../context/CurrentTodosForInfo"
import ChangeModeContext from "../context/ChangeModeContext"
import isModalOpenContext from "../context/isModalOpenContext"

function TodoList({ onDeleteClick, onDoneClick }) {
  const { todos } = useContext(TodosContext)
  const { setCurrentTodo } = useContext(CurrentTodoContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setChangeMode } = useContext(ChangeModeContext)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    setCurrentTodo({})
    setChangeMode(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setChangeMode(false)
  }

  const showModalHandler = (el, index) => {
    setCurrentTodo({ ...el, index: index + 1 })
    showModal()
  }

  return todos.length ? (
    <div className='todos-container'>
      <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        <InfoModalWindow
          isOpen={isModalOpen}
          ok={handleOk}
          cancel={handleCancel}
        />
      </isModalOpenContext.Provider>
      {todos.map((el, index) => (
        <p className={el.isCompleted ? "completed-todo" : "todo"} key={el.id}>
          <label>
            <span className='todoText'>
              {index + 1}. {el.text}
            </span>
          </label>
          <div
            className='btn-options'
            style={{ display: "flex", margin: "0 5px" }}>
            <div className={"todo-info"}>
              <RiInformationFill
                onClick={() => showModalHandler(el, index)}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#2196F3",
                  margin: "0 5px",
                }}
              />
            </div>
            <div className='complete-todo'>
              <FaCheck
                onClick={() => onDoneClick(el.id)}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#43a047",
                }}
              />
            </div>
            <div className='delete-todo'>
              <RiDeleteBinLine
                onClick={() => onDeleteClick(el.id)}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#d84315",
                  margin: "0 5px",
                }}
              />
            </div>
          </div>
        </p>
      ))}
    </div>
  ) : (
    <h4
      style={{
        display: "flex",
        justifyContent: "center",
      }}>
      Лист дел пока что пуст.
    </h4>
  )
}

export default TodoList
