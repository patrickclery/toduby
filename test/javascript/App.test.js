import React from "react"
import Enzyme, {mount, shallow} from "enzyme"
import EnzymeAdapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new EnzymeAdapter()})

// Rewires 'fetch' global to call 'fetchMock' instead of the real implementation
import {enableFetchMocks} from "jest-fetch-mock"

enableFetchMocks()

import App from "../../app/javascript/components/App.jsx"
import TodoItem from "../../app/javascript/components/TodoItem"

describe('<App />', () => {

  // Mock the API to return fake tasks list
  beforeEach(() => {
    fetch.mockResponse(JSON.stringify(stubData))
  });

  const stubData = {
    "data": [
      {
        "id":         "1",
        "type":       "todo",
        "attributes": {
          "description": "Brush teeth",
          "priority":    "0",
          "completedAt": null,
          "createdAt":   "2020-03-03",
          "updatedAt":   "2020-03-03"
        }
      },
      {
        "id":         "2",
        "type":       "todo",
        "attributes": {
          "description": "Feed cat",
          "priority":    "1",
          "completedAt": null,
          "createdAt":   "2020-03-03",
          "updatedAt":   "2020-03-03"
        }
      },
      {
        "id":         "3",
        "type":       "todo",
        "attributes": {
          "description": "Pickup laundry",
          "priority":    "0",
          "completedAt": "2020-05-09",
          "createdAt":   "2020-03-03",
          "updatedAt":   "2020-03-03"
        }
      }
    ]
  }
  test('loads the todos after mounting', async () => {
    const wrapper = await mount(<App/>);
    await wrapper.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.find(TodoItem)).toHaveLength(3)
    expect(wrapper.state('todos')).toHaveLength(3)
  })
})