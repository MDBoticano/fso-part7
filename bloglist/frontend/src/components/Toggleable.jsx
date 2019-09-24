import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

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
        <Button
          onClick={toggleVisibility}
          className="toggleable--hide-btn"
          style={{ marginTop:'0.25em' }}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showIfVisible} className="toggleable--show">
        {props.children}
        <Button
          onClick={toggleVisibility}
          className="toggleable--show-btn"
          style={{ margin:'0 0.5em' }}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

export default Toggleable