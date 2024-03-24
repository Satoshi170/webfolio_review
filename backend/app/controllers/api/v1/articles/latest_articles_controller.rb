class Api::V1::Articles::LatestArticlesController < ApplicationController
  def index
    articles = Article.includes(user: { image_attachment: :blob }).
      order(updated_at: :desc).
      limit(10)

    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end
end
