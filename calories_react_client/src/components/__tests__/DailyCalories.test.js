import React from 'react'
import { shallow } from 'enzyme'
import DailyCalories from '../DailyCalories'

it('renders without crashing', () => {
  const caloriesEntries = { day: 'Nov 30, 2016', entries: [] }
  shallow(<DailyCalories day={caloriesEntries.day} caloriesEntries={caloriesEntries.entries}/>)
})

it('renders table row', () => {
  const caloriesEntries = { day: 'Nov 30, 2016',
    entries: [{id: 1, title: 'Test', day: 'Nov 30, 2016', time: '3:00 PM', calories_amount: 500}]
  }
  const row = shallow(<DailyCalories day={caloriesEntries.day} caloriesEntries={caloriesEntries.entries}/>)
  expect(row.find('thead tr').length).toBe(1)
  expect(row.find('tbody tr').length).toBe(1)
  expect(row.find('tbody tr td').at(0).text()).toBe('1')
  expect(row.find('tbody tr td').at(1).text()).toBe('Test')
  expect(row.find('tbody tr td').at(2).text()).toBe('Nov 30, 2016')
  expect(row.find('tbody tr td').at(3).text()).toBe('3:00 PM')
  expect(row.find('tbody tr td').at(4).text()).toBe('500')
})
