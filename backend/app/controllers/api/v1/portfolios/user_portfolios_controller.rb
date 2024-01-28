class Api::V1::Portfolios::UserPortfoliosController < ApplicationController
  before_action :set_user_id, only: [:index]

  def index
    user = User.includes(:portfolios, { portfolios: [:goods, :comments] }, image_attachment: :blob).
      find_by(id: @user_id)

    if user.nil?
      render json: { status: "error", message: "User can't find" }, status: :not_found
    else
      render json: {
               status: "success",
               message: "Loaded portfolios",
               data: Portfolios::UserPortfolioResource.new(user).serializable_hash,
             },
             status: :ok
    end
  end

  private

  def set_user_id
    @user_id = params[:user_id]
  end
end
