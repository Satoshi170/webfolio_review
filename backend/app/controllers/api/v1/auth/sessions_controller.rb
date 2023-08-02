class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      user_data = current_api_v1_user.as_json(only: [:name]).merge(image: current_api_v1_user.image_url)
      render json: { is_login: true, data: user_data }
    else
      render json: { is_login: false }
    end
  end
end
