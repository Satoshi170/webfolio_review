class Portfolios::UserPortfolioResource
  include Alba::Resource

  attribute :user do |resource|
    UserWithoutGoodsResource.new(resource).serializable_hash
  end

  many :portfolios, resource: PortfolioResource
end
