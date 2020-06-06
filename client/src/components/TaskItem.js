import React from "react"
import {Button, Form} from "react-bootstrap"
import EdiText from "react-editext"
import styled from "styled-components"
import {useDispatch} from "react-redux"
import {destroyTask, removeTask, updateTask} from "../slices/tasksSlice"

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

const TaskItem = props => {

  const {task: {id, attributes}} = props
  const {description, completedAt, priority} = attributes
  const dispatch = useDispatch()

  /**
   * @description Dispatches an updated version of the task for update
   * @param {object} attribute name to update
   * @param {object} value of the attribute
   */
  const handleUpdate = (attribute, value) => {
    const newAttributes = {
      ...attributes,
      [attribute]: value
    }
    dispatch(updateTask({
                          id,
                          attributes: newAttributes
                        }))
  }

  /**
   * @description Destroys the current task
   */
  const handleDestroy = () => {
    dispatch(destroyTask({id}))
    dispatch(removeTask({
                          id,
                          attributes
                        }))
  }

  /**
   * @description This simply calls the update action, instead of doing its own
   */
  const handleToggle = () => {
    const newAttributes = {
      ...attributes,
      completed: !!completedAt ? "0" : "1"
    }
    dispatch(updateTask({
                          id,
                          attributes: newAttributes
                        }))
  }

  return (
    <StyledRow key={id} className={!!completedAt ? "complete" : "incomplete"}>
      <td className="col-checkbox">
        <Form.Control value={id}
                      type="checkbox"
                      checked={!!completedAt}
                      onChange={e => {
                        e.preventDefault()
                        handleToggle()
                      }}/>
      </td>
      <td style={{width: "auto"}} className="col-edit">
        <EdiText
          viewProps={{
            style: !!completedAt
                     ? {textDecoration: "line-through"}
                     : {
                fontSize:   "x-large",
                fontWeight: "bold",
                fontFamily: "serif"
              }
          }}
          cancelOnEscape
          onSave={value => handleUpdate("description", value)}
          showButtonsOnHover
          submitOnEnter
          submitOnUnfocus
          validation={value => value.length >= 3}
          validationMessage="Please type at least 3 characters."
          value={description}/>
      </td>
      <td className="col-priority">
        <select
          name="priority-select"
          onChange={({target: {value}}) => handleUpdate("priority", value)}
          value={priority}>
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </td>
      <td className="col-delete">
        <Button
          onClick={e => {
            e.preventDefault()
            handleDestroy()
          }}
          className="btn-danger">Delete</Button>
      </td>
    </StyledRow>
  )
}

export default TaskItem
