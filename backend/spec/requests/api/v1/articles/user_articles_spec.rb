require 'rails_helper'

RSpec.describe "Api::V1::Articles::UserArticles", type: :request do
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }
  let!(:user1_articles) { create_list(:article, 3, user: user1) }
  let!(:user2_articles) { create_list(:article, 2, user: user2) }

  describe "GET /user_articles" do
    describe "存在しないuser_idを指定した場合" do
      it "404ステータスコードを返す" do
        get "/api/v1/user_articles", params: { user_id: user1.id + 999 }
        expect(response).to have_http_status(:not_found)
      end
    end

    describe "存在するuser_idを指定した場合" do
      it "{ user_id: user1.id }でリクエストしたときuser1_articlesしか含まれていない" do
        get "/api/v1/user_articles", params: { user_id: user1.id }

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["data"]["articles"].map do |article|
                 article["user"]["id"]
               end).to all(eq(user1.id))
      end
    end
  end
end
