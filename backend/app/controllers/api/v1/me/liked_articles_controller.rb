class Api::V1::Me::LikedArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    articles = current_api_v1_user.liked_articles
    if articles.empty?
      render json: {
               status: "success",
               message: "No goods found",
               data: [],
             },
             status: :ok
    else
      articles = current_api_v1_user.liked_articles
      render json: {
               status: "success",
               message: "Loaded articles",
               data: Articles::ArticleResource.new(articles).serializable_hash,
             },
             status: :ok
    end
  end
end
