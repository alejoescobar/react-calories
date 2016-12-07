import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AdminNewCaloriesEntry from '../AdminNewCaloriesEntry'
import CaloriesEntryForm from '../../components/CaloriesEntryForm'

it('renders without crashing', () => {
  shallow(<AdminNewCaloriesEntry params={{userId: 1}}/>)
})

it('renders CaloriesEntryForm', () => {
  const wrapper = shallow(<AdminNewCaloriesEntry params={{userId: 1}}/>)
  expect(wrapper.find(CaloriesEntryForm).length).toBe(1)
})

it('updates title', () => {
  const wrapper = shallow(<AdminNewCaloriesEntry params={{userId: 1}}/>)
  wrapper.instance().updateTitle({ target: { value: 'Test' } })
  expect(wrapper.state().title).toBe('Test')
})

it('creates new entry on onHandleSubmit', () => {
  const wrapper = shallow(<AdminNewCaloriesEntry params={{userId: 1}}/>)
  wrapper.setState({
    title: 'Test',
    date: '30 Nov, 2016 3:00PM',
    caloriesAmount: 500
  })
  wrapper.instance().handleSubmit({preventDefault: () => {}})
})
