class Users::AuthResource
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

    attribute :tags do |comment|
      comment.tags.map(&:name)
    end

    one :portfolio do
      attributes :id, :title
    end
  end
end
