require 'rails_helper'

RSpec.describe Portfolio, type: :model do
  describe "validation" do
    describe "title" do
      it "titleが存在する必要がある" do
        portfolio = Portfolio.new(title: nil)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:title]).to include("can't be blank")
      end

      it "titleの長さは25文字以内である必要がある" do
        portfolio = Portfolio.new(title: 'a' * 26)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:title]).to include("is too long (maximum is 25 characters)")
      end
    end

    describe "content" do
      it "contentが存在する必要がある" do
        portfolio = Portfolio.new(content: nil)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:content]).to include("can't be blank")
      end

      it "contentの長さは255文字以内である必要がある" do
        portfolio = Portfolio.new(content: 'a' * 256)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:content]).to include("is too long (maximum is 255 characters)")
      end
    end

    describe "operation_status" do
      it "operation_statusは範囲内の数値である必要がある" do
        invalid_operation_status = 3
        portfolio = Portfolio.new(operation_status: invalid_operation_status)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:operation_status]).to include("is not included in the list")
      end
    end

    describe "portfolio_site_url" do
      it "portfolio_site_urlが存在する必要がある" do
        portfolio = Portfolio.new(portfolio_site_url: nil)
        expect(portfolio).not_to be_valid
        expect(portfolio.errors[:portfolio_site_url]).to include("can't be blank")
      end
    end
  end
end
