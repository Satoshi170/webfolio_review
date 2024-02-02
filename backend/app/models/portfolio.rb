class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :goods, dependent: :delete_all
  has_many :comments, dependent: :delete_all

  enumerize :operation_status,
            in: { active: 0, maintenance: 1, inactive: 2 },
            default: :active,
            predicates: :true, scope: :true

  validates :title,
            presence: true,
            length: { maximum: 25 },
            on: [:create, :update]

  validates :content,
  presence: true,
  length: { maximum: 255 },
  on: [:create, :update]
end
