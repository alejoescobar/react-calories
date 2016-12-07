import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import NewCaloriesEntry from '../NewCaloriesEntry'
import CaloriesEntryForm from '../../components/CaloriesEntryForm'

it('renders without crashing', () => {
  shallow(<NewCaloriesEntry />)
})

it('renders CaloriesEntryForm', () => {
  const wrapper = shallow(<NewCaloriesEntry />)
  expect(wrapper.find(CaloriesEntryForm).length).toBe(1)
})

it('updates title', () => {
  const wrapper = shallow(<NewCaloriesEntry />)
  wrapper.instance().updateTitle({ target: { value: 'Test' } })
  expect(wrapper.state().title).toBe('Test')
})

it('creates new entry on onHandleSubmit', () => {
  const wrapper = shallow(<NewCaloriesEntry />)
  wrapper.setState({
    title: 'Test',
    date: '30 Nov, 2016 3:00PM',
    caloriesAmount: 500
  })
  wrapper.instance().handleSubmit({preventDefault: () => {}})
})
