import React from 'react';
import { shallow } from 'enzyme';
import NewCaloriesEntry from '../views/NewCaloriesEntry';
import CaloriesEntryForm from './CaloriesEntryForm'

it('calls submit function', () => {
  const wrapper = shallow(<NewCaloriesEntry />)
})
