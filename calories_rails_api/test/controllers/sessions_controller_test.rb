require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  test 'POST#create authenticates user' do
    user = users(:user)
    user.update(password: '12345678')
    previous_token = user.auth_token
    post sessions_url, xhr: true, as: :json,
    params: { session: { email: user.email, password: '12345678' } }

    assert_response :success

    assert_not_equal previous_token, user.reload.auth_token
  end

  test 'POST#create without credentials returns 401 Unauthorized' do
    post sessions_url, xhr: true, as: :json, params: { session: { email: '', password: '' } }
    assert_response :unauthorized
  end

  test 'DELETE#destroy logs out user' do
    user = users(:user)
    previous_token = user.auth_token
    delete sessions_url, xhr: true, headers: { "HTTP_AUTHORIZATION" => previous_token }

    assert_not_equal previous_token, user.reload.auth_token
  end

end
