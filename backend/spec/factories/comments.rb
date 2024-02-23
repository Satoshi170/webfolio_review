FactoryBot.define do
  factory :comment do
    user { nil }
    article { nil }
    content { "MyString" }
    tag_ids { nil }
  end
end
