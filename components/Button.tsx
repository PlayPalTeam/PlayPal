import { ButtonProps } from "../types"

const Button = ({text, type}:ButtonProps) => {
  return (
    <button type={type}>{text}</button>
  )
}

export default Button