class Tag < ApplicationRecord
  has_many :comments_tags
  has_many :comments, through: :comments_tags
end
