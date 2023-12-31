Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ["https://webfolio-review.com", "webfolio-review.com", "http://localhost:8000"]

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
