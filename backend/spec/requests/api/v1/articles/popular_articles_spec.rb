RSpec.describe "Api::V1::Articles::PopularArticles", type: :request do
  let(:users) { create_list(:user, 3) }
  let(:articles) { create_list(:article, 4, user: users.first) }

  before do
    articles.first(3).each do |article|
      create(:good, user: users[0], article: article)
    end
    articles.first(2).each do |article|
      create(:good, user: users[1], article: article)
    end
    create(:good, article: articles[0], user: users[2])
  end

  describe "GET /popular_articles" do
    it "goodの配列の大きさが多い順に三件のarticleのみ返却する" do
      get "/api/v1/popular_articles"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["data"].length).to eq(3)

      ids = json_response["data"].map { |article| article["id"] }
      expected_ids = articles.first(3).map(&:id)

      expect(ids).to match_array(expected_ids)
    end
  end
end
