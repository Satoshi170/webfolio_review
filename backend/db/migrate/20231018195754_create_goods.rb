class CreateGoods < ActiveRecord::Migration[7.0]
  def change
    create_table :goods do |t|
      t.references :user, null: false, foreign_key: true
      t.references :portfolio, null: false, foreign_key: true

      t.timestamps
    end

    add_index :goods, [:user_id, :portfolio_id], unique: true
  end
end
