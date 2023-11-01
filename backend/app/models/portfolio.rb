class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :goods, dependent: :delete_all

  validates :title,
            presence: true,
            length: { maximum: 25 },
            on: [:create, :update]

  validates :content,
  presence: true,
  length: { maximum: 255 },
  on: [:create, :update]
end
