import React from "react"
import {Button, Card, Form} from "react-bootstrap";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {handleChange, handleSubmit, description} = this.props;
    return (
      <React.Fragment>
        <h1>New Todo</h1>

        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Describe the action you will do"
                  onChange={handleChange}
                  value={description}
                />
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
