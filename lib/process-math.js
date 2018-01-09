/*eslint no-unsafe-finally: "off"*/
const pendingScripts = []
const pendingCallbacks = []

/**
 * Process math in a script node using MathJax
 * @param { MathJax } MathJax
 * @param { DOMNode } script
 * @param { Function } callback
 */
function processMath(MathJax, script, callback) {
  pendingScripts.push(script)
  pendingCallbacks.push(callback)

  setTimeout(() => {
    return doProcess(MathJax)
  }, 0)
}

function doProcess(MathJax) {
  MathJax.Hub.Queue(() => {
    const oldElementScripts = MathJax.Hub.elementScripts
    MathJax.Hub.elementScripts = () => pendingScripts

    try {
      return MathJax.Hub.Process(null, () => {
        // Trigger all of the pending callbacks before clearing them out.
        let _iteratorNormalCompletion = true
        let _didIteratorError = false
        let _iteratorError = undefined
        let _iterator
        let _step

        try {
          // eslint-disable-next-line
          for (
            _iterator = pendingCallbacks[Symbol.iterator]();
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            const callback = _step.value

            callback()
          }
        } catch (err) {
          _didIteratorError = true
          _iteratorError = err
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return()
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError
            }
          }
        }
      })
    } catch (err) {
      // IE8 requires `catch` in order to use `finally`
      throw err
    } finally {
      MathJax.Hub.elementScripts = oldElementScripts
    }
  })
}

export default processMath
