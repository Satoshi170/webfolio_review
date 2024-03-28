include FactoryBot::Syntax::Methods

user1 = create(:user, name: "Satoshi170")
article1 = create(:article,
  title: "ポートフォリオを共有できるポートフォリオを作成しました!",
  content: "未経験エンジニア同士がポートフォリオを共有できるWebサイトを作成しました!",
  operation_status: "active",
  portfolio_site_url: "https://webfolio-review.com/",
  repository_url: "https://github.com/Satoshi170/webfolio_review",
  user: user1
)

users = create_list(:user, 10)

users.each do |user|
  create(:good, user: user, article: article1)
end

articles = Array.new(50) do
  create(:article, user: users.sample)
end

comments = Array.new(100) do
  tags = Tag.all.sample(rand(0..2))
  create(:comment, user: users.sample, article: articles.sample, tags: tags)
end

users.each do |user|
  good_articles = articles.sample(rand(50))
  good_articles.each do |article|
    create(:good, user: user, article: article)
  end
end
