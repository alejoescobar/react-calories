require 'test_helper'

class RegistrationTest < ActionDispatch::IntegrationTest
  self.use_transactional_tests = false

  test "user can register", js: true do
    visit '/'

    fill_in "Email", with: "new-user@example.com"
    fill_in "Password", with: "pass1234"
    click_button "Register"

    assert page.has_content? 'Login'
  end

  test "user can't register if email already exists", js: true do
    user = users(:user)
    visit '/'

    fill_in "Email", with: user.email
    fill_in "Password", with: "pass1234"
    click_button "Register"

    assert page.has_content? 'Email has already been taken'
  end

end
