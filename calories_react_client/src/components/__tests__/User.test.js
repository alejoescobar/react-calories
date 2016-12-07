import React from 'react'
import { shallow } from 'enzyme'
import User from '../User'
import moment from 'moment'

it('renders without crashing', () => {
  const user = { id: 1, email: 'alejo@test.com', role: 'user', daily_calories_goal: 2500 }
  shallow(<User user={user} />)
})

it('renders table row', () => {
  const user = { id: 1, email: 'alejo@test.com', role: 'user', daily_calories_goal: 2500,
    created_at: moment(), entries_count: 5 }
  const row = shallow(<User user={user}/>)
  expect(row.find('tr td').at(0).text()).toBe('1')
  expect(row.find('tr td').at(1).text()).toBe('alejo@test.com')
  expect(row.find('tr td').at(2).text()).toBe('user')
  expect(row.find('tr td').at(3).text()).toBe('2500')
  expect(row.find('tr td').at(4).text()).toBe('5')
  expect(row.find('tr td').at(5).text()).toBe(moment().format('LLL'))
})
