class AddOnDeleteCascadeToCommentsTags < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :comments_tags, :comments
    remove_foreign_key :comments_tags, :tags

    add_foreign_key :comments_tags, :comments, on_delete: :cascade
    add_foreign_key :comments_tags, :tags, on_delete: :cascade
  end
end
