class Api::V1::Portfolios::GoodsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :destroy]

  def create
    good = Good.new(user_id: current_api_v1_user.id, portfolio_id: params[:portfolio_id])

    if good.save
      render json: {
               status: "success",
               message: "Good created successfully",
             },
             status: :created
    else
      render json: {
               status: "error",
               message: "Failed to create good",
               errors: good.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    good = Good.find_by!(user_id: current_api_v1_user.id, portfolio_id: params[:portfolio_id])
    good.destroy
    render json: { status: 'success', message: 'Good destroyed' }, status: :ok
  end
end
