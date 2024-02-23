class Users::AuthResource
  include Alba::Resource

  root_key :user

  attributes :id, :name, :role

  attribute :image do |user|
    user.image_url
  end

  many :goods do
    attributes :article_id
  end

  many :comments do
    attributes :content, :updated_at

    attribute :tags do |comment|
      comment.tags.map(&:name)
    end

    one :article do
      attributes :id, :title
    end
  end
end
