# Webfolio-Review

https://webfolio-review.com/

## 目次

- [Webfolio-Review とは](#webfolio-review-とは)
- [PR ポイント](#pr-ポイント)
- [使用技術](#使用技術)
- [インフラ構成図](#インフラ構成図)
- [今後の課題](#今後の課題)

---

## Webfolio-Review とは

このポートフォリオは、Web エンジニアとして未経験から転職を目指す方々に特化して開発しました。多くの場合、ポートフォリオは企業の評価のみを受ける形となりますが、そのような状況では UI のバグや改善が必要な点を抱えたまま企業に見られてしまう可能性が高いです。そのため、このプロジェクトでは同じ境遇の方々にも事前に評価していただくことを目的とし、結果としてより高品質なポートフォリオに仕上げられるように努力しています。

さらに、他人のポートフォリオを閲覧することで、新たな機能やデザインのアイデアを得ることができるため、相互作用を促進するプラットフォームとしても機能します。

## PR ポイント

- **SPA 方式の採用**: シングルページアプリケーション（SPA）方式を採用することで、ユーザー体験を向上させました。ページ遷移の速度が向上し、より滑らかなインタラクションが可能になりました。

- **Next.js 13（appDir）の採用**: 2023 年 5 月に安定版となった`appDir`を採用しました。新機能であり日本語の情報が非常に少なかったため、GitHub のコード検索や海外の掲示板を活用して実装を行いました。

- **ゲストログイン機能**: ユーザーがアプリケーションの主要な機能を簡単に試せるように、ゲストログイン機能を実装しました。

- **条件付きページ遷移**: ログイン状況に応じて、特定のページへのアクセス時に強制的に遷移する仕組みを実装しました。これにより、不正アクセスやバグの発生を防ぐことができました。

- **API レスポンスの最適化**: バックエンドで gem "alba"を用いて API レスポンスを整形しました。不必要なデータを削除することで、セキュリティ上の危険性を軽減しました。

- **デバウンスの導入**: いいね機能にデバウンスを導入しました。これにより、短時間の多重リクエストを減らし、データベースへの負荷を軽減しました。

- **テストの充実**: フロントエンドでは Jest を、バックエンドでは RSpec を使用して各機能に対するテストを実装しました。これにより、コードの堅牢性を確保し、バグの発見と修正が容易になりました。

- **単体テストによる関心の分離**: フロントエンドではほぼ全ての機能・コンポーネントに対して単体テストを実装しました。これにより、関心の分離が明確化され、コードの可読性が大幅に向上しました。

- **コード品質の確保**: フロントエンドでは ESLint と Prettier、バックエンドでは Rubocop を導入しました。これらのリンターとフォーマッターを用いることで、コードの可読性と一貫性を高め、開発効率を向上させました。

## 使用技術

### フロントエンド

- Next.js(13.4.6, appDir)
- TypeScript
- ChakraUI
- Jest

### バックエンド

- RailsAPI(7.0.5)
- NginX
- RSpec

### データベース

- MySQL

### CI/CD

- GitHub Actions

### その他

- Docker
- AWS

## インフラ構成図

![](images/aws_structure.svg)

## 今後の課題

- **コメント機能の実装**: 現状、サイト内で投稿者と連絡を取る手段がありません。単純なコメント機能は速やかに実装可能ですが、セキュリティとプライバシーの懸念から慎重に進めています。特に、不適切なコメントが公開されるリスクを考慮し、閉鎖的なコメント表示を検討中です。これが更なる機能、例えばチャットや通知機能の導入につながる可能性があります。

- **管理者機能の実装**: 現在、不適切な投稿を削除するにはデータベースを直接操作するしかありません。この運用は非効率であり、リスクも伴います。そのため、投稿の管理をより効率的かつ安全に行う管理者機能の実装を検討中です。具体的な方法としては、管理者専用のダッシュボードを同一アプリケーション内に設けるか、あるいはセキュリティを重視して独立した管理者用アプリケーションを開発するかの選択肢を評価しています。
