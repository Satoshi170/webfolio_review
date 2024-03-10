class Articles::ArticleResource
  include Alba::Resource

  root_key :article

  attributes :id,
             :title,
             :content,
             :operation_status,
             :portfolio_site_url,
             :repository_url,
             :total_comments,
             :total_likes,
             :updated_at

  one :user, resource: Users::UserResource
end
