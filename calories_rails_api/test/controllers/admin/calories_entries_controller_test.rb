require 'test_helper'

class Admin::CaloriesEntriesControllerTest < ActionDispatch::IntegrationTest

  test 'GET#index by admin returns user calories entries' do
    get admin_user_calories_entries_url(users(:user)), xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    body = JSON.parse(response.body)
    total_entries = 0
    body.each { |obj| total_entries += obj['entries'].length }
    assert_not_nil body
    assert_equal users(:user).calories_entries.count, total_entries
  end

  test 'GET#index by manager returns 401 Unauthorized' do
    get admin_user_calories_entries_url(users(:user)), xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    assert_response :unauthorized
  end

  test 'GET#index by user returns 401 Unauthorized' do
    get admin_user_calories_entries_url(users(:user)), xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'GET#index without credentials return 401 Unauthorized' do
    get admin_user_calories_entries_url(users(:user)), xhr: true
    assert_response :unauthorized
  end

  test 'POST#create by admin creates user' do
    assert_difference 'CaloriesEntry.count', 1, 'Expected to create a user' do
      post admin_user_calories_entries_url(users(:user)), xhr: true, as: :json,
      params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
      headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    end
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'Pasta', body['title']
    assert_equal 600, body['calories_amount']
    assert_not_nil body['day']
    assert_not_nil body['time']
  end

  test 'POST#create by manager returns 401 Unauthorized' do
    post admin_user_calories_entries_url(users(:user)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
    headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    assert_response :unauthorized
  end

  test 'POST#create by user returns 401 Unauthorized' do
    post admin_user_calories_entries_url(users(:user)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'POST#create without credentials returns 401 Unauthorized' do
    post admin_user_calories_entries_url(users(:user)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } }
    assert_response :unauthorized
  end

  test 'PUT#update by admin updates user' do
    put admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
    headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'Pasta', body['title']
    assert_equal 600, body['calories_amount']
    assert_not_nil body['day']
    assert_not_nil body['time']
  end

  test 'PUT#update by manager returns 401 Unauthorized' do
    put admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
    headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    assert_response :unauthorized
  end

  test 'PUT#update by user returns 401 Unauthorized' do
    put admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'PUT#update without credentials returns 401 Unauthorized' do
    put admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } }
    assert_response :unauthorized
  end

  test 'DELETE#destroy by admin destroys user' do
    assert_difference 'CaloriesEntry.count', -1, 'Expected to create a user' do
      delete admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true,
      headers: { "HTTP_AUTHORIZATION" => users(:admin).auth_token }
    end
    assert_response :success
  end

  test 'DELETE#destroy by manager returns 401 Unauthorized' do
    delete admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true,
    headers: { "HTTP_AUTHORIZATION" => users(:manager).auth_token }
    assert_response :unauthorized
  end

  test 'DELETE#destroy by user returns 401 Unauthorized' do
    delete admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true,
    headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :unauthorized
  end

  test 'DELETE#destroy without credentials returns 401 Unauthorized' do
    delete admin_user_calories_entry_url(users(:user), calories_entries(:one)), xhr: true
    assert_response :unauthorized
  end

end
