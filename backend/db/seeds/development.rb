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

users = create_list(:user, 30)

users.each do |user|
  create(:good, user: user, article: article1)
end

sample_articles = [
  {title: "フリーランサーのためのマッチングプラットフォーム", content: "フリーランスのエンジニアとクライアントを繋ぐ、新しいマッチングサイトを立ち上げました！"},
  {title: "オンライン学習の新時代", content: "自宅で学べる、カスタマイズ可能なオンライン学習プラットフォームを開発しました。"},
  {title: "ゲーマーのためのコミュニティサイト", content: "最新のゲーム情報やレビューを共有できる、ゲーマー専用のコミュニティサイトです。"},
  {title: "持続可能な生活を支援するアプリ", content: "エコフレンドリーな生活を実践するためのヒントやアイデアを提供するアプリを開発しました。"},
  {title: "自炊をサポートするレシピ共有サイト", content: "忙しいあなたのために、簡単で健康的なレシピを共有するウェブサイトを作りました。"},
  {title: "写真愛好家のためのポートフォリオサイト", content: "写真家やアマチュアが自分の作品を展示できるポートフォリオサイトを立ち上げました。"},
  {title: "地域コミュニティを繋ぐプラットフォーム", content: "地元のイベントや活動を発見し、参加できるコミュニティプラットフォームを作成しました。"},
  {title: "プログラミング学習者のためのチュートリアルサイト", content: "プログラミング初心者向けに、わかりやすいチュートリアルとガイドを提供するサイトです。"},
  {title: "健康管理を助けるトラッキングアプリ", content: "日々の運動量や摂取カロリーを記録し、健康管理をサポートするアプリを開発しました。"},
  {title: "旅行者のためのガイドブックサイト", content: "世界中の隠れた名所や旅行のヒントを共有する旅行ガイドサイトを立ち上げました。"},
  {title: "個人投資家向けの金融情報プラットフォーム", content: "株式や仮想通貨の最新情報を提供し、投資判断を支援するプラットフォームです。"},
  {title: "独立した音楽クリエイターのための配信サイト", content: "独立したアーティストが自分の音楽を公開・販売できるオンラインプラットフォームを作りました。"},
  {title: "エコロジー活動を支援する情報サイト", content: "環境保護活動やエコロジーに関する情報を共有するウェブサイトを開設しました。"},
  {title: "手作りアイテムのためのオンラインマーケット", content: "ハンドメイドのアイテムを販売するクリエイターと、それらを探している人々を繋ぐマーケットプレイスです。"},
  {title: "ペットオーナーのためのケアガイドサイト", content: "犬や猫などのペットの飼育に役立つ情報やアドバイスを提供するウェブサイトを立ち上げました。"},
  {title: "ミニマリストの生活スタイルガイド", content: "シンプルな生活を目指すミニマリストのためのライフスタイルガイドとアイデアを提供します。"},
  {title: "フードトラッカーアプリ", content: "あなたの食生活を記録し、栄養バランスを改善するためのモバイルアプリを開発しました。"},
  {title: "デジタルデトックスを支援するツール", content: "スマートフォンやソーシャルメディアの使用時間を管理し、デジタルデトックスを助けるアプリです。"},
  {title: "プロジェクト管理ツール", content: "チームでのプロジェクト管理を効率化するためのオンラインツールを開発しました。"},
  {title: "言語交換のためのコミュニティプラットフォーム", content: "異文化交流を深め、新しい言語を学べるオンラインコミュニティを立ち上げました。"},
  {title: "アーティスト向けオンラインギャラリー", content: "アーティストが自分の作品を展示し、販売できるオンラインギャラリーを作成しました。"},
  {title: "スポーツ愛好家のための情報共有サイト", content: "最新のスポーツニュースやイベントを共有する、スポーツファンのためのサイトです。"},
  {title: "ビジネススキル向上のためのオンラインコース", content: "ビジネスの基礎から専門知識まで、様々なスキルを学べるオンラインコースを提供します。"},
  {title: "アウトドア活動のための情報プラットフォーム", content: "キャンプやハイキングなど、アウトドア活動に関するガイドと情報を提供するサイトです。"},
  {title: "ヨガとメディテーションのオンラインクラス", content: "自宅でヨガやメディテーションを学べるオンラインクラスを提供します。"},
  {title: "ローカルフードを紹介するウェブマガジン", content: "地域の特産品や隠れた美味しい食べ物を紹介するオンラインマガジンを立ち上げました。"},
  {title: "スタートアップ企業のためのリソースガイド", content: "新しいビジネスを始めるためのヒントやリソースを提供するウェブサイトです。"},
  {title: "ホームオフィスのためのインテリアガイド", content: "効率的で快適なホームオフィス環境を作るためのインテリアデザインのアイデアを共有します。"},
  {title: "子供向けの教育アプリ", content: "楽しく学べるゲームやアクティビティを提供する子供向けの教育アプリを開発しました。"},
  {title: "健康的な食生活のためのブログ", content: "栄養豊富なレシピや健康に良い食生活のコツを共有するブログを立ち上げました。"},
  {title: "個人向け財務管理アプリ", content: "収入と支出を管理し、貯蓄目標を達成するためのモバイルアプリを開発しました。"},
  {title: "フリーランスエンジニアのためのキャリアガイド", content: "フリーランスとして成功するためのヒントやリソースを提供するウェブサイトを作成しました。"},
  {title: "旅行写真を共有するオンラインコミュニティ", content: "世界中の美しい場所の写真を共有し、旅行のインスピレーションを得るためのサイトです。"},
  {title: "家庭菜園を始めるためのガイド", content: "自宅で野菜やハーブを育てるためのヒントやアドバイスを提供するウェブサイトを立ち上げました。"},
  {title: "趣味の手芸をサポートするコミュニティ", content: "手芸のプロジェクトやアイデアを共有できるオンラインコミュニティを作成しました。"},
  {title: "DIYプロジェクトのためのチュートリアルサイト", content: "自宅でできるDIYプロジェクトのアイデアと手順を提供するウェブサイトを立ち上げました。"},
  {title: "ペットの健康を支援するアドバイスサイト", content: "犬や猫などのペットの健康管理に役立つ情報やアドバイスを提供するサイトです。"},
  {title: "サステナブルな生活のための製品レビューサイト", content: "環境に優しい製品やサービスのレビューを提供するウェブサイトを開設しました。"},
  {title: "プログラミング言語の学習リソースサイト", content: "JavaScriptやPythonなどのプログラミング言語を効率的に学べるリソースを提供します。"},
  {title: "ファッション愛好家のためのスタイルガイド", content: "最新のファッショントレンドやスタイリングのヒントを提供するオンラインマガジンです。"},
  {title: "映画ファンのためのレビューとディスカッションサイト", content: "新旧の映画についてのレビューや議論を交わすことができるコミュニティサイトを立ち上げました。"},
  {title: "健康とフィットネスのためのオンラインフォーラム", content: "健康やフィットネスに関する情報交換やサポートを提供するオンラインフォーラムです。"},
  {title: "料理と食文化のオンラインマガジン", content: "世界中の料理や食文化についての記事とレシピを提供するオンラインマガジンを立ち上げました。"},
  {title: "デジタルアートとグラフィックデザインのポートフォリオサイト", content: "デジタルアーティストやグラフィックデザイナーが自分の作品を展示できるオンラインポートフォリオです。"},
  {title: "音楽制作と録音のためのリソースサイト", content: "音楽制作や録音に関するチュートリアルや機材レビューを提供するウェブサイトを立ち上げました。"},
  {title: "ボランティア活動を繋ぐプラットフォーム", content: "地域社会のためにボランティア活動に参加する方法や機会を提供するプラットフォームです。"}
]

articles = Array.new(50) do |index|
  article_data = sample_articles[index % sample_articles.size]
  create(:article,
    title: article_data[:title],
    content: article_data[:content],
    user: users.sample
  )
end

tags = Tag.all
sample_comments = [
  {content: "参考になります", tags: []},
  {content: "スマートフォンサイズの時にレイアウトが崩れています", tags: [tags[0]]},
  {content: "各ページへアクセスしにくいのでヘッダーにドロップダウンを作成してみてはどうでしょうか", tags: [tags[1]]},
  {content: "ページのローディング時間が長いようです。画像の最適化や遅延読み込みの導入を検討してはいかがでしょうか？", tags: [tags[0], tags[1]]},
]

articles.each do |article|
  sample_comments.each do |sample_comment|
    create(:comment,
      content: sample_comment[:content],
      user: users.sample,
      article: article,
      tags: sample_comment[:tags]
    )
  end
end

users.each do |user|
  good_articles = articles.sample(rand(50))
  good_articles.each do |article|
    create(:good, user: user, article: article)
  end
end
