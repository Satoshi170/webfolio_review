FactoryBot.define do
  factory :portfolio do
    title { "testTitle" }
    content { "testContent" }
    operation_status { "active" }
    portfolio_site_url { "http://example.com" }
    user
  end
end
