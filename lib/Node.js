import React from 'react'
import PropTypes from 'prop-types'
import processMath from './process-math'

const types = {
  ascii: 'asciimath',
  tex: 'tex'
}

class Node extends React.Component {
  /**
   * Render the math once the node is mounted
   */
  componentDidMount() {
    this.typeset()
  }

  /**
   * Update the jax, force update if the display mode changed
   */
  componentDidUpdate(prevProps) {
    const forceUpdate = prevProps.inline !== this.props.inline
    this.typeset(forceUpdate)
  }

  /**
   * Prevent update when the source has not changed
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.inline !== this.props.inline ||
      nextContext.MathJax !== this.context.MathJax
    )
  }

  /**
   * Clear the math when unmounting the node
   */
  componentWillUnmount() {
    this.clear()
  }

  /**
   * Clear the jax
   */
  clear() {
    const MathJax = this.context.MathJax

    if (!this.script || !MathJax) {
      return
    }

    const jax = MathJax.Hub.getJaxFor(this.script)

    if (jax) {
      jax.Remove()
    }
  }

  /**
   * Update math in the node
   * @param { Boolean } forceUpdate
   */
  typeset(forceUpdate) {
    const MathJax = this.context.MathJax

    if (!MathJax) {
      return
    }

    const text = this.props.children

    if (forceUpdate) {
      this.clear()
    }

    if (!forceUpdate && this.script) {
      MathJax.Hub.Queue(() => {
        const jax = MathJax.Hub.getJaxFor(this.script)

        if (jax) {
          jax.Text(text, this.props.onRender)
        } else {
          const script = this.setScriptText(text)
          processMath(MathJax, script, this.props.onRender)
        }
      })
    } else {
      const script = this.setScriptText(text)
      processMath(MathJax, script, this.props.onRender)
    }
  }

  /**
   * Create a script
   * @param { String } text
   * @return { DOMNode } script
   */
  setScriptText(text) {
    const inline = this.props.inline
    const type = types[this.context.input]
    if (!this.script) {
      this.script = document.createElement('script')
      this.script.type = `math/${type}; ${inline ? '' : 'mode=display'}`
      this.refs.node.appendChild(this.script)
    }

    if ('text' in this.script) {
      // IE8, etc
      this.script.text = text
    } else {
      this.script.textContent = text
    }

    return this.script
  }

  render() {
    return React.createElement('span', { ref: 'node' })
  }
}

Node.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onRender: PropTypes.func
}

Node.contextTypes = {
  MathJax: PropTypes.object,
  input: PropTypes.string
}

Node.defaultProps = {
  inline: false,
  onRender: function onRender() {}
}

export default Node
