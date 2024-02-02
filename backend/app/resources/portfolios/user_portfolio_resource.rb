class Portfolios::UserPortfolioResource
  include Alba::Resource

  attribute :user do |resource|
    Users::UserResource.new(resource).serializable_hash
  end

  many :portfolios, resource: Portfolios::PortfolioResource
end
