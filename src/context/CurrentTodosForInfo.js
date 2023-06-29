import { createContext } from "react"

const CurrentTodoContext = createContext({
  currentTodo: {},
  setCurrentTodo: () => {},
})

export default CurrentTodoContext
