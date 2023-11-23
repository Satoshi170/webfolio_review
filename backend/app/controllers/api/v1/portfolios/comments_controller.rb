class Api::V1::Portfolios::CommentsController < ApplicationController
  before_action :set_comment, only: [:update, :destroy]
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :authorize_user_for_comment!, only: [:update, :destroy]

  def create
    comment_params_with_user_and_portfolio = comment_params.merge({
      user_id: current_api_v1_user.id,
      portfolio_id: params[:portfolio_id],
    })

    comment = Comment.new(comment_params_with_user_and_portfolio)

    if comment.save
      render json: {
               status: "success",
               message: "Comment created successfully",
             },
             status: :created
    else
      render json: {
               status: "error",
               message: "Failed to create comment",
               errors: comment.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: {
               status: "success",
               message: "Comment updated successfully",
             },
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
    @comment = Comment.find_by!(id: params[:id])
  end

  def authorize_user_for_comment!
    puts @comment.id,@comment.content
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
    params.require(:comment).permit(:content)
  end
end
