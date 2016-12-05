# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           default(""), not null
#  password_digest     :string           not null
#  auth_token          :string           default(""), not null
#  role                :integer          default("user"), not null
#  daily_calories_goal :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  should have_many(:calories_entries).dependent(:destroy)
  should have_secure_password
  should validate_presence_of :email
  should validate_presence_of :daily_calories_goal
  should validate_uniqueness_of :email

  test 'authenticate should generate new auth_token' do
    user = users(:user)
    previous_token = user.auth_token
    user.update(password: '12345678')
    user.authenticate(user.password)
    assert_not_equal previous_token, user.reload.auth_token
  end

  test 'sign out should generate new auth_token' do
    user = users(:user)
    previous_token = user.auth_token
    user.sign_out
    assert_not_equal previous_token, user.reload.auth_token
  end
end
