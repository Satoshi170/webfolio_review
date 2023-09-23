class Portfolio < ApplicationRecord
  belongs_to :user

  validates :title,
            presence: { message: 'Title is required.' },
            length: { maximum: 25, too_long: 'Title is too long.' },
            on: [:create, :update]

  validates :content,
  presence: { message: 'Content is required.' },
  length: { maximum: 255, too_long: 'Content is too long.' },
  on: [:create, :update]
end
