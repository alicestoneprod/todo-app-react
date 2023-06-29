import { useContext } from "react"
import Navbar from "../Navbar"
import TodosHistoryContext from "../../context/TodosHistoryContext"

const TodosHistoryPage = () => {
  const { todosHistory } = useContext(TodosHistoryContext)

  return (
    <>
      <Navbar />
      <div
        className={"todos-container"}
        style={{ display: "flex", justifyContent: "center" }}>
        <h5>Здесь можно увидеть историю всех дел.</h5>
      </div>
      <div
        className={"todos-history-list"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {todosHistory.map((el, index) => (
          <div key={Date.now() + Math.random()}>
            <p style={{ fontSize: "20px", display: "flex" }}>
              {index + 1}. {el.text}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default TodosHistoryPage
