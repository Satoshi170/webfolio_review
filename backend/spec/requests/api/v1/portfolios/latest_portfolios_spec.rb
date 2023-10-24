require 'rails_helper'

RSpec.describe "Api::V1::Portfolios::LatestPortfolios", type: :request do
  let(:user) { create(:user) }
  let!(:portfolio1) { create(:portfolio, user: user, updated_at: 1.day.ago) }
  let!(:portfolio2) { create(:portfolio, user: user, updated_at: 2.days.ago) }
  let!(:portfolio3) { create(:portfolio, user: user, updated_at: 3.days.ago) }
  let!(:portfolio4) { create(:portfolio, user: user, updated_at: 4.days.ago) }

  describe "GET /latest_portfolios" do
    it "最新三件のportfolioのみ返却する" do
      get "/api/v1/latest_portfolios"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["data"].length).to eq(3)

      ids = json_response["data"].map { |portfolio| portfolio["id"] }
      expected_ids = [portfolio1, portfolio2, portfolio3].map(&:id)

      expect(ids).to match_array(expected_ids)
    end
  end
end
