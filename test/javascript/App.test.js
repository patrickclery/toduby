import React from 'react'
import {shallow} from 'enzyme'
import {beforeEach, describe, expect} from '@jest/globals';

/* On spec/javascript/setupTests.js */
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new EnzymeAdapter()})

import {enableFetchMocks, FetchMock} from 'jest-fetch-mock'

enableFetchMocks()

import App from '../../app/javascript/components/App.jsx'

describe('<App />', () => {
  beforeEach(() => {
    // if you have an existing `beforeEach` just add the following line to it
    const stubData = [
      {
        "id":         "1",
        "type":       "todo",
        "attributes": {
          "description": "Brush teeth",
          "priority":    "0",
          "completedAt": nil,
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
          "completedAt": nil,
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
    fetch.mockResponse(JSON.stringify({data: stubData}))
  })

  it('fetches the list of todos', () => {
    const wrapper = shallow(<App/>); // 5
    expect(wrapper.find('tbody>tr>td')).toHaveLength(3)
  })
})