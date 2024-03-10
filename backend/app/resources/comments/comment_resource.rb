class Comments::CommentResource
  include Alba::Resource

  attributes :id, :content, :updated_at

  attribute :tags do |comment|
    comment.tags.map(&:name)
  end

  one :user, resource: Users::UserResource
end
