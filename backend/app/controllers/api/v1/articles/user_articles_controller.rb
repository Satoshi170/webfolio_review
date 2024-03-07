class Api::V1::Articles::UserArticlesController < ApplicationController
  before_action :set_user_id, only: [:index]

  def index
    user = User.includes(:articles, { articles: [:comments] }, image_attachment: :blob).
      find_by(id: @user_id)

    if user.nil?
      render json: { status: "error", message: "User can't find" }, status: :not_found
    else
      render json: Articles::UserArticleResource.new(user).serializable_hash,
             status: :ok
    end
  end

  private

  def set_user_id
    @user_id = params[:user_id]
  end
end
