class GoodResource
  include Alba::Resource

  root_key :good

  one :user, resource: UserResource
  one :portfolio, resource: PortfolioResource
end
