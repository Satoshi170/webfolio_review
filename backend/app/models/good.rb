class Good < ApplicationRecord
  belongs_to :user
  belongs_to :article, counter_cache: :total_likes

  validates :user_id, uniqueness: { scope: :article_id }
end
