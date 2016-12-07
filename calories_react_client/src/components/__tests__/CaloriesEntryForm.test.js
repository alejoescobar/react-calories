import React from 'react'
import { shallow } from 'enzyme'
import NewCaloriesEntry from '../../views/NewCaloriesEntry'
import CaloriesEntryForm from '../CaloriesEntryForm'

it('renders without crashing', () => {
  const wrapper = shallow(
    <CaloriesEntryForm errors={[]}
      header={{title: 'test', button: 'test'}}/>
  )
})
