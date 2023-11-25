class PortfolioResource
  include Alba::Resource

  root_key :portfolio

  attributes :id, :title, :content, :updated_at

  one :user, resource: UserWithoutGoodsResource

  many :goods do
    attributes :user_id
  end

  many :comments, resource: CommentResource
end
