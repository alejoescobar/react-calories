import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import EditCaloriesEntry from '../EditCaloriesEntry'
import CaloriesEntryForm from '../../components/CaloriesEntryForm'

it('renders without crashing', () => {
  shallow(<EditCaloriesEntry />)
})

it('renders CaloriesEntryForm', () => {
  const wrapper = shallow(<EditCaloriesEntry />)
  expect(wrapper.find(CaloriesEntryForm).length).toBe(1)
})

it('updates title', () => {
  const wrapper = shallow(<EditCaloriesEntry />)
  wrapper.instance().updateTitle({ target: { value: 'Test' } })
  expect(wrapper.state().title).toBe('Test')
})
