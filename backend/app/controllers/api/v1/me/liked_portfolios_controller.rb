class Api::V1::Me::LikedPortfoliosController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    portfolios = current_api_v1_user.liked_portfolios
    if portfolios.empty?
      render json: {
               status: "success",
               message: "No goods found",
               data: [],
             },
             status: :ok
    else
      portfolios = current_api_v1_user.liked_portfolios
      render json: {
               status: "success",
               message: "Loaded portfolios",
               data: PortfolioResource.new(portfolios).serializable_hash,
             },
             status: :ok
    end
  end
end
