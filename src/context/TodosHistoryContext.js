import { createContext } from "react"

const TodosHistoryContext = createContext({
  todosHistory: [],
  setTodosHistory: () => {},
})

export default TodosHistoryContext
