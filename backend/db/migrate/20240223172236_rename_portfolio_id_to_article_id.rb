class RenamePortfolioIdToArticleId < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :portfolio_id, :article_id
    rename_column :goods, :portfolio_id, :article_id
  end
end
