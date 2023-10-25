class Api::V1::Portfolios::PopularPortfoliosController < ApplicationController
  def index
    portfolios = Portfolio.includes(:goods, user: { image_attachment: :blob })
                          .left_joins(:goods)
                          .group(:id)
                          .order('COUNT(goods.id) DESC')
                          .limit(3)

    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: PortfolioResource.new(portfolios).serializable_hash,
           },
           status: :ok
  end
end
