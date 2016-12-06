require 'test_helper'

class UsersTest < ActionDispatch::IntegrationTest
  self.use_transactional_tests = false

  test 'admin can get all users', js: true do
    admin = users(:admin)
    login(admin)

    click_link 'Admin Users'

    User.all.each do |user|
      assert page.has_content? user.email
      assert page.has_content? user.daily_calories_goal
    end
  end

  test 'admin can create users', js: true do
    admin = users(:admin)
    login(admin)

    click_link 'Admin Users'
    click_button 'Create new user'

    fill_in 'Email', with: 'new@user.com'
    fill_in 'Password', with: '12345678'
    fill_in 'Calories goal', with: '2500'

    click_button 'Create user'

    assert page.has_content? 'new@user.com'
    assert page.has_content? '2500'
  end

  test 'admin can edit users', js: true do
    admin = users(:admin)
    login(admin)

    user_id = users(:user).id
    visit "/admin/users/edit/#{user_id}"
    assert page.has_content? 'Edit User'

    fill_in 'Email', with: 'updated@email.com'
    fill_in 'Calories goal', with: '756'
    click_button 'Update user'

    assert page.has_content? 'updated@email.com'
    assert page.has_content? '756'
  end

  test 'admin can destroy users', js: true do
    admin = users(:admin)
    login(admin)

    click_link 'Admin Users'

    user = users(:user)
    user_id = user.id
    page.find("#user-#{user_id}").click

    assert page.has_no_content? user.email
  end

end
