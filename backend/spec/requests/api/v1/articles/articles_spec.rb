require 'rails_helper'

RSpec.describe "Api::V1::Articles::Articles", type: :request do
  let!(:user) { create(:user) }

  describe "GET /articles" do
    let!(:article1) { create(:article, user: user) }
    let!(:article2) { create(:article, user: user) }
    let!(:article3) { create(:article, user: user) }

    it "すべてのarticleを返却する" do
      get "/api/v1/articles"

      expect(response).to have_http_status(:ok)
      json_response = JSON.parse(response.body)
      expect(json_response.length).to eq(3)
    end
  end

  describe "POST /articles" do
    let(:valid_article_params) do
      {
        title: "testTitle",
        content: "testContent",
        operation_status: "0",
        portfolio_site_url: "http://example.com",
        repository_url: "http://example.com",
      }
    end
    let(:invalid_article_params) { valid_article_params.merge(title: "") }
    let(:invalid_article_operation_status_params) do
      valid_article_params.merge(operation_status: 3)
    end

    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

      context "有効なパラメータが指定された場合" do
        it "新たなarticleの作成に成功しデータベースに保存される" do
          expect do
            post "/api/v1/articles", params: { article: valid_article_params },
                                     headers: auth_headers
          end.to change(Article, :count).by(1)

          expect(response).to have_http_status(:created)
          json_response = JSON.parse(response.body)
          expect(json_response).to eq({
            "status" => "success",
            "message" => "Article created successfully",
          })

          created_article = Article.last
          expect(created_article.title).to eq(valid_article_params[:title])
          expect(created_article.content).to eq(valid_article_params[:content])
        end
      end

      context "無効なパラメータが指定された場合" do
        context "operation_statusに不正な値が指定された場合" do
          it "エラーが発生しデータベースに保存されない" do
            expect do
              post "/api/v1/articles",
              params: { article: invalid_article_operation_status_params },
              headers: auth_headers
            end.to change(Article, :count).by(0)

            expect(response).to have_http_status(:unprocessable_entity)
          end
        end

        context "Modelレベルでバリデーションエラーが発生した場合" do
          it "エラーが発生しデータベースに保存されない" do
            expect do
              post "/api/v1/articles", params: { article: invalid_article_params },
                                       headers: auth_headers
            end.to change(Article, :count).by(0)

            expect(response).to have_http_status(:unprocessable_entity)
            json_response = JSON.parse(response.body)
            expect(json_response["status"]).to eq("error")
          end
        end
      end
    end

    context "サインアウト状態の時" do
      it "エラーが発生しデータベースに保存されない" do
        expect do
          post "/api/v1/articles", params: { article: valid_article_params }
        end.to change(Article, :count).by(0)

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response).to eq({
          "errors" => ["You need to sign in or sign up before continuing."],
        })
      end
    end
  end

  describe "GET /articles/:id" do
    let!(:article) { create(:article, user: user) }
    context "指定されたidのarticleが存在する時" do
      it "そのarticleの情報を返却する" do
        get "/api/v1/articles/#{article.id}"

        expect(response).to have_http_status(:ok)
        json_response = JSON.parse(response.body)
        expect(json_response["id"]).to eq(article.id)
      end
    end
  end

  describe "PATCH /articles/:id" do
    let!(:article) { create(:article, user: user) }
    let(:new_params) { { title: "PatchTitle", content: "PatchContent" } }

    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }

      context "有効なパラメータが指定された場合" do
        it "articleの情報が更新されること" do
          patch "/api/v1/articles/#{article.id}", params: { article: new_params },
                                                  headers: auth_headers

          expect(response).to have_http_status(:success)
          article.reload
          expect(article.title).to eq(new_params[:title])
          expect(article.content).to eq(new_params[:content])
        end
      end

      context "無効なパラメータが指定された場合" do
        let(:toolong_title_article_params) { new_params.merge(title: "") }
        it "articleの情報が更新されないこと" do
          expect do
            patch "/api/v1/articles/#{article.id}",
            params: { article: toolong_title_article_params }, headers: auth_headers
          end.not_to change { Article.find(article.id).attributes }

          expect(response).to have_http_status(:unprocessable_entity)
          json_response = JSON.parse(response.body)
          expect(json_response["status"]).to eq("error")
        end
      end

      context "ストロングパラメータ以外のパラメータが指定された場合" do
        let(:invalid_article_params) { new_params.merge(invalid_param: "invalid") }
        it "未知のパラメータを無視しユーザー情報を更新" do
          patch "/api/v1/articles/#{article.id}", params: { article: new_params },
                                                  headers: auth_headers

          expect(response).to have_http_status(:success)
          article.reload
          expect(article.title).to eq(new_params[:title])
          expect(article.content).to eq(new_params[:content])
          expect(article.attributes).not_to have_key('invalid')
        end
      end
    end

    context "サインアウト状態の時" do
      it "401エラーが発生しデータベースに反映されない" do
        expect do
          patch "/api/v1/articles/#{article.id}", params: { article: new_params }
        end.not_to change { Article.find(article.id).attributes }

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "DELETE /articles/:id" do
    let!(:article) { create(:article, user: user) }

    context "サインイン状態の時" do
      let(:auth_headers) { sign_in({ email: user.email, password: user.password }) }
      it "削除に成功する" do
        delete "/api/v1/articles/#{article.id}", headers: auth_headers

        expect(response).to have_http_status(:success)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).to eq("success")
        expect(Article.exists?(article.id)).to be_falsey
      end
    end

    context "サインアウト状態の時" do
      it "削除に失敗しエラーが発生する" do
        delete "/api/v1/articles/#{article.id}"

        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response["status"]).not_to eq("success")
        expect(Article.exists?(article.id)).to be_truthy
      end
    end
  end
end
