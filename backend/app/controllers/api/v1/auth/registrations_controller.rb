class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, only: [:destroy, :update]

  private

  def sign_up_params
    params.require(:registration)permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:name, :nickname, :email)
  end
end
