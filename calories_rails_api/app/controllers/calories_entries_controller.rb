class CaloriesEntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.calories_entries.order(date: :desc)
      .apply_filters(params).group_by_day
  end

  def show
    render json: current_user.calories_entries.find(params[:id])
  end

  def create
    user = current_user
    calories_entry = user.calories_entries.new(calories_entries_params)
    if calories_entry.save
      render json: calories_entry, status: :ok
    else
      render json: { errors: calories_entry.errors.full_messages }, status: :bad_request
    end
  end

  def update
    user = current_user
    calories_entry = user.calories_entries.find(params[:id])
    if calories_entry.update(calories_entries_params)
      render json: calories_entry, status: :ok
    else
      render json: { errors: calories_entry.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    user = current_user
    calories_entry = user.calories_entries.find(params[:id])
    calories_entry.destroy
    head :no_content
  end

  private
    def calories_entries_params
      params.require(:calories_entry).permit(:title, :date, :calories_amount)
    end

end
