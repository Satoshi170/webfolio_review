class PortfolioResource
  include Alba::Resource

  root_key :portfolio

  attributes :id, :title, :content, :updated_at
  one :user, resource: UserResource
  many :goods do
    attributes :user_id
  end
end
