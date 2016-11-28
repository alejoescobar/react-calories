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

require 'test_helper'

class CaloriesEntryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
