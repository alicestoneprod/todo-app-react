import { createContext } from "react"

const ChangeModeContext = createContext({
  changeMode: false,
  setChangeMode: () => {},
})

export default ChangeModeContext
