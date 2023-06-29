import { useEffect, useState, useContext } from "react"
import Navbar from "../Navbar"
import TodoForm from "../TodoForm"
import TodoList from "../TodoList"
import TodoControlMenu from "../TodoControlMenu"
import TodosContext from "../../context/TodosContext"
import CurrentTodoContext from "../../context/CurrentTodosForInfo"
import ChangeModeContext from "../../context/ChangeModeContext"
import NewTodoTextContext from "../../context/NewTodoTextContext"
import TodosHistoryContext from "../../context/TodosHistoryContext"

function MainPage() {
  const [todos, setTodos] = useState([])
  const [currentTodo, setCurrentTodo] = useState({})
  const [changeMode, setChangeMode] = useState(false)
  const [newTodoText, setNewTodoText] = useState({})
  const { setTodosHistory } = useContext(TodosHistoryContext)
  function deleteAllTodosHandler() {
    let agree = window.confirm(
      "Вы уверены, что хотите очистить список ВСЕХ заданий? Это действие невозможно отменить."
    )
    if (agree) {
      setTodos([])
    }
  }

  useEffect(() => {
    const Todos = JSON.parse(localStorage.getItem("todos"))
    if (Todos) {
      setTodos(Todos)
    }
  }, [])

  function addTodoHandler(newTodo) {
    setTodos((prevTodos) => [...prevTodos, newTodo])
    setTodosHistory((prevTodosHistory) => [...prevTodosHistory, newTodo])
  }
  function deleteTodoHandler(id) {
    setTodos(todos.filter((el) => el.id !== id))
  }

  function completeTodoHandler(id) {
    const newTodos = todos.map((el) => {
      return el.id !== id ? el : { ...el, isCompleted: !el.isCompleted }
    })
    setTodos(newTodos)
  }
  function completedTodosCalculator(todos) {
    const completedTodos = todos.filter((el) => {
      return el.isCompleted === true
    })
    return completedTodos
  }
  function deleteCompletedTodosHandler() {
    let agree = window.confirm(
      "Вы уверены, что хотите очистить список ВСЕХ завершенных заданий? Это действие невозможно отменить."
    )
    if (agree) {
      const unCompletedTodos = todos.filter((el) => {
        return el.isCompleted !== true
      })
      setTodos(unCompletedTodos)
    }
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <TodoForm onAddTodo={addTodoHandler} />
          {todos.length !== 0 ? (
            <TodoControlMenu
              onDeleteAllClick={deleteAllTodosHandler}
              onDeleteAllCompletedTodos={deleteCompletedTodosHandler}
              countOfCompletedTodos={completedTodosCalculator(todos).length}
            />
          ) : (
            <></>
          )}
          <ChangeModeContext.Provider value={{ changeMode, setChangeMode }}>
            <CurrentTodoContext.Provider
              value={{ currentTodo, setCurrentTodo }}>
              <NewTodoTextContext.Provider
                value={{ newTodoText, setNewTodoText }}>
                <TodoList
                  onDeleteClick={deleteTodoHandler}
                  todos={todos}
                  onDoneClick={completeTodoHandler}
                />
              </NewTodoTextContext.Provider>
            </CurrentTodoContext.Provider>
          </ChangeModeContext.Provider>
          {completedTodosCalculator(todos).length > 0 ? (
            <h2 className='tasks-completed'>
              Вы выполнили {completedTodosCalculator(todos).length}{" "}
              {completedTodosCalculator(todos).length === 1
                ? "задание"
                : completedTodosCalculator(todos).length < 5
                ? "задания"
                : "заданий"}
              .
            </h2>
          ) : (
            <></>
          )}
        </div>
      </div>
    </TodosContext.Provider>
  )
}

export default MainPage
