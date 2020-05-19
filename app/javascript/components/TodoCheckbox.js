import React from "react"
import * as PropTypes from "prop-types";

class TodoCheckbox extends React.Component {
  render() {
    const {handleCheck, isChecked, value} = this.props;
    return (
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        aria-label="complete-checkbox"
        onChange={handleCheck}/>
    )
  }
}

TodoCheckbox.propTypes = {
  value:       PropTypes.string,
  handleCheck: PropTypes.func,
  isChecked:   PropTypes.bool
}

export default TodoCheckbox