require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest

  test 'GET#index by admin returns users' do
    get admin_users_url, xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    body = JSON.parse(response.body)
    assert_not_nil body
    assert_equal User.count, body.length
  end

  test 'GET#index by manager returns users' do
    get admin_users_url, xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    body = JSON.parse(response.body)
    assert_not_nil body
    assert_equal User.count, body.length
  end

  test 'GET#index by user returns 401 Unauthorized' do
    get admin_users_url, xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'GET#index without credentials return 401 Unauthorized' do
    get admin_users_url, xhr: true
    assert_response :unauthorized
  end

  test 'POST#create by admin creates user' do
    assert_difference 'User.count', 1, 'Expected to create a user' do
      post admin_users_url, xhr: true, as: :json,
      params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
      headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    end
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'test@example.com', body['email']
    assert_not_nil body['auth_token']
    assert_equal 2500, body['daily_calories_goal']
  end

  test 'POST#create by manager creates user' do
    assert_difference 'User.count', 1, 'Expected to create a user' do
      post admin_users_url, xhr: true, as: :json,
      params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
      headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    end
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'test@example.com', body['email']
    assert_not_nil body['auth_token']
    assert_equal 2500, body['daily_calories_goal']
  end

  test 'POST#create by user returns 401 Unauthorized' do
    post admin_users_url, xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'POST#create without credentials returns 401 Unauthorized' do
    post admin_users_url, xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } }
    assert_response :unauthorized
  end

  test 'PUT#update by admin updates user' do
    put admin_user_url(users(:user)), xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
    headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'test@example.com', body['email']
    assert_not_nil body['auth_token']
    assert_equal 2500, body['daily_calories_goal']
  end

  test 'PUT#update by manager updates user' do
    put admin_user_url(users(:user)), xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
    headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'test@example.com', body['email']
    assert_not_nil body['auth_token']
    assert_equal 2500, body['daily_calories_goal']
  end

  test 'PUT#update by user returns 401 Unauthorized' do
    put admin_user_url(users(:user)), xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } },
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'PUT#update without credentials returns 401 Unauthorized' do
    put admin_user_url(users(:user)), xhr: true, as: :json,
    params: { user: { email: 'test@example.com', password: '12345678', daily_calories_goal: 2500 } }
    assert_response :unauthorized
  end

  test 'DELETE#destroy by admin destroys user' do
    assert_difference 'User.count', -1, 'Expected to create a user' do
      delete admin_user_url(users(:user)), xhr: true,
      headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    end
    assert_response :success
  end

  test 'DELETE#destroy by manager destroys user' do
    assert_difference 'User.count', -1, 'Expected to create a user' do
      delete admin_user_url(users(:user)), xhr: true,
      headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    end
    assert_response :success
  end

  test 'DELETE#destroy by user returns 401 Unauthorized' do
    delete admin_user_url(users(:user)), xhr: true,
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'DELETE#destroy without credentials returns 401 Unauthorized' do
    delete admin_user_url(users(:user)), xhr: true
    assert_response :unauthorized
  end

end
