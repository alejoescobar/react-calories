import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Registration from '../Registration'

it('renders without crashing', () => {
  shallow(<Registration />)
})

it('updates email', () => {
  const wrapper = shallow(<Registration />)
  wrapper.instance().updateEmail({ target: { value: 'test@email.com' } })
  expect(wrapper.state().email).toBe('test@email.com')
})

it('updates password', () => {
  const wrapper = shallow(<Registration />)
  wrapper.instance().updatePassword({ target: { value: '12345678' } })
  expect(wrapper.state().password).toBe('12345678')
})

it('updates calories goal', () => {
  const wrapper = shallow(<Registration />)
  wrapper.instance().updateCaloriesGoal({ target: { value: 2500 } })
  expect(wrapper.state().caloriesGoal).toBe(2500)
})
