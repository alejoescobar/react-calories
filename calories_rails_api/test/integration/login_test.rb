require 'test_helper'

class LoginTest < ActionDispatch::IntegrationTest
  self.use_transactional_tests = false

  test 'user can login', js: true do
    user = users(:user)
    login(user)

    assert page.has_content? 'Listing Calories'
  end

  test "user can't login with invalid credentials", js: true do
    visit '/login'
    wait = Wait.new
    wait.until { assert page.has_content? 'Login' }
    users(:user).update(password: '12345678')

    fill_in 'Email', with: 'notvalid@email.com'
    fill_in 'Password', with: 'not valid password'
    click_button 'Login'

    assert page.has_content? 'Invalid email or password'
  end

end
