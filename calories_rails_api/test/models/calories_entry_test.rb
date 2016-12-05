# == Schema Information
#
# Table name: calories_entries
#
#  id              :integer          not null, primary key
#  date            :datetime         not null
#  title           :text             not null
#  calories_amount :integer          not null
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class CaloriesEntryTest < ActiveSupport::TestCase
  should belong_to :user
  should validate_presence_of :date
  should validate_presence_of :title
  should validate_presence_of :calories_amount

  test 'returns date field formatted as a date string' do
    calories_entry = calories_entries(:one)
    day = calories_entry.day
    assert_equal day, calories_entry.date.strftime('%a, %-e %b %Y')
  end

  test 'returns day field formatted as a time string' do
    calories_entry = calories_entries(:one)
    time = calories_entry.time
    assert_equal time, calories_entry.date.strftime('%-l:%M %p')
  end

  test 'group_by_day scope returns calories entries grouped by day' do
    calories_entries = CaloriesEntry.group_by_day
    total_entries = 0
    calories_entries.each { |obj| total_entries += obj[:entries].length }

    assert_equal CaloriesEntry.count, total_entries
  end

  test 'filter_by_date scope return entries between two dates' do
    calories_entry = calories_entries(:one)
    start_date = calories_entry.date - 1.day
    end_date = calories_entry.date + 1.day
    calories_entries = CaloriesEntry.filter_by_date(start_date, end_date)

    assert_includes calories_entries, calories_entry
  end

  test 'filter_by_time scope return entries between two times' do
    calories_entry = calories_entries(:one)
    start_time = calories_entry.date - 1.hour
    end_time = calories_entry.date + 1.hour
    calories_entries = CaloriesEntry.filter_by_time(start_time, end_time)

    assert_includes calories_entries, calories_entry
  end

end
