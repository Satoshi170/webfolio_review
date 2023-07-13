require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
  let(:valid_user_params) { attributes_for(:user) }
  let(:existing_user_params) { attributes_for(:user, email: "existing@example.com") }
  let(:mismatched_password_params) do
    attributes_for(:user,
      password: "password1",
      password_confirmation: "password2")
  end

  describe "POST /api/v1/auth" do
    context "有効なパラメータが指定された場合" do
      it "新しいユーザーを作成" do
        post "/api/v1/auth", params: valid_user_params

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
          post "/api/v1/auth", params: existing_user_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).not_to include('"status":"success"')
          expect(response.body).to include('"status":"error"')
          expect(response.body).to include("Email has already been taken")
        end
      end

      context "パスワードとパスワード確認が一致しない場合" do
        it "エラーが発生する" do
          post "/api/v1/auth", params: mismatched_password_params

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.body).not_to include('"status":"success"')
          expect(response.body).to include('"status":"error"')
          expect(response.body).to include("Password confirmation doesn't match Password")
        end
      end
    end
  end
end
