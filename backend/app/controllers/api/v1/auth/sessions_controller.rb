class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: {
        is_login: true,
        data: Users::AuthResource.new(current_api_v1_user).serializable_hash,
      }
    else
      render json: { is_login: false }
    end
  end
end
