class Api::V1::Articles::PopularArticlesController < ApplicationController
  def index
    articles = Article.includes(:comments, user: { image_attachment: :blob }).
      left_joins(:goods).
      group(:id).
      order('COUNT(goods.id) DESC').
      limit(3)

    render json: Articles::ArticleResource.new(articles).serializable_hash,
           status: :ok
  end
end
