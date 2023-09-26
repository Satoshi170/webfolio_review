class Api::V1::PortfoliosController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :set_portfolio, only: [:show, :update, :destroy]

  def index
    portfolios = Portfolio.includes(user: { image_attachment: :blob }).all.order(updated_at: :desc)
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
               errors: @portfolio.errors,
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
               errors: @portfolio.errors,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @portfolio.destroy
    render json: {
             status: "success",
             message: "Portfolio deleted successfully",
           },
           status: :ok
  end

  private

  def set_portfolio
    @portfolio = Portfolio.find(params[:id])
  end

  def portfolio_params
    params.require(:portfolio).permit(:title, :content)
  end
end
