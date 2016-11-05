import Clear from "./src/clear"
import React from "react"
import ReactDom from "react-dom"

ReactDom.render(
  <Clear
    content={<div>hello world, today is a nice day, is it right</div>}
    operations={[<div>remove</div>, <div>like</div>, <div>reply</div>]} />,
  document.getElementById('app'))
