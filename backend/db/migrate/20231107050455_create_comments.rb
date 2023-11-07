class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: { on_delete: :cascade }
      t.references :portfolio, null: false, foreign_key: { on_delete: :cascade }
      t.string :content

      t.timestamps
    end
  end
end
