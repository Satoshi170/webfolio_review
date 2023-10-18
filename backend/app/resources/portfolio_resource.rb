class PortfolioResource
  include Alba::Resource

  root_key :portfolio

  attributes :id, :title, :content, :updated_at
  one :user, resource: UserResource
end
