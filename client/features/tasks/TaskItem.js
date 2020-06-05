import React from "react"
import {Button, Form} from "react-bootstrap"
import EdiText from "react-editext"
import styled from "styled-components"

const StyledRow = styled.tr`
  &.complete {
    background-color: whitesmoke;
  }
  &.incomplete {
    background-color: white;
  }
  .col-checkbox {
    width: 40px;
  }
  &.complete .col-edit {
    width: auto;
  }
  .col-priority {
    text-align: center;
    width: 100px;
  }
  .col-delete {
    text-align: center;
    width: 70px;
  }
`

function TaskItem(props) {
  const {
          handleCheck,
          handleDestroy,
          handleUpdate,
          task: {
                  id,
                  attributes: {
                                description,
                                completedAt,
                                priority
                              }
                }
        } = props;

  function updateDescription(v) {
    return handleUpdate("description", v, id);
  }

  function changePriority(e) {
    return handleUpdate("priority", e.target.value, id);
  }

  function clickDelete(event) {
    handleDestroy(event, id)
  }

  return (
    <StyledRow key={id} className={!!completedAt ? "complete" : "incomplete"}>
      <td className="col-checkbox">
        <Form.Control value={id}
                      type="checkbox"
                      checked={!!completedAt}
                      onChange={handleCheck}/>
      </td>
      <td style={{width: "auto"}} className="col-edit">
        <EdiText
          viewProps={{
            style: !!completedAt
                     ? {textDecoration: "line-through"}
                     : {fontSize: "x-large", fontWeight: "bold", fontFamily: "serif"}
          }}
          cancelOnEscape
          onSave={updateDescription}
          showButtonsOnHover
          submitOnEnter
          submitOnUnfocus
          validation={val => val.length >= 3}
          validationMessage="Please type at least 3 characters."
          value={description}/>
      </td>
      <td className="col-priority">
        <select
          name="priority-select"
          onChange={changePriority}
          value={priority}>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </td>
      <td className="col-delete">
        <Button onClick={clickDelete}
                className="btn-danger">Delete</Button>
      </td>
    </StyledRow>
  );
}

export default TaskItem
