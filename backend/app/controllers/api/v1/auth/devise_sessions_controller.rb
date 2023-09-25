class Api::V1::Auth::DeviseSessionsController < DeviseTokenAuth::SessionsController
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
end
