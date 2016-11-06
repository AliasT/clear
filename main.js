import Clear from "./src/clear"
import React from "react"
import ReactDom from "react-dom"




const content = (
  <div>
    <h4>招商银行信用卡</h4>
    <div>尊敬的张三先生，感谢您选择招行信用卡，您本月消费2000元。</div>
  </div>
)

ReactDom.render(
  <Clear
    content={content}
    operations={[<div>更多</div>, <div>分类</div>, <div>删除</div>]} />,
  document.getElementById('app'))
