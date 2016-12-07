import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AdminCalories from '../AdminCalories'
import DailyCalories from '../../components/DailyCalories'
import moment from 'moment'

it('renders without crashing', () => {
  shallow(<AdminCalories location={ {query: { userEmail: 'alejo@test.com' }} }/>)
})

it('renders DailyCalories', () => {
  const wrapper = shallow(<AdminCalories location={ {query: { userEmail: 'alejo@test.com' }} }/>)
  wrapper.setState({
    caloriesEntries: [{ day: 'Nov 30, 2016',
      entries: [{id: 1, title: 'Test', day: 'Nov 30, 2016', time: '3:00 PM', calories_amount: 500}] }]
  })
  expect(wrapper.find(DailyCalories).length).toBe(1)
})

it('updates startDate and endDate', () => {
  const wrapper = shallow(<AdminCalories location={ {query: { userEmail: 'alejo@test.com' }} }/>)
  wrapper.instance().updateDateRanges({}, { startDate: moment(), endDate: moment() })
  expect(wrapper.state().startDate).toBe(moment().format('L'))
  expect(wrapper.state().endDate).toBe(moment().format('L'))
})

it('updates startTime', () => {
  const wrapper = shallow(<AdminCalories location={ {query: { userEmail: 'alejo@test.com' }} }/>)
  wrapper.instance().updateStartTime({ target: { value: 'Test' } })
  expect(wrapper.state().startTime).toBe('Test')
})

it('updates endTime', () => {
  const wrapper = shallow(<AdminCalories location={ {query: { userEmail: 'alejo@test.com' }} }/>)
  wrapper.instance().updateEndTime({ target: { value: 'Test' } })
  expect(wrapper.state().endTime).toBe('Test')
})
