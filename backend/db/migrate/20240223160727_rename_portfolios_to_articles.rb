class RenamePortfoliosToArticles < ActiveRecord::Migration[7.0]
  def change
    rename_table :portfolios, :articles
  end
end
