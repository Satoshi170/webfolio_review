require 'rails_helper'

RSpec.describe "Api::V1::Portfolios", type: :request do
  let!(:user) { create(:user) }
  let(:valid_portfolio_params) do
    { title: "testTitle", content: "testContent" }
  end
  let(:invalid_portfolio_params) { valid_portfolio_params.merge(title: "") }

  describe "GET /portfolios" do
    let!(:portfolios) { create_list(:portfolio, 3, user: user) }
    it "すべてのportfolioを取得する" do
      get "/api/v1/portfolios"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response["status"]).to eq("success")
      expect(json_response["data"].length).to eq(3)
    end
  end

  describe "POST /portfolios" do
    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

      context "有効なパラメータが指定された場合" do
        it "新たなportfolioの作成に成功しデータベースに保存される" do
          expect do
            post "/api/v1/portfolios", params: { portfolio: valid_portfolio_params },
                                       headers: auth_headers
          end.to change(Portfolio, :count).by(1)

          expect(response).to have_http_status(:created)
          json_response = JSON.parse(response.body)
          expect(json_response).to eq({
            "status" => "success",
            "message" => "Portfolio created successfully",
          })

          created_portfolio = Portfolio.last
          expect(created_portfolio.title).to eq(valid_portfolio_params[:title])
          expect(created_portfolio.content).to eq(valid_portfolio_params[:content])
        end
      end

      context "無効なパラメータが指定された場合" do
        it "エラーが発生しデータベースに保存されない" do
          expect do
            post "/api/v1/portfolios", params: { portfolio: invalid_portfolio_params },
                                       headers: auth_headers
          end.to change(Portfolio, :count).by(0)

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["status"]).to eq("error")
        end
      end
    end

    context "サインアウト状態の時" do
      it "エラーが発生しデータベースに保存されない" do
        expect do
          post "/api/v1/portfolios", params: { portfolio: valid_portfolio_params }
        end.to change(Portfolio, :count).by(0)

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "errors" => ["You need to sign in or sign up before continuing."],
        })
      end
    end
  end
end
