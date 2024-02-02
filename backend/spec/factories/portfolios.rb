FactoryBot.define do
  factory :portfolio do
    title { "testTitle" }
    content { "testContent" }
    operation_status { "active" }
    portfolio_site_url { "http://example.com" }
    repository_url { nil }
    user
  end
end
