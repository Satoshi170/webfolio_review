require 'rails_helper'

RSpec.describe "Api::V1::Portfolios", type: :request do
  let!(:user) { create(:user) }

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
    let(:valid_portfolio_params) do
      { title: "testTitle", content: "testContent" }
    end
    let(:invalid_portfolio_params) { valid_portfolio_params.merge(title: "") }

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

  describe "GET /portfolios/:id" do
    let!(:portfolio) { create(:portfolio, user: user) }
    context "指定されたidのportfolioが存在する時" do
      it "そのportfolioの情報を返却する" do
        get "/api/v1/portfolios/#{portfolio.id}"

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).to eq("success")
        expect(json_response["data"]["id"]).to eq(portfolio.id)
      end
    end
  end

  describe "PATCH /portfolios/:id" do
    let!(:portfolio) { create(:portfolio, user: user) }
    let(:new_params) { { title: "PatchTitle", content: "PatchContent" } }

    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

      context "有効なパラメータが指定された場合" do
        it "portfolioの情報が更新されること" do
          patch "/api/v1/portfolios/#{portfolio.id}", params: { portfolio: new_params },
                                                      headers: auth_headers

          expect(response).to have_http_status(:success)
          portfolio.reload
          expect(portfolio.title).to eq(new_params[:title])
          expect(portfolio.content).to eq(new_params[:content])
        end
      end

      context "無効なパラメータが指定された場合" do
        let(:toolong_title_portfolio_params) { new_params.merge(title: "") }
        it "portfolioの情報が更新されないこと" do
          expect do
            patch "/api/v1/portfolios/#{portfolio.id}",
            params: { portfolio: toolong_title_portfolio_params }, headers: auth_headers
          end.not_to change { Portfolio.find(portfolio.id).attributes }

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["status"]).to eq("error")
        end
      end

      context "ストロングパラメータ以外のパラメータが指定された場合" do
        let(:invalid_portfolio_params) { new_params.merge(invalid_param: "invalid") }
        it "未知のパラメータを無視しユーザー情報を更新" do
          patch "/api/v1/portfolios/#{portfolio.id}", params: { portfolio: new_params },
                                                      headers: auth_headers

          expect(response).to have_http_status(:success)
          portfolio.reload
          expect(portfolio.title).to eq(new_params[:title])
          expect(portfolio.content).to eq(new_params[:content])
          expect(portfolio.attributes).not_to have_key('invalid')
        end
      end
    end

    context "サインアウト状態の時" do
      it "401エラーが発生しデータベースに反映されない" do
        expect do
          patch "/api/v1/portfolios/#{portfolio.id}", params: { portfolio: new_params }
        end.not_to change { Portfolio.find(portfolio.id).attributes }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /portfolios/:id" do
    let!(:portfolio) { create(:portfolio, user: user) }

    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }
      it "削除に成功する" do
        delete "/api/v1/portfolios/#{portfolio.id}", headers: auth_headers

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).to eq("success")
        expect(Portfolio.exists?(portfolio.id)).to be_falsey
      end
    end

    context "サインアウト状態の時" do
      it "削除に失敗しエラーが発生する" do
        delete "/api/v1/portfolios/#{portfolio.id}"

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).not_to eq("success")
        expect(Portfolio.exists?(portfolio.id)).to be_truthy
      end
    end
  end
end
