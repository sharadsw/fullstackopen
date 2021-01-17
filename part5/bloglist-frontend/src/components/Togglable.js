import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>

      {!isVisible &&
        <button onClick={() => setIsVisible(true)}>
          {props.showLabel}
        </button>
      }

      {isVisible &&
        <div>
          {props.children}

          <button onClick={() => setIsVisible(false)}>
            {props.hideLabel}
          </button>
        </div>
      }
    </div>
  )
})

export default Togglable