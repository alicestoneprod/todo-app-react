import { createContext } from "react"

const isModalOpenContext = createContext({
  isModalOpen: "",
  setIsModalOpen: () => {},
})
export default isModalOpenContext
