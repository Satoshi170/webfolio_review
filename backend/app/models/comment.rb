class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :portfolio

  validates :content,
  presence: true,
  length: { maximum: 255 },
  on: [:create, :update]
end
