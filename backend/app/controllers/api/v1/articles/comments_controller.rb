class Api::V1::Articles::CommentsController < ApplicationController
  before_action :set_comment, only: [:update, :destroy]
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :authorize_user_for_comment!, only: [:update, :destroy]

  def index
    comments = Comment.where(article_id: params[:article_id]).
      includes(:tags, user: { image_attachment: :blob })
    render json: Comments::CommentResource.new(comments).serializable_hash,
           status: :ok
  end

  def create
    comment_params_with_user_and_article = comment_params.merge({
      user_id: current_api_v1_user.id,
      article_id: params[:article_id],
    })

    @comment = Comment.new(comment_params_with_user_and_article)

    if @comment.save
      render json: Comments::CommentResource.new(@comment).serializable_hash,
             status: :created
    else
      render json: {
               status: "error",
               message: "Failed to create comment",
               errors: @comment.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      update_tag_ids
      render json: Comments::CommentResource.new(@comment).serializable_hash,
             status: :ok
    else
      render json: {
               status: "error",
               message: "Failed to update comment",
               errors: @comment.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    render json: {
             status: "success",
             message: "Comment destoried successfully",
           },
           status: :ok
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def update_tag_ids
    return unless comment_params.key?(:tag_ids)

    if comment_params[:tag_ids].blank?
      @comment.tags.destroy_all
    end
  end

  def authorize_user_for_comment!
    unless current_api_v1_user == @comment.user
      render json: {
               status: "error",
               message: "Failed to #{action_name} comment",
               errors: ["Permission denied"],
             },
             status: :forbidden
    end
  end

  def comment_params
    params.require(:comment).permit(:content, tag_ids: [])
  end
end
