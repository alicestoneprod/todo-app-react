import { useState } from "react"
import { Alert, Space } from "antd"
import useInput from "./hooks/useInput"

function TodoForm({ onAddTodo }) {
  const text = useInput("")
  const [visibility, setVisibility] = useState("hidden")
  const [warning, setWarning] = useState("")

  function addTodoHandler() {
    if (text.value === "") {
      setWarning("Пожалуйста, введите название дела.")
      setVisibility("visible")
    } else if (text.value[0] === " ") {
      setWarning(
        "Пожалуйста, не используйте клавишу 'Пробел' перед инициализацией дела."
      )
      setVisibility("visible")
    } else if (text.length > 74) {
      setWarning("Длина дела не может быть больше 74 символов!")
      setVisibility("visible")
    } else {
      const newTodo = {
        id: Date.now(),
        text: text.value,
        isCompleted: false,
      }
      onAddTodo(newTodo)
      text.setValue("")
      setVisibility("hidden")
      setWarning("")
    }
  }

  return (
    <>
      {warning.length > 0 && (
        <Space
          direction='vertical'
          style={{
            width: "100%",
            marginTop: visibility === "visible" ? "20px" : "0",
            visibility,
            fontWeight: "600",
          }}>
          <Alert message='Ошибка!' description={warning} type='error' />
        </Space>
      )}

      <div className='input-field mt2'>
        <div>
          <input
            type='text'
            id='title'
            placeholder='Введите название дела'
            value={text.value}
            onChange={text.onChange}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                addTodoHandler()
              }
            }}></input>
        </div>

        <div></div>
        <button
          className={"btn btn-warning"}
          type='submit'
          name='action'
          onClick={() => addTodoHandler()}>
          Добавить
          <i class='material-icons right'>send</i>
        </button>
        <label htmlFor='title' className='active'>
          Введите название дела
        </label>
      </div>
    </>
  )
}

export default TodoForm
