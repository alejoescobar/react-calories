import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Settings from '../Settings'

it('renders without crashing', () => {
  shallow(<Settings />)
})

it('updates calories goal', () => {
  const wrapper = shallow(<Settings />)
  wrapper.instance().updateCaloriesGoal({ target: { value: 2500 } })
  expect(wrapper.state().caloriesGoal).toBe(2500)
})
