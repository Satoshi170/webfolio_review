class Api::V1::Articles::LatestArticlesController < ApplicationController
  def index
    articles = Article.includes(:goods, :comments, user: { image_attachment: :blob }).
      order(updated_at: :desc).
      limit(3)

    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end
end
