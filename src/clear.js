import "./clear.scss"

import React from "react"
import ReactDom from "react-dom"
import Hammer from "hammerjs"




export default class Clear extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      deltaX: 0,
      totalWidth: 0,
      operationsClassName: 'moving',
      contentClassName: 'moving',
      contentTransform : 0,
      operationsLeft: 0,
      isFolding: true,
      floater: 0,
      translateX: 0
    }
  }

  setTotal (w) {
    this.setState({
      totalWidth: w
    })
  }

  componentDidMount () {
    const wrapper = this.refs.wrapper
    const manager = new Hammer.Manager(wrapper)

    manager.add(new Hammer.Pan({ threshold: 0, pointers: 1 }))
    manager.add(new Hammer.Swipe({ threshold: 0 }).recognizeWith(manager.get('pan')))

    manager.on('panstart', (event) => {
      const t = this.state.totalWidth
      const w = this.refs.wrapper.offsetWidth

      this.setState({
        contentTransform: this.state.isFolding ? 0 : -t,
        operationsLeft: this.state.isFolding ? w : (w - t)
      })
    })

    manager.on('panmove', (event) => {
      const deltaX = event.deltaX
      this.setState({
        operationsClassName: '',
        contentClassName: ''
      })
      this.updateStyle(this.state.contentTransform + deltaX, this.state.operationsLeft + deltaX)
    })

    manager.on('panend', (event) => {
      this.setState({
        operationsClassName: 'moving',
        contentClassName: 'moving'
      })

      this.afterEnd()
    })
  }

  afterEnd () {
    const wrapperWidth    = this.refs.wrapper.offsetWidth
    const operationsWidth = this.state.totalWidth
    var status            = true
    var result            = { translateX: 0, left: wrapperWidth }

    if (wrapperWidth - this.state.floater > operationsWidth / 2) {
      result = {
        translateX: - operationsWidth,
        left: wrapperWidth - operationsWidth
      }
      status = false
    }

    this.setState({ isFolding: status })
    this.updateStyle(result.translateX, result.left)

  }

  updateStyle (t, left) {
    this.setState({
      translateX: t,
      left: left,
      floater: left
    })
  }

  render () {
    return (
      <div className="clear">
        <div className="clear-wrapper" ref="wrapper">
          <Content
            extraClass={this.state.contentClassName}
            translateX={this.state.translateX}
          >{this.props.content}</Content>
          <Operation
            operations={this.props.operations}
            extraClass={this.state.operationsClassName}
            setTotal={(w) => this.setTotal(w)}
            left={this.state.left}
          />
        </div>
      </div>
    )
  }
}


/**
 * 内容组件
 */
export class Content extends React.Component {
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.refs.content.style.transform = `translate(${nextProps.translateX}px)`
  }

  render () {
    return (
      <div ref="content" className={`${this.props.extraClass} clear-content inline-block`}>{this.props.children}</div>
    )
  }
}

/**
 * 操作组件
 */
export class Operation extends React.Component {
  componentDidMount () {
    const operations         = this.refs.operations
    const operationsElements = operations.getElementsByClassName('operation')
    const containers         = operations.getElementsByClassName('operation-container')
    var operationsWidth      = 0

    for (let i = 0, n = operationsElements.length; i < n; i++) {
      operationsWidth += operationsElements[i].offsetWidth
    }

    for (let i = 0, n = containers.length; i < n; i++) {
      containers[i].style.overflow = "hidden";
    }

    this.props.setTotal(operationsWidth)
  }

  componentWillReceiveProps (nextProps) {
    this.refs.operations.style.left = `${nextProps.left}px`
  }

  render() {
    return (
      <div ref="operations" className={`${this.props.extraClass} clear-operations`}>
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
    );
  }
}

