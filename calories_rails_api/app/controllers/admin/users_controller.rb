class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin_or_manager_permissions!

  def index
    render json: User.all.order(:email)
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: 201
    else
      render json: { errors: user.errors.full_messages }, status: 400
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :role, :daily_calories_goal)
  end

end
