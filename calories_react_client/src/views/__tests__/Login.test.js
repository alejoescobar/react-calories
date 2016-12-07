import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Login from '../Login'

it('renders without crashing', () => {
  shallow(<Login />)
})

it('updates email', () => {
  const wrapper = shallow(<Login />)
  wrapper.instance().updateEmail({ target: { value: 'test@email.com' } })
  expect(wrapper.state().email).toBe('test@email.com')
})

it('updates password', () => {
  const wrapper = shallow(<Login />)
  wrapper.instance().updatePassword({ target: { value: '12345678' } })
  expect(wrapper.state().password).toBe('12345678')
})
