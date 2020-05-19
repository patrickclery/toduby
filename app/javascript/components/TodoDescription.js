import React from "react"
import EdiText from "react-editext";
import * as PropTypes from "prop-types";

class TodoDescription extends React.Component {
  render() {
    const {todoId, description, handleUpdate} = this.props;
    return <EdiText
      cancelOnEscape
      onSave={v => handleUpdate(v, todoId)}
      showButtonsOnHover
      submitOnEnter
      submitOnUnfocus
      validation={val => val.length >= 3}
      validationMessage="Please type at least 3 characters."
      value={description}
    />
  }
}

TodoDescription.propTypes = {
  todoId:       PropTypes.string,
  description:  PropTypes.string,
  handleUpdate: PropTypes.func
}

export default TodoDescription
