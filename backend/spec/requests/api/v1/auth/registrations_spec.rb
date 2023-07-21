require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  describe "POST /auth" do
    let(:valid_user_params) { attributes_for(:user, password_confirmation: :password) }
    let(:existing_user_params) do
      attributes_for(:user,
        email: "existing@example.com",
        password_confirmation: :password)
    end
    let(:mismatched_password_params) do
      attributes_for(:user,
        password: "password1",
        password_confirmation: "password2")
    end
    let(:invalid_params) do
      {
        email: "test@example.com",
        password: "password",
        password_confirmation: "password",
        invalid_param: "invalid",
      }
    end

    context "有効なパラメータが指定された場合" do
      it "新しいユーザーを作成" do
        post "/api/v1/auth", params: { registration: valid_user_params }
        expect(response).to have_http_status(:success)
        expect(response.body).to include('"status":"success"')
        expect(response.body).to include(valid_user_params[:email])
      end
    end

    context "無効なパラメータが指定された場合" do
      context "すでに登録されているメールアドレスを用いて新しいユーザーを作成しようとした場合" do
        before do
          create(:user, email: existing_user_params[:email])
        end

        it "エラーが発生する" do
          post "/api/v1/auth", params: { registration: existing_user_params }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).not_to include('"status":"success"')
          expect(response.body).to include('"status":"error"')
          expect(response.body).to include("Email has already been taken")
        end
      end

      context "パスワードとパスワード確認が一致しない場合" do
        it "エラーが発生する" do
          post "/api/v1/auth", params: { registration: mismatched_password_params }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).not_to include('"status":"success"')
          expect(response.body).to include('"status":"error"')
          expect(response.body).to include("Password confirmation doesn't match Password")
        end
      end

      context "ストロングパラメータ以外のパラメータが指定された場合" do
        it "未知のパラメータを無視し新しいユーザーを作成" do
          post "/api/v1/auth", params: { registration: invalid_params }

          expect(response).to have_http_status(:success)
          expect(response.body).to include('"status":"success"')
          expect(response.body).not_to include(invalid_params[:invalid_param])
        end
      end
    end
  end

  describe "DELETE /auth" do
    let!(:user) { create(:user) }
    let!(:other_user) do
      create(:user,
        email: "test@otheruser.com",
        password: "other_user_password")
    end

    before do
      sign_in({ email: user.email, password: user.password })
    end

    context "認証済みユーザーが自分のアカウントを削除する場合" do
      it "アカウントが削除されること" do
        token = response.headers.slice('client', 'uid', 'token-type', 'access-token')
        delete_auth(token)
        expect(response).to have_http_status(:success)
        expect(response.body).to include("Account with UID '#{user.email}' has been destroyed")
      end
    end

    context "認証情報がない場合" do
      it "削除に失敗しエラーが発生する" do
        delete_auth

        expect(response).to have_http_status(:unauthorized)
        expect(response.body).not_to include('"status":"success"')
        expect(response.body).to include("You need to sign in or sign up before continuing.")
      end
    end
  end

  describe "PATCH /auth" do
    let!(:user) { create(:user) }
    let(:new_params) { { name: "newname" } }
    let(:invalid_params) { { name: "newname", invalid_param: "invalid" } }

    before do
      sign_in({ email: user.email, password: user.password })
    end

    context "有効なパラメータが指定された場合" do
      it "ユーザの情報が更新されること" do
        patch "/api/v1/auth", headers: headers, params: new_params.to_json
        expect(response).to have_http_status(:success)
        expect(response.body).to include('"status":"success"')
        user.reload
        expect(user.name).to eq(new_params[:name])
      end
    end

    context "ストロングパラメータ以外のパラメータが指定された場合" do
      it "未知のパラメータを無視しユーザー情報を更新" do
        patch "/api/v1/auth", headers: headers, params: invalid_params.to_json
        expect(response).to have_http_status(:success)
        expect(response.body).to include('"status":"success"')
        expect(response.body).not_to include(invalid_params[:invalid_param])
        user.reload
        expect(user.name).to eq(new_params[:name])
      end
    end
  end

  def delete_auth(headers = {})
    delete "/api/v1/auth", headers: headers
  end
end
