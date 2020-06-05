import React from "react";
import * as PropTypes from "prop-types";
import {Toast} from "react-bootstrap";

TaskToast.propTypes = {
  onClose:        PropTypes.func,
  successMessage: PropTypes.any
}

function TaskToast(props) {
  return <div
    aria-live="polite"
    aria-atomic="true"
    style={{
      position:  "relative",
      minHeight: "100px"
    }}
  >
    <Toast
      style={{
        position: "absolute",
        top:      0,
        right:    0,
      }}
      autohide
      delay={3000}
      onClose={props.onClose}
      show={!!props.successMessage}>
      <Toast.Header>
        <strong className="mr-auto">Success!</strong>
      </Toast.Header>
      <Toast.Body>
        {props.successMessage}
      </Toast.Body>
    </Toast>
  </div>;
}

export default TaskToast