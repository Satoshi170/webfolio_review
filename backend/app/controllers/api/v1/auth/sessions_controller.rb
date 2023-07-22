class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user.for_api }
    else
      render json: { is_login: false }
    end
  end
end
