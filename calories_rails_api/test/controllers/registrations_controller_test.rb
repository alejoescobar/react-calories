require 'test_helper'

class RegistrationsControllerTest < ActionDispatch::IntegrationTest

  test 'POST#create creates a new user' do
    assert_difference 'User.count', 1, 'Expected to create a user' do
      post registrations_url, xhr: true, as: :json,
      params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } }
    end
    assert_response :success
    user = User.find_by_email('test@example.com')
    assert_not_nil user.auth_token
    assert_equal 2500, user.daily_calories_goal
  end

  test 'PUT#update updates user info' do
    user = users(:user)
    put registration_url(user.id), xhr: true, as: :json,
    params: { user: { daily_calories_goal: 3000 } },
    headers: { "HTTP_AUTHORIZATION" => user.auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 3000, body['daily_calories_goal']
  end

end
