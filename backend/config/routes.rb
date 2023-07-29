Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get :health_check, to: "health_check#index"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        sessions: "api/v1/auth/devise_sessions"
      }

      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end
