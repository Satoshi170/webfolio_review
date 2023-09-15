class Api::V1::Auth::DeviseSessionsController < DeviseTokenAuth::SessionsController
  def render_create_success
    render json: {
      data: resource_data(
        resource_json: @resource.as_json(only: [:name]).merge(
          image: current_api_v1_user.image_url
        )
      ),
    }
  end

  private

  def resource_params
    params.require(:devise_session).permit(*params_for_resource(:sign_in))
  end
end
