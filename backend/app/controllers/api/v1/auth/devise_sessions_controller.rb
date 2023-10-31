class Api::V1::Auth::DeviseSessionsController < DeviseTokenAuth::SessionsController
  after_action :destroy_guest_user, only: [:destroy]

  def destroy
    @saved_resource = @resource
    super
  end

  def render_create_success
    render json: {
      success: true,
      message: "Signed in successfly",
    }
  end

  private

  def resource_params
    params.require(:devise_session).permit(*params_for_resource(:sign_in))
  end

  def destroy_guest_user
    if @saved_resource && @saved_resource.role == "guest" && @saved_resource.portfolios.blank?
      @saved_resource.destroy
    end
  end
end
