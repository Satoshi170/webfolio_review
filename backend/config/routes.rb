Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get :health_check, to: "health_check#index"
      get :meta_data, to: "meta_data#show"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/devise_sessions"
      }

      namespace :auth do
        devise_scope :api_v1_user do
          post "/guest/sign_in", to: 'guest_sessions#create'
          resources :sessions, only: [:index]
        end
      end

      scope module: "portfolios" do
        resources :portfolios do
          resource :goods, only: [:create, :destroy]
          resources :comments, only: [:create, :update, :destroy]
        end
        resources :user_portfolios, only: [:index]
        resources :latest_portfolios, only: [:index]
        resources :popular_portfolios, only: [:index]
      end
    end
  end
end
