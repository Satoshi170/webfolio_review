class ChangeForeignKeyForGoods < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :goods, :users
    remove_foreign_key :goods, :portfolios
    add_foreign_key :goods, :users, on_delete: :cascade
    add_foreign_key :goods, :portfolios, on_delete: :cascade
  end
end
