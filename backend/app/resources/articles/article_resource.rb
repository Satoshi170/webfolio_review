class Articles::ArticleResource
  include Alba::Resource

  root_key :article

  attributes :id,
             :title,
             :content,
             :operation_status,
             :portfolio_site_url,
             :repository_url,
             :updated_at

  one :user, resource: Users::UserResource

  many :goods do
    attributes :user_id
  end

  many :comments, resource: Comments::CommentResource
end
