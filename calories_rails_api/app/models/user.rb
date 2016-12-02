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

class User < ApplicationRecord
  has_secure_password
  has_secure_token :auth_token
  has_many :calories_entries

  validates :email, presence: true, uniqueness: true
  validates_presence_of :daily_calories_goal

  enum role: [:user, :manager, :admin]

  def authenticate(password)
    authorized = super(password)
    if authorized
      self.auth_token = User.generate_unique_secure_token
      self.save
    end
    authorized
  end

  def sign_out
    self.auth_token = User.generate_unique_secure_token
    self.save
  end

  def as_json(opts)
    opts[:except] ||= [:password_digest]
    super
  end

end
