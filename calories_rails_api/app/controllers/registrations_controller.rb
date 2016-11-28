class RegistrationsController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: 201
    else
      render json: { errors: user.errors.full_messages }, status: 400
    end
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :daily_calories_goal)
    end

end
