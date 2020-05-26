import React from "react";
import {Table} from "react-bootstrap";
import TodoRows from "./TodoRows";
import * as PropTypes from "prop-types";
import styled from "styled-components"

const StyledTable = styled(Table)`
  background: white;
`

function TaskTable(props) {
  return <StyledTable bordered hover>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Description</th>
        <th>Priority</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <TodoRows
        todos={
          props.todos
            .filter(todo => {
              return !todo.attributes.completedAt;
            })
            .sort((a, b) => {
              // Sort by priority
              let prioA = a.attributes.priority
              let prioB = b.attributes.priority
              return (prioA < prioB) ? 1 : ((prioA > prioB) ? -1 : 0)
            })}
        handleDestroy={props.handleDestroy}
        handleCheck={props.handleCheck}
        handleUpdate={props.handleUpdate}/>
      <TodoRows
        todos={
          props.todos
            .filter(todo => !!todo.attributes.completedAt)}
        handleDestroy={props.handleDestroy}
        handleCheck={props.handleCheck}
        handleUpdate={props.handleUpdate}/>
    </tbody>
  </StyledTable>
}

TaskTable.propTypes = {
  todos:         PropTypes.any,
  handleDestroy: PropTypes.func,
  handleCheck:   PropTypes.func,
  handleUpdate:  PropTypes.func,
};

export default TaskTable