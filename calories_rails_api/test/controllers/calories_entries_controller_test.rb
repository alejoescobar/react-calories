require 'test_helper'

class CaloriesEntriesControllerTest < ActionDispatch::IntegrationTest

  test 'GET#index returns calories entries' do
    get calories_entries_url, xhr: true, headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    total_entries = 0
    body.each { |obj| total_entries += obj['entries'].length }
    assert_not_nil body
    assert_equal users(:user).calories_entries.count, total_entries
  end

  test 'GET#index without credentials returns 401 Unauthorized' do
    get calories_entries_url, xhr: true
    assert_response :unauthorized
  end

  test 'POST#create creates a new calories entry' do
    assert_difference 'CaloriesEntry.count', 1, 'Expected to create a calories entry' do
      post calories_entries_url, xhr: true, as: :json,
      params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } },
      headers: { "HTTP_AUTHORIZATION" => users(:user).auth_token }
    end
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'Pasta', body['title']
    assert_equal 600, body['calories_amount']
    assert_not_nil body['day']
    assert_not_nil body['time']
  end

  test 'POST#create without credentials returns 401 Unauthorized' do
    post calories_entries_url, xhr: true, as: :json,
    params: { calories_entry: {  title: 'Pasta', date: Time.current, calories_amount: 600 } }
    assert_response :unauthorized
  end

  test 'PUT#update updates calories entry' do
    calories_entry = calories_entries(:one)
    user = calories_entry.user
    put calories_entry_url(calories_entry.id), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Guacamole', date: Time.current, calories_amount: 800 } },
    headers: { "HTTP_AUTHORIZATION" => user.auth_token }
    assert_response :success
    body = JSON.parse(response.body)
    assert_equal 'Guacamole', body['title']
    assert_equal 800, body['calories_amount']
    assert_not_nil body['day']
    assert_not_nil body['time']
  end

  test 'PUT#update without credentials returns 401 Unauthorized' do
    calories_entry = calories_entries(:one)
    put calories_entry_url(calories_entry.id), xhr: true, as: :json,
    params: { calories_entry: {  title: 'Guacamole', date: Time.current, calories_amount: 800 } }
    assert_response :unauthorized
  end

  test 'DELETE#destroy destroys calories entry' do
    calories_entry = calories_entries(:one)
    user = calories_entry.user
    assert_difference 'CaloriesEntry.count', -1, 'Expected to destroy a calories entry' do
      delete calories_entry_url(calories_entry.id), xhr: true,
      headers: { "HTTP_AUTHORIZATION" => user.auth_token }
    end
    assert_response :success
  end

  test 'Delete#destroy without credentials returns 401 Unauthorized' do
    calories_entry = calories_entries(:one)
    delete calories_entry_url(calories_entry.id), xhr: true
    assert_response :unauthorized
  end

end
