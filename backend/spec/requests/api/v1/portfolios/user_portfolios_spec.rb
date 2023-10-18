require 'rails_helper'

RSpec.describe "Api::V1::Portfolios::UserPortfolios", type: :request do
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }
  let!(:user1_portfolios) { create_list(:portfolio, 3, user: user1) }
  let!(:user2_portfolios) { create_list(:portfolio, 2, user: user2) }

  describe "GET /user_portfolios" do
    it "user_idをuser1.idでリクエストしたときuser1_portfoliosしか含まれていない" do
      get "/api/v1/user_portfolios", params: { user_id: user1.id }

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["data"].map { |portfolio| portfolio["user"]["id"] }).to all(eq(user1.id))
    end
  end
end
