class Me::CommentResource
  include Alba::Resource

  attributes :id, :content, :updated_at

  attribute :tags do |comment|
    comment.tags.map(&:name)
  end

  one :article do
    attributes :id, :title
  end
end
