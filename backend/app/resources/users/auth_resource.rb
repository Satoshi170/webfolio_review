class Users::AuthResource
  include Alba::Resource

  root_key :user

  attributes :id, :name, :role

  attribute :image do |user|
    user.image_url
  end
end
