import React from "react"
import {Button, Form} from "react-bootstrap"
import styled from "styled-components"
import {useSelector} from "react-redux"
import {createTask} from "./tasksSlice"

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

const TaskForm = props => {
  const description = useSelector(state => state.description)
  const priority = useSelector(state => state.priority)
  const handleSubmit = {props}

  return (
    <Form onSubmit={handleSubmit}>
      <TaskFormRow>
        <TaskFormDescription>
          <Form.Control name="description"
                        style={{width: "auto"}}
                        size="lg"
                        type="text"
                        placeholder="Type the task you'd like to do next here"
                        defaultValue={description}/>
        </TaskFormDescription>
        <TaskFormPriority>
          <Form.Control id="formPriority"
                        name="priority"
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
  );
};

export default TaskForm