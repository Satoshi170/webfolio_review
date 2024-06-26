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

      scope module: "articles" do
        resources :articles do
          resource :goods, only: [:create, :destroy] do
            get "check", on: :collection
          end
          resources :comments, only: [:index, :create, :update, :destroy]
        end

        resources :latest_articles, only: [:index]
        resources :popular_articles, only: [:index]
      end

      namespace :me do
        resources :liked_articles, only: [:index]
        resources :comments, only: [:index]
        resources :articles, only: [:index]
      end
    end
  end
end
