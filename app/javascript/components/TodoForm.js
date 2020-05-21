import React from "react"
import {Button, Form} from "react-bootstrap"
import styled from "styled-components"

const TodoFormRow = styled.div`
  width: auto;
  grid-template-columns: auto minmax(auto, 100px) minmax(auto, 100px);
  display: grid;
  grid-column-gap: 10px;
`

const TodoFormDescription = styled.div`
  display: grid;
`
const TodoFormPriority = styled.div`
  display: grid;
`
const TodoFormButton = styled.div`
  display: grid;
`

function TodoForm(props) {
  const {handleChange, handleSubmit, description, priority} = props;
  return (
    <Form onSubmit={handleSubmit}
          onChange={handleChange}>
      <TodoFormRow>
        <TodoFormDescription>
          <Form.Control name="description"
                        style={{width: 'auto'}}
                        size="lg"
                        type="text"
                        placeholder="Type the task you'd like to do next here"
                        value={description}/>
        </TodoFormDescription>
        <TodoFormPriority>
          <Form.Control id="formPriority"
                        name="priority"
                        as="select"
                        size="lg"
                        defaultValue={priority}>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </Form.Control>
        </TodoFormPriority>
        <TodoFormButton>
          <Button size="lg"
                  type="submit"
                  variant="success"
          >Add</Button>
        </TodoFormButton>
      </TodoFormRow>
    </Form>
  );
}

export default TodoForm
