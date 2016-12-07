import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AdminEditCaloriesEntry from '../AdminEditCaloriesEntry'
import CaloriesEntryForm from '../../components/CaloriesEntryForm'

it('renders without crashing', () => {
  shallow(<AdminEditCaloriesEntry params={{id: 1, userId: 1}} />)
})

it('renders CaloriesEntryForm', () => {
  const wrapper = shallow(<AdminEditCaloriesEntry params={{id: 1, userId: 1}} />)
  expect(wrapper.find(CaloriesEntryForm).length).toBe(1)
})

it('updates title', () => {
  const wrapper = shallow(<AdminEditCaloriesEntry params={{id: 1, userId: 1}} />)
  wrapper.instance().updateTitle({ target: { value: 'Test' } })
  expect(wrapper.state().title).toBe('Test')
})
