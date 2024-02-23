require 'rails_helper'

RSpec.describe Article, type: :model do
  describe "validation" do
    describe "title" do
      it "titleが存在する必要がある" do
        article = Article.new(title: nil)
        expect(article).not_to be_valid
        expect(article.errors[:title]).to include("can't be blank")
      end

      it "titleの長さは25文字以内である必要がある" do
        article = Article.new(title: 'a' * 26)
        expect(article).not_to be_valid
        expect(article.errors[:title]).to include("is too long (maximum is 25 characters)")
      end
    end

    describe "content" do
      it "contentが存在する必要がある" do
        article = Article.new(content: nil)
        expect(article).not_to be_valid
        expect(article.errors[:content]).to include("can't be blank")
      end

      it "contentの長さは255文字以内である必要がある" do
        article = Article.new(content: 'a' * 256)
        expect(article).not_to be_valid
        expect(article.errors[:content]).to include("is too long (maximum is 255 characters)")
      end
    end

    describe "operation_status" do
      it "operation_statusは範囲内の数値である必要がある" do
        invalid_operation_status = 3
        article = Article.new(operation_status: invalid_operation_status)
        expect(article).not_to be_valid
        expect(article.errors[:operation_status]).to include("is not included in the list")
      end
    end

    describe "portfolio_site_url" do
      it "portfolio_site_urlが存在する必要がある" do
        article = Article.new(portfolio_site_url: nil)
        expect(article).not_to be_valid
        expect(article.errors[:portfolio_site_url]).to include("can't be blank")
      end
    end
  end
end
