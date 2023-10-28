class Api::V1::Portfolios::UserPortfoliosController < ApplicationController
  before_action :set_user_id, only: [:index]

  def index
    portfolios = Portfolio.includes(:goods, user: { image_attachment: :blob }).
      where(user_id: @user_id).
      all.order(updated_at: :desc)

    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: PortfolioResource.new(portfolios).serializable_hash,
           },
           status: :ok
  end

  private

  def set_user_id
    @user_id = params[:user_id]
  end
end
