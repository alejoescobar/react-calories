class ApplicationController < ActionController::API

  def current_user
    @current_user ||= User.find_by(auth_token: request.headers['Authorization'])
  end

  def authenticate_user!
    render json: { errors: 'Not authenticated' },
                status: :unauthorized unless current_user.present?
  end

  def user_signed_in?
    current_user.present?
  end

  def require_admin_or_manager_permissions!
    head :unauthorized unless current_user.admin? || current_user.manager?
  end

end
