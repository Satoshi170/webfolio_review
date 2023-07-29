class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, only: [:destroy, :update]

  def resource_data(opts = {})
    if @resource.errors.any?
      {}
    else
      response_data = opts[:resource_json] || @resource.as_json(only: [:name, :image])
      response_data
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:name, :email)
  end
end
