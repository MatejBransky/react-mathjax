/* global MathJax */

import React from 'react'
import PropTypes from 'prop-types'
import loadScript from 'load-script'

/**
 * Context for loading MathJax
 */
class Context extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
    this.onLoad = this.onLoad.bind(this)
  }

  getChildContext() {
    return {
      MathJax: typeof MathJax === 'undefined' ? undefined : MathJax,
      input: this.props.input
    }
  }

  componentDidMount() {
    const script = this.props.script

    if (!script) {
      return this.onLoad()
    }

    loadScript(script, this.onLoad)
  }

  onLoad() {
    const options = this.props.options

    MathJax.Hub.Config(options)

    MathJax.Hub.Register.StartupHook('End', () => {
      MathJax.Hub.processSectionDelay = this.props.delay

      if (this.props.didFinishTypeset) {
        this.props.didFinishTypeset()
      }
    })

    this.setState({
      loaded: true
    })
  }

  render() {
    const children = this.props.children

    return React.Children.only(children)
  }
}

Context.propTypes = {
  children: PropTypes.node.isRequired,
  didFinishTypeset: PropTypes.func,
  script: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
  input: PropTypes.oneOf(['ascii', 'tex']),
  delay: PropTypes.number,
  options: PropTypes.object
}

Context.childContextTypes = {
  MathJax: PropTypes.object,
  input: PropTypes.string
}

Context.defaultProps = {
  script: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML',
  input: 'ascii',
  delay: 0,
  options: {}
}

export default Context
