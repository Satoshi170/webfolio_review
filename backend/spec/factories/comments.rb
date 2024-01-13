FactoryBot.define do
  factory :comment do
    user { nil }
    portfolio { nil }
    content { "MyString" }
    tag_ids { nil }
  end
end
