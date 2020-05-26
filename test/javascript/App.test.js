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
    fetch.mockResponse(JSON.stringify({access_token: '12345'}))
  })

  it('fetches the list of todos', () => {
    const wrapper = shallow(<App/>); // 5
    expect(wrapper.text()).to.contain('todo')
  })
})