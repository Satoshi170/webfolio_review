class Articles::UserArticleResource
  include Alba::Resource

  attribute :user do |resource|
    Users::UserResource.new(resource).serializable_hash
  end

  many :articles, resource: Articles::ArticleResource
end
