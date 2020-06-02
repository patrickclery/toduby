import React from "react"
import {Table} from "react-bootstrap"
import TaskRows from "./TaskRows"
import styled from "styled-components"

const StyledTable = styled(Table)`
  background: white;
`

export default function TaskTable(props) {
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
      <TaskRows
        tasks={
          props.tasks
            .filter(tasks => {
              return !tasks.attributes.completedAt
            })
            .sort((a, b) => {
              // Sort by priority
              let prioA = a.attributes.priority
              let prioB = b.attributes.priority
              return (prioA < prioB) ? 1 : ((prioA > prioB) ? -1 : 0)
            })}/>
      <TaskRows
        tasks={props.tasks
          .filter(tasks => !!tasks.attributes.completedAt)}/>
    </tbody>
  </StyledTable>
}

