class Api::V1::Articles::PopularArticlesController < ApplicationController
  def index
    articles = Article.includes(user: { image_attachment: :blob }).
      left_joins(:goods).
      group(:id).
      order('COUNT(goods.id) DESC').
      limit(20)

    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end
end
