class Api::V1::Articles::GoodsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :destroy, :check]

  def create
    good = Good.new(user_id: current_api_v1_user.id, article_id: params[:article_id])

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
    good = Good.find_by!(user_id: current_api_v1_user.id, article_id: params[:article_id])
    good.destroy
    render json: { status: 'success', message: 'Good destroyed' }, status: :ok
  end

  def check
    article_id = params[:article_id].to_i
    is_liked = current_api_v1_user.goods.exists?(article_id: article_id)
    render json: { is_liked: is_liked },
           status: :ok
  end
end
