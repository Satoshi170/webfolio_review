FactoryBot.define do
  factory :article do
    title { Faker::Lorem.sentence(word_count: 11).truncate(75) }
    content { Faker::Lorem.paragraph(sentence_count: 5).truncate(255) }
    operation_status { Article.operation_status.values.sample }
    portfolio_site_url { Faker::Internet.url }
    repository_url { Faker::Internet.url }
    user { nil }
  end
end
