class Api::V1::Me::LikedArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    articles = current_api_v1_user.liked_articles
    if articles.empty?
      render json: [],
             status: :ok
    else
      articles = current_api_v1_user.liked_articles
      render json: Articles::ArticleResource.new(articles).serializable_hash,
             status: :ok
    end
  end
end
