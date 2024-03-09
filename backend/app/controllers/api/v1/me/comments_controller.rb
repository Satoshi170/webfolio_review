class Api::V1::Me::CommentsController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    comments = current_api_v1_user.comments.includes(:article, :tags)
    render json: Me::CommentResource.new(comments).serializable_hash,
           status: :ok
  end
end
