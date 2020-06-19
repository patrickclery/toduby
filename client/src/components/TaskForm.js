import React from "react"
import {Button, Form} from "react-bootstrap"
import styled from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import {createTask, changeTaskInput} from "../slices/tasksSlice"

const TaskFormRow = styled.div` 
  width: auto;
  grid-template-columns: auto minmax(auto, 100px) minmax(auto, 100px);
  display: grid;
  grid-column-gap: 10px;
`

const TaskFormDescription = styled.div`
  display: grid;
`
const TaskFormPriority = styled.div`
  display: grid;
`
const TaskFormButton = styled.div`
  display: grid;
`

const TaskForm = () => {
  const description = useSelector(state => state.tasks.task.description)
  const priority = useSelector(state => state.tasks.task.priority)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const attributes = {
      description,
      priority
    }
    dispatch(createTask(attributes))
  }

  // Assigns the value from a text/dropdown and assigns it to the respective task attribute
  const handleChange = async (event) => {
    const attribute = event.target.name.replace(/^todo\[(\w+)]$/, "$1")

    dispatch(changeTaskInput({
                               attribute,
                               value: event.target.value
                             }))
  }

  return (
    <Form
      onSubmit={handleSubmit}
      onChange={handleChange}>
      <TaskFormRow>
        <TaskFormDescription>
          <Form.Control name="todo[description]"
                        style={{width: "auto"}}
                        size="lg"
                        type="text"
                        placeholder="Type the task you'd like to do next here"
                        defaultValue={description}/>
        </TaskFormDescription>
        <TaskFormPriority>
          <Form.Control name="todo[priority]"
                        as="select"
                        size="lg"
                        defaultValue={priority}>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </Form.Control>
        </TaskFormPriority>
        <TaskFormButton>
          <Button size="lg"
                  type="submit"
                  variant="success"
          >Add</Button>
        </TaskFormButton>
      </TaskFormRow>
    </Form>
  )
}

export default TaskForm