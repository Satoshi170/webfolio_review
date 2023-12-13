class CommentsTag < ApplicationRecord
  belongs_to :comment
  belongs_to :tag
end
