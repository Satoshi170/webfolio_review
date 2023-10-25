RSpec.describe "Api::V1::Portfolios::PopularPortfolios", type: :request do
  let(:users) { create_list(:user, 3) }
  let(:portfolios) { create_list(:portfolio, 4, user: users.first) }

  before do
    portfolios.first(3).each do |portfolio|
      create(:good, user: users[0], portfolio: portfolio)
    end
    portfolios.first(2).each do |portfolio|
      create(:good, user: users[1], portfolio: portfolio)
    end
    create(:good, portfolio: portfolios[0], user: users[2])
  end

  describe "GET /popular_portfolios" do
    it "goodの配列の大きさが多い順に三件のportfolioのみ返却する" do
      get "/api/v1/popular_portfolios"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["data"].length).to eq(3)

      ids = json_response["data"].map { |portfolio| portfolio["id"] }
      expected_ids = portfolios.first(3).map(&:id)

      expect(ids).to match_array(expected_ids)
    end
  end
end
