FactoryBot.define do
  factory :article do
    title { "testTitle" }
    content { "testContent" }
    operation_status { "active" }
    portfolio_site_url { "http://example.com" }
    repository_url { nil }
    user { nil }
  end
end
