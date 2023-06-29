import MainPage from "./components/pages/MainPage"
import InformationPage from "./components/pages/InformationPage"
import NotFound from "./components/pages/NotFound"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import TodosHistoryContext from "./context/TodosHistoryContext"
import { useState, useEffect } from "react"
import TodosHistoryPage from "./components/pages/TodosHistoryPage"

function App() {
  const [todosHistory, setTodosHistory] = useState([])
  useEffect(() => {
    const storedTodosHistory = JSON.parse(localStorage.getItem("todosHistory"))
    if (storedTodosHistory) {
      setTodosHistory(storedTodosHistory)
    }
  }, [setTodosHistory])

  useEffect(() => {
    localStorage.setItem("todosHistory", JSON.stringify(todosHistory))
  }, [todosHistory])
  return (
    <TodosHistoryContext.Provider value={{ todosHistory, setTodosHistory }}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path={"/"} element={<MainPage />}></Route>
            <Route path={"/info"} element={<InformationPage />}></Route>
            <Route path={"/history"} element={<TodosHistoryPage />}></Route>
            <Route path={"*"} element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </TodosHistoryContext.Provider>
  )
}

export default App
