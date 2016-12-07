import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Users from '../Users'
import User from '../../components/User'

it('renders without crashing', () => {
  shallow(<Users />)
})

it('renders User', () => {
  const wrapper = shallow(<Users />)
  wrapper.setState({
    users: [{ id: 1, email: 'alejo@test.com', daily_calories_goal: 3000 }]
  })
  expect(wrapper.find(User).length).toBe(1)
})
