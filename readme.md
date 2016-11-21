### ios 系统中的特效实现


- ios 邮件中的滑动操作

  ```javascript
  function getS (b) {
    return {
      width: '100%',
      height: '100%',
      padding: '0 15px',
      display: 'flex',
      alignItems: 'center',
      background: b,
      color: '#fff'
    }
  }

  const content = (
    <div>
      <h4>招商银行信用卡</h4>
      <div>尊敬的张三先生，感谢您选择招行信用卡，您本月消费2000元。</div>
    </div>
  )
  ### usage
  ReactDom.render(
    <Clear
      content={content}
      operations={[
        <div style={getS('#0754e2')}>更多</div>,
        <div style={getS('#e29507')}>分类</div>,
        <div style={getS('#e2073a')}>删除</div>]}
      />,
    document.getElementById('app'))

  ```

  ​

![](gifs/swipe.gif)
