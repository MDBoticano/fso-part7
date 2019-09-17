import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideIfVisible = { display: visible ? 'none' : '' }
  const showIfVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div className="toggleable">
      <div style={hideIfVisible} className="toggleable--hide">
        <button onClick={toggleVisibility} className="toggleable--hide-btn">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showIfVisible} className="toggleable--show">
        {props.children}
        <button onClick={toggleVisibility} className="toggleable--show-btn">
          cancel
        </button>
      </div>
    </div>
  )
})

export default Toggleable