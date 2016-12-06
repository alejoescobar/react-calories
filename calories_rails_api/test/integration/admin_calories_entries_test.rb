require 'test_helper'

class AdminCaloriesEntriesTest < ActionDispatch::IntegrationTest
  self.use_transactional_tests = false

  test 'admin can get all calories entries of user', js: true do
    admin = users(:admin)
    login(admin)

    user = users(:user)
    visit "admin/users/#{user.id}/calories"
    assert page.has_content? 'Listing Calories'

    user.calories_entries.each do |entry|
      assert page.has_content? entry.title
      assert page.has_content? entry.calories_amount
    end
  end

  test 'admin can create calories entry of user', js: true do
    admin = users(:admin)
    login(admin)

    user = users(:user)
    visit "admin/users/#{user.id}/calories"
    assert page.has_content? 'Listing Calories'
    click_button 'Create new entry'

    fill_in 'Title', with: 'Test Meal'
    fill_in 'Calories Amount', with: '123'
    click_button 'Create new entry'

    assert page.has_content? 'Test Meal'
    assert page.has_content? '123'
  end

  test 'admin can edit calories entry of user', js: true do
    admin = users(:admin)
    login(admin)

    user = users(:user)
    calories_entry = user.calories_entries.first
    visit "/admin/users/#{user.id}/calories/#{calories_entry.id}/edit"
    assert page.has_content? 'Edit Calories Entry'

    fill_in 'Title', with: 'Test Meal'
    fill_in 'Calories Amount', with: '789'
    click_button 'Update new entry'

    assert page.has_content? 'Test Meal'
    assert page.has_content? '789'
  end

  test 'admin can destroy user calories entry', js: true do
    admin = users(:admin)
    login(admin)

    user = users(:user)
    visit "admin/users/#{user.id}/calories"

    calories_entry = user.calories_entries.first
    page.find("#entry-#{calories_entry.id}").click

    assert page.has_no_content? calories_entry.title
    assert page.has_no_content? calories_entry.calories_amount
  end

end
