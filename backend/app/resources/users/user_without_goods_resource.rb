class Users::UserWithoutGoodsResource
  include Alba::Resource

  root_key :user

  attributes :id, :name

  attribute :image do |user|
    user.image_url
  end
end
