import "./clear.scss"

import React from "react"
import ReactDom from "react-dom"
import Hammer from "hammerjs"

export default class Clear extends React.Component {

  componentDidMount () {
    const hammer             = new Hammer(this.refs.wrapper)
    const operations         = this.refs.operations
    const operationsElements = operations.getElementsByClassName('operation')

    var operationsWidth    = 0
    for (var i = 0, n = operationsElements.length; i < n; i++) {
      operationsWidth += operationsElements[i].offsetWidth
    }

    this.totalWidth = operationsWidth

    const containers = operations.getElementsByClassName('operation-container')

    for (var i = 0, n = containers.length; i < n; i++) {
      containers[i].style.overflow = "hidden";
    }

    var isFolding = true

    window.a = hammer.on('swipe', () => {
      const result = isFolding ? -operationsWidth : 0
      console.log(result)
      this.updateStyle(result)
      isFolding = !isFolding
    })

    // hammer.on('pan', (event) => {
    //   this.updateStyle(event.deltaX)
    // })
  }

  updateStyle (deltaX) {
    this.refs.content.style.transform = `translate(${deltaX}px)`
    const ratio = 1 - Math.abs(deltaX)/ this.refs.wrapper.offsetWidth
    this.refs.operations.style.left = `${ratio * 100}%`
  }

  render () {
    return (
      <div className="clear">
        <div className="clear-wrapper" ref="wrapper">
          <div ref="content" className="clear-content inline-block">{this.props.content}</div>
          {/* <div className="inline-block variant"> */}
            <div ref="operations" className="clear-operations">
              {
                this.props.operations.map(function (operation, i) {
                  return (
                    <div className="operation-container" key={i}>
                      <div className="operation">{operation}</div>
                    </div>
                  )
                }, this)
              }
            </div>
          {/* </div> */}
        </div>
      </div>
    )
  }
}
