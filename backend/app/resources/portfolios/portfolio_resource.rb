class Portfolios::PortfolioResource
  include Alba::Resource

  root_key :portfolio

  attributes :id, :title, :content, :updated_at

  one :user, resource: Users::UserWithoutGoodsResource

  many :goods do
    attributes :user_id
  end

  many :comments, resource: Comments::CommentResource
end
