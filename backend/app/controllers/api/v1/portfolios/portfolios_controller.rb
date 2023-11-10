class Api::V1::Portfolios::PortfoliosController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :set_portfolio, only: [:show, :update, :destroy]
  before_action :authorize_user_for_portfolio!, only: [:update, :destroy]

  def index
    portfolios = Portfolio.includes(:goods, user: { image_attachment: :blob })
    if params[:id].present?
      ids = params[:id].split(",")
      portfolios = portfolios.where(id: ids)
    else
      portfolios = portfolios.order(updated_at: :desc)
    end

    render json: {
             status: "success",
             message: "Loaded portfolios",
             data: PortfolioResource.new(portfolios).serializable_hash,
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
               errors: @portfolio.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def show
    render json: {
             status: "success",
             message: "Loaded the portfolio",
             data: PortfolioResource.new(@portfolio).serializable_hash,
           },
           status: :ok
  end

  def update
    if @portfolio.update(portfolio_params)
      render json: {
               status: "success",
               message: "Portfolio updated successfully",
             },
             status: :ok
    else
      render json: {
               status: "error",
               message: "Failed to update portfolio",
               errors: @portfolio.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @portfolio.destroy
    render json: {
             status: "success",
             message: "Portfolio destoried successfully",
           },
           status: :ok
  end

  private

  def set_portfolio
    @portfolio = Portfolio.find(params[:id])
  end

  def authorize_user_for_portfolio!
    unless current_api_v1_user == @portfolio.user
      render json: {
               status: "error",
               message: "Failed to #{action_name} portfolio",
               errors: ["Permission denied"],
             },
             status: :forbidden
    end
  end

  def portfolio_params
    params.require(:portfolio).permit(:title, :content)
  end
end
