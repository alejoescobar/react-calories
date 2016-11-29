# == Schema Information
#
# Table name: calories_entries
#
#  id              :integer          not null, primary key
#  date            :datetime         not null
#  title           :text             not null
#  calories_amount :integer          not null
#  user_id         :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class CaloriesEntry < ApplicationRecord
  belongs_to :user

  validates_presence_of :date, :calories_amount, :title

  scope :group_by_day, -> { all.group_by { |entry| entry.date.to_date.to_s } }

  def day
    self.date.strftime('%a, %e %b %Y')
  end

  def time
    self.date.strftime('%l:%M %p')
  end

end
