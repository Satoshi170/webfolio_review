class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :authenticate_api_v1_user!, only: [:destroy, :update]
  before_action :restrict_guest_update, only: [:update]

  def resource_data(opts = {})
    if @resource.errors.any?
      {}
    else
      response_data = opts[:resource_json] ||
      Users::UserResource.new(current_api_v1_user).serializable_hash
      response_data
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :password_confirmation, :name)
  end

  def account_update_params
    params.permit(:name, :image)
  end

  def restrict_guest_update
    if @resource && @resource.role == "guest"
      render json: {
               status: "error",
               message: "Failed to update",
               errors: ["guestuser can't update"],
             },
             status: :forbidden
    end
  end
end
