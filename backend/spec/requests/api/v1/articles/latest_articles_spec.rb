require 'rails_helper'

RSpec.describe "Api::V1::Articles::LatestArticles", type: :request do
  let(:user) { create(:user) }
  let!(:article1) { create(:article, user: user, updated_at: 1.day.ago) }
  let!(:article2) { create(:article, user: user, updated_at: 2.days.ago) }
  let!(:article3) { create(:article, user: user, updated_at: 3.days.ago) }
  let!(:article4) { create(:article, user: user, updated_at: 4.days.ago) }

  describe "GET /latest_articles" do
    it "最新三件のarticleのみ返却する" do
      get "/api/v1/latest_articles"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(3)

      ids = json_response.map { |article| article["id"] }
      expected_ids = [article1, article2, article3].map(&:id)

      expect(ids).to match_array(expected_ids)
    end
  end
end
