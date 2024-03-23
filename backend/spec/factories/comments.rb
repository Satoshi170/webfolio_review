FactoryBot.define do
  factory :comment do
    user { nil }
    article { nil }
    content { Faker::Lorem.paragraph(sentence_count: 5).truncate(255) }

    transient do
      tags { [] }
    end

    after(:create) do |comment, evaluator|
      evaluator.tags.each do |tag|
        comment.tags << tag
      end
    end
  end
end
