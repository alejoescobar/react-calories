require 'test_helper'

class CaloriesEntriesTest < ActionDispatch::IntegrationTest
  self.use_transactional_tests = false

  test 'user can see calories entries', js: true do
    user = users(:user)
    login(user)

    calories_entries = user.calories_entries
    calories_entries.each do |entry|
      assert page.has_content? entry.title
      assert page.has_content? entry.calories_amount
    end
  end

  test 'user can create calories entry', js: true do
    user = users(:user)
    login(user)

    click_button 'Create new entry'

    fill_in 'Title', with: 'Test Meal'
    fill_in 'Calories Amount', with: '123'
    click_button 'Create new entry'

    assert page.has_content? 'Test Meal'
    assert page.has_content? '123'
  end

  test 'user can update calories entry', js: true do
    user = users(:user)
    login(user)

    entry_id = user.calories_entries.first.id
    visit "/calories/#{entry_id}/edit"

    fill_in 'Title', with: 'Updated meal'
    fill_in 'Calories Amount', with: '456'
    click_button 'Update new entry'

    assert page.has_content? 'Updated meal'
    assert page.has_content? '456'
  end

  test 'user can destroy calories entry', js: true do
    user = users(:user)
    login(user)

    calories_entry = user.calories_entries.first
    page.find("#entry-#{calories_entry.id}").click

    assert page.has_no_content? calories_entry.title
    assert page.has_no_content? calories_entry.calories_amount
  end

end
