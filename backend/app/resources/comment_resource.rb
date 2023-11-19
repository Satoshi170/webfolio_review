class CommentResource
  include Alba::Resource

  root_key :good

  attributes :id, :content, :updated_at

  one :user, resource: UserWithoutGoodsResource
end
