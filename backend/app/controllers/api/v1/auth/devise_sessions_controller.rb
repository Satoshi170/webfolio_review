class Api::V1::Auth::DeviseSessionsController < DeviseTokenAuth::SessionsController
  def render_create_success
    render json: {
      data: resource_data(resource_json: @resource.as_json(only: [:name, :image])),
    }
  end
end
