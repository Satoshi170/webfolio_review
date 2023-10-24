class UserResource
  include Alba::Resource

  root_key :user

  attributes :id, :name

  attribute :image do |user|
    user.image_url
  end

  many :goods do
    attributes :portfolio_id
  end

end
