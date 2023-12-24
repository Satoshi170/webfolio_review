class UserResource
  include Alba::Resource

  root_key :user

  attributes :id, :name, :role

  attribute :image do |user|
    user.image_url
  end

  many :goods do
    attributes :portfolio_id
  end

  many :comments do
    attributes :content, :updated_at

    many :tags, resource: TagResource
    one :portfolio do
      attributes :id, :title
    end
  end
end
