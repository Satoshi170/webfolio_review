class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :article
  has_many :comments_tags
  has_many :tags, through: :comments_tags

  validates :content,
  presence: true,
  length: { maximum: 255 },
  on: [:create, :update]
end
