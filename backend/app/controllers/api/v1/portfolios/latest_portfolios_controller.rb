class Api::V1::Portfolios::LatestPortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.includes(:goods, :comments, user: { image_attachment: :blob }).
      order(updated_at: :desc).
      limit(3)

    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: Portfolios::PortfolioResource.new(portfolios).serializable_hash,
           },
           status: :ok
  end
end
