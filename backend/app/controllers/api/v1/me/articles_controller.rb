class Api::V1::Me::ArticlesController < ApplicationController
  before_action :authenticate_api_v1_user!, only: [:index]

  def index
    articles = current_api_v1_user.articles
    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end
end
