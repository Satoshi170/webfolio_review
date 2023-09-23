class Api::V1::PortfoliosController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create]

  def index
    portfolios = Portfolio.all
    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: portfolios,
           },
           status: :ok
  end

  def create
    @portfolio = current_api_v1_user.portfolios.build(portfolio_params)

    if @portfolio.save
      render json: {
               status: "success",
               message: "Portfolio created successfully",
             },
             status: :created
    else
      render json: {
               status: "error",
               message: "Failed to create portfolio",
               data: @portfolio.errors,
             },
             status: :unprocessable_entity
    end
  end

  private

  def portfolio_params
    params.require(:portfolio).permit(:title, :content, :user_id)
  end
end
