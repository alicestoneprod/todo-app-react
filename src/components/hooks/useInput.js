import { useState } from "react"

function useInput(initValue) {
  const [value, setValue] = useState(initValue)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return { value, setValue, onChange }
}

export default useInput
