class AddPortfolioSiteUrlToPortfolios < ActiveRecord::Migration[7.0]
  def change
    add_column :portfolios, :portfolio_site_url, :string, null: false
  end
end
