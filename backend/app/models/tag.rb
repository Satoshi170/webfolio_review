class Tag < ApplicationRecord
  has_many :comments_tags, dependent: :delete_all
  has_many :comments, through: :comments_tags
end
