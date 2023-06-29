import React, { useContext, useEffect, useState } from "react"
import { Modal } from "antd"
import { FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa"
import TodosContext from "../../context/TodosContext"
import CurrentTodoContext from "../../context/CurrentTodosForInfo"
import ChangeModeContext from "../../context/ChangeModeContext"
import NewTodoTextContext from "../../context/NewTodoTextContext"
import isModalOpenContext from "../../context/isModalOpenContext"
function InfoModalWindow({ isOpen, ok, cancel }) {
  const { todos, setTodos } = useContext(TodosContext)
  const { currentTodo, setCurrentTodo } = useContext(CurrentTodoContext)
  const { changeMode, setChangeMode } = useContext(ChangeModeContext)
  const { newTodoText, setNewTodoText } = useContext(NewTodoTextContext)
  const [warning, setWarning] = useState("")
  const { setIsModalOpen } = useContext(isModalOpenContext)

  function onDoneModalClick(id) {
    const newTodos = todos.map((el) => {
      return id !== el.id ? el : { ...el, isCompleted: !el.isCompleted }
    })
    setCurrentTodo({ ...currentTodo, isCompleted: false })
    setTodos(newTodos)
    setChangeMode(false)
    setIsModalOpen(false)
    cancel()
  }
  function onDeleteModalClick(id) {
    setTodos(todos.filter((el) => el.id !== id))
    setChangeMode(false)
    setIsModalOpen(false)
  }

  useEffect(() => {
    setNewTodoText("")
  }, [setNewTodoText])

  useEffect(() => {
    setNewTodoText(currentTodo.text)
  }, [currentTodo, setNewTodoText])

  function onChangeNewTodoTextHandler(e) {
    setNewTodoText(e.target.value)
    if (e.target.value !== "") {
      setWarning("")
    }
  }

  function onChangeClickHandler() {
    if (!changeMode) {
      setChangeMode(true)
    }
  }

  function onChangeCancelClickHandler() {
    setChangeMode(false)
  }

  function onCompleteClickHandler() {
    if (newTodoText === "") {
      setWarning("Вы ввели пустое название дела!")
    } else {
      setCurrentTodo({ ...currentTodo, text: newTodoText })
      const newTodos = todos.map((el) => {
        return el.id === currentTodo.id ? { ...el, text: newTodoText } : el
      })
      setTodos(newTodos)
      setChangeMode(false)
      setNewTodoText("")
    }
  }

  const createdAt = new Date(currentTodo.id)
  const day = createdAt.getDate()
  const month = createdAt.toLocaleString("default", { month: "long" })
  const year = createdAt.getFullYear()
  const time = createdAt.toLocaleTimeString()
  const formattedDate = `${day} ${month} ${year}, ${time}`

  return changeMode ? (
    <Modal
      className={"todo-info"}
      title='Информация о деле'
      visible={isOpen}
      onOk={ok}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}>
      <div className={"todo-info-container"}>
        <label htmlFor='new-text' className={"new-text-placeholder"}>
          Введите новое название дела
        </label>
        <input
          onChange={(e) => onChangeNewTodoTextHandler(e)}
          value={newTodoText}
          id={"new-text"}
          placeholder='Введите новое название дела'></input>
        <p
          style={{
            visibility: warning.length !== 0 ? "visible" : "hidden",
            color: "red",
          }}>
          {warning}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div className={"change-text-buttons"}>
            <FaCheck
              onClick={() => onCompleteClickHandler()}
              className={"done-change"}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color: "#43a047",
              }}
            />
            <FaTimes
              className={"cancel-change"}
              onClick={() => onChangeCancelClickHandler()}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color: "#d84315",
              }}
            />
          </div>
        </div>
        <span>Дата создания: {formattedDate}</span>
      </div>
    </Modal>
  ) : (
    <Modal
      className={"todo-info"}
      title='Информация о деле'
      visible={isOpen}
      onOk={ok}
      onCancel={cancel}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}>
      <div className={"todo-info-container"}>
        <h3>
          {currentTodo.index}. {currentTodo.text}{" "}
          <FaPencilAlt
            className={"todo-text-change"}
            onClick={() => onChangeClickHandler()}
          />
        </h3>
        <span>Дата создания: {formattedDate}</span>
      </div>
      <div className={"option-container"}>
        {currentTodo.isCompleted ? (
          <button
            type='button'
            onClick={() => onDoneModalClick(currentTodo.id)}
            class='btn button-complete-modal green'>
            Отметить как невыполненное
          </button>
        ) : (
          <button
            type='button'
            onClick={() => onDoneModalClick(currentTodo.id)}
            class='btn button-complete-modal green'>
            Выполнить
          </button>
        )}

        <button
          type='button'
          onClick={() => onDeleteModalClick(currentTodo.id)}
          class='btn button-delete-modal red'>
          Удалить
        </button>
      </div>
    </Modal>
  )
}

export default InfoModalWindow
