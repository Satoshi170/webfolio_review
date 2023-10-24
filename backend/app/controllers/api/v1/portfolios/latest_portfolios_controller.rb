class Api::V1::Portfolios::LatestPortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.includes(user: { image_attachment: :blob })
                          .order(updated_at: :desc)
                          .limit(3)

    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: PortfolioResource.new(portfolios).serializable_hash,
           },
           status: :ok
  end
end
