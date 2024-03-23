FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence(word_count: 3).truncate(25) }
    content { Faker::Lorem.paragraph(sentence_count: 5).truncate(255) }
    operation_status { "active" }
    portfolio_site_url { Faker::Internet.url }
    repository_url { Faker::Internet.url }
    user { nil }
  end
end