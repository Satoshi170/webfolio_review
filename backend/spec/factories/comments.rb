FactoryBot.define do
  factory :comment do
    user { nil }
    article { nil }
    content { Faker::Lorem.paragraph(sentence_count: 5).truncate(255) }
    tag_ids { nil }
  end
end
