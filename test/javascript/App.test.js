import React from 'react'

/* On spec/javascript/setupTests.js */
import Enzyme, {render, mount, shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()})
import 'react-test-renderer'

import 'jest-fetch-mock'

import App from '../../app/javascript/components/App.jsx'
import fetchMock from "jest-fetch-mock";
import TodoItem from "../../app/javascript/components/TodoItem";

describe('<App />', () => {

  it('fetches the list of todos', () => {
    // if you have an existing `beforeEach` just add the following line to it
    const stubData = [
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
    fetchMock.enableMocks()
    fetchMock.mockResponse(JSON.stringify({data: stubData}))

    const wrapper = mount(<App/>); // 5
    expect(wrapper.find(TodoItem)).toHaveLength(3)
  })
})