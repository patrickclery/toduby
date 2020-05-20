import React from "react"
import {Button, Card, Form} from "react-bootstrap";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleChange, handleSubmit, description, priority} = this.props;
    return (
      <React.Fragment>
        <h1>New Todo</h1>

        <Card>
          <Card.Body>
            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  size="lg"
                  type="text"
                  placeholder="Describe the action you will do"
                  value={description}/>
              </Form.Group>
              <Form.Group controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  name="priority"
                  as="select"
                  defaultValue="0">
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default TodoForm
