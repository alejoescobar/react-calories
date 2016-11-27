# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           default(""), not null
#  password_digest     :string           not null
#  auth_token          :string           not null
#  role                :integer          default(0), not null
#  daily_calories_goal :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class User < ApplicationRecord
  has_secure_password
  
end
