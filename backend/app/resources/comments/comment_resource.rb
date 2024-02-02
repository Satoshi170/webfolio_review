class Comments::CommentResource
  include Alba::Resource

  root_key :good

  attributes :id, :content, :updated_at

  many :tags, resource: Comments::TagResource
  one :user, resource: Users::UserWithoutGoodsResource
end
