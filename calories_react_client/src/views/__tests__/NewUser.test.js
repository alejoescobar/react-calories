import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import NewUser from '../NewUser'
import UserForm from '../../components/UserForm'

it('renders without crashing', () => {
  shallow(<NewUser />)
})

it('renders UserForm', () => {
  const wrapper = shallow(<NewUser />)
  expect(wrapper.find(UserForm).length).toBe(1)
})

it('updates email', () => {
  const wrapper = shallow(<NewUser />)
  wrapper.instance().updateEmail({ target: { value: 'test@email.com' } })
  expect(wrapper.state().email).toBe('test@email.com')
})

it('updates password', () => {
  const wrapper = shallow(<NewUser />)
  wrapper.instance().updatePassword({ target: { value: '12345678' } })
  expect(wrapper.state().password).toBe('12345678')
})

it('updates calories goal', () => {
  const wrapper = shallow(<NewUser />)
  wrapper.instance().updateCaloriesGoal({ target: { value: 2500 } })
  expect(wrapper.state().caloriesGoal).toBe(2500)
})
