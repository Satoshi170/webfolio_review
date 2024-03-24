class Comments::CommentResource
  include Alba::Resource

  attributes :id, :content, :updated_at

  attribute :tags do |comment|
    comment.tags.sort_by(&:id).map(&:name)
  end

  one :user, resource: Users::UserResource
end
