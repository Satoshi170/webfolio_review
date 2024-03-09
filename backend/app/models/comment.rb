class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :article, counter_cache: :total_comments
  has_many :comments_tags, dependent: :delete_all
  has_many :tags, through: :comments_tags

  validates :content,
  presence: true,
  length: { maximum: 255 },
  on: [:create, :update]
end
