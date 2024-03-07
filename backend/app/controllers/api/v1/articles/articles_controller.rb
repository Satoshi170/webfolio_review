class Api::V1::Articles::ArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :set_article, only: [:show, :update, :destroy]
  before_action :authorize_user_for_article!, only: [:update, :destroy]

  def index
    articles = Article.includes(:comments, user: { image_attachment: :blob }).
      order(updated_at: :desc)

    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end

  def create
    @article = current_api_v1_user.articles.build(article_params)

    if @article.save
      render json: Articles::ArticleResource.new(@article).serializable_hash,
             status: :created
    else
      render json: {
               status: "error",
               message: "Failed to create article",
               errors: @article.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def show
    render json: Articles::ArticleResource.new(@article).serializable_hash,
           status: :ok
  end

  def update
    if @article.update(article_params)
      render json: {
               status: "success",
               message: "Article updated successfully",
             },
             status: :ok
    else
      render json: {
               status: "error",
               message: "Failed to update article",
               errors: @article.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    render json: {
             status: "success",
             message: "Article destoried successfully",
           },
           status: :ok
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def authorize_user_for_article!
    unless current_api_v1_user == @article.user
      render json: {
               status: "error",
               message: "Failed to #{action_name} article",
               errors: ["Permission denied"],
             },
             status: :forbidden
    end
  end

  def article_params
    params.require(:article).permit(
      :title,
      :content,
      :operation_status,
      :portfolio_site_url,
      :repository_url
    )
  end
end
