import { createContext } from "react"

const NewTodoTextContext = createContext({
  newTodoText: "",
  setNewTodoText: () => {},
})
export default NewTodoTextContext
