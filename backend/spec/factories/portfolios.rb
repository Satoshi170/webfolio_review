FactoryBot.define do
  factory :portfolio do
    title { "testTitle" }
    content { "testContent" }
    operation_status { "active" }
    user
  end
end
