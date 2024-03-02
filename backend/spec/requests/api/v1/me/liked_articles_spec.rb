require 'rails_helper'

RSpec.describe "Api::V1::Me::LikedArticles", type: :request do
  let(:user) { create(:user) }
  let!(:articles) { create_list(:article, 3, user: user) }
  let!(:goods) {}
  let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

  describe "GET /me/liked_articles" do
    context "user.goodsが[]の場合" do
      it "200ステータスコードを返し、レスポンスボディは[]である" do
        get "/api/v1/me/liked_articles", headers: auth_headers
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response).to be_empty
      end
    end

    context "user.goodsが[]でない場合" do
      before do
        articles.each do |article|
          create(:good, user: user, article: article)
        end
      end

      it "200ステータスコードを返し、レスポンスボディの配列の要素数はarticlesの数と一致する" do
        get "/api/v1/me/liked_articles", headers: auth_headers
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response.size).to eq(articles.size)
      end
    end
  end
end
