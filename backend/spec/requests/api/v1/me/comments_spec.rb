require 'rails_helper'

RSpec.describe "Api::V1::Me::Comments", type: :request do
  let(:user) { create(:user) }
  let!(:articles) { create_list(:article, 3, user: user) }
  let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

  describe "GET /me/comments" do
    before do
      articles.each do |article|
        create(:comment, user: user, article: article)
      end
    end

    it "200ステータスコードを返す" do
      get "/api/v1/me/comments", headers: auth_headers
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response.size).to eq(articles.size)
    end
  end
end
