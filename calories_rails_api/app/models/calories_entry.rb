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

  scope :group_by_day, -> {
    all.group_by { |entry| entry.date.to_date.strftime('%a, %e %b %Y') }
      .map { |day, entries| { day: day, entries: entries } }
  }

  scope :filter_by_date, -> (start_date, end_date) {
    where('date::date BETWEEN ? AND ?', start_date, end_date)
  }

  scope :filter_by_time, -> (start_time, end_time) {
    where('date::time BETWEEN ? AND ?', start_time, end_time)
  }

  def day
    self.date.strftime('%a, %-e %b %Y')
  end

  def time
    self.date.strftime('%-l:%M %p')
  end

  def self.apply_filters(params = {})
    calories_entries = all
    calories_entries = calories_entries.filter_by_date(params[:start_date], params[:end_date]) if validate_param(params[:start_date]) && validate_param([:end_date])
    calories_entries = calories_entries.filter_by_time(params[:start_time], params[:end_time]) if validate_param(params[:start_time]) && validate_param([:end_time])
    calories_entries
  end

  def as_json(opts)
    opts[:only] ||= [:id, :title, :calories_amount, :user_id]
    opts[:methods] ||= [:day, :time]
    super
  end

  private

  def self.validate_param(param)
    param && param.present?
  end
end
