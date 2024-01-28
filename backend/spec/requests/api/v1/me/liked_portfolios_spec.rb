require 'rails_helper'

RSpec.describe "Api::V1::Me::LikedPortfolios", type: :request do
  let(:user) { create(:user) }
  let!(:portfolios) { create_list(:portfolio, 3, user: user) }
  let!(:goods) {}
  let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

  describe "GET /me/liked_portfolios" do
    context "user.goodsが[]の場合" do
      it "200ステータスコードを返し、dataは[]である" do
        get "/api/v1/me/liked_portfolios", headers: auth_headers
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["data"]).to be_empty
      end
    end

    context "test" do
      before do
        portfolios.each do |portfolio|
          create(:good, user: user, portfolio: portfolio)
        end
      end

      it "200ステータスコードを返し、dataの数はportfoliosの数と一致する" do
        get "/api/v1/me/liked_portfolios", headers: auth_headers
        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["data"].size).to eq(portfolios.size)
      end
    end
  end
end
