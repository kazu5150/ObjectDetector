# 🔍 物体判別アプリ (ObjectDetector)

AI（OpenAI GPT-4o-mini）を使用して、スマートフォンのカメラで撮影した物体を自動識別するReact Nativeアプリです。

## 📱 アプリの機能

- 📷 **カメラ撮影**: スマートフォンのカメラで写真を撮影
- 🖼️ **ギャラリー選択**: 端末内の既存画像から選択
- 🤖 **AI解析**: OpenAI GPT-4o-miniが物体を識別・説明
- 🇯🇵 **日本語対応**: 解析結果を日本語で表示
- 📱 **クロスプラットフォーム**: iOS・Android両対応

## 🚀 初心者向け：アプリ開発・実行手順

### 📋 事前準備

#### 1. 必要なソフトウェアのインストール

**Node.js のインストール**
```bash
# Node.js 18以上が必要です
# https://nodejs.org/ からダウンロードしてインストール
node --version  # バージョン確認
```

**Expo CLI のインストール**
```bash
npm install -g @expo/cli
```

**Git のインストール**
```bash
# https://git-scm.com/ からダウンロードしてインストール
git --version  # バージョン確認
```

#### 2. 開発用アプリのインストール

**スマートフォンに Expo Go をインストール**
- iOS: App Store で「Expo Go」を検索してインストール
- Android: Google Play で「Expo Go」を検索してインストール

### 💻 プロジェクトのセットアップ

#### 1. リポジトリのクローン
```bash
git clone https://github.com/your-username/ObjectDetector.git
cd ObjectDetector
```

#### 2. 依存関係のインストール
```bash
npm install
```

#### 3. 環境変数の設定

**OpenAI APIキーの取得**
1. [OpenAI Platform](https://platform.openai.com/) にアクセス
2. アカウント作成・ログイン
3. [API Keys](https://platform.openai.com/api-keys) ページでAPIキーを生成
4. 生成されたAPIキーをコピー

**環境変数ファイルの作成**
```bash
# .env.example をコピーして .env ファイルを作成
cp .env.example .env
```

**.env ファイルの編集**
```bash
# .env ファイルを開いて、APIキーを設定
EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-your-actual-api-key-here
```

⚠️ **重要**: `.env`ファイルは絶対に他人と共有したり、GitHubにアップロードしないでください！

### 🏃‍♂️ アプリの起動・実行

#### 1. 開発サーバーの起動
```bash
npm start
# または
npx expo start
```

#### 2. スマートフォンでアプリを開く

**Expo Goを使用する場合（推奨・初心者向け）**
1. スマートフォンでExpo Goアプリを開く
2. ターミナルに表示されるQRコードをスキャン
3. アプリが自動的に起動

**iOS シミュレーター（Macのみ）**
```bash
npm run ios
```

**Android エミュレーター**
```bash
npm run android
```

### 🛠️ 開発のポイント

#### コードの編集
- メインのコードは `app/(tabs)/index.tsx` にあります
- 保存すると自動的にアプリがリロードされます
- エラーが出た場合は、ターミナルやExpo Goアプリで確認できます

#### よくあるエラーと対処法

**1. APIキー関連のエラー**
```
解析に失敗しました。ネットワーク接続やAPIキーを確認してください。
```
→ `.env`ファイルのAPIキーが正しく設定されているか確認

**2. カメラ権限のエラー**
```
カメラへのアクセス権限が必要です
```
→ スマートフォンの設定でExpo Goアプリにカメラアクセスを許可

**3. 依存関係のエラー**
```bash
# node_modules を削除して再インストール
rm -rf node_modules
npm install
```

**4. Metroサーバーのエラー**
```bash
# キャッシュをクリアして再起動
npx expo start --clear
```

### 📂 プロジェクト構造

```
ObjectDetector/
├── app/                    # アプリの画面
│   ├── (tabs)/
│   │   └── index.tsx      # メイン画面（物体識別機能）
│   └── _layout.tsx        # アプリ全体のレイアウト
├── components/            # 再利用可能なコンポーネント
├── constants/             # 定数（色など）
├── assets/               # 画像・フォントなどの静的ファイル
├── .env                  # 環境変数（APIキーなど）※非公開
├── .env.example          # 環境変数テンプレート
├── package.json          # プロジェクト設定・依存関係
└── README.md            # このファイル
```

## 🔧 カスタマイズ

### UI の変更
- `app/(tabs)/index.tsx` でボタンの色やレイアウトを変更可能
- `constants/Colors.ts` でアプリ全体の色設定を変更可能

### AI プロンプトの変更
- `analyzeImage` 関数内のテキストを変更することで、AIの回答スタイルを調整可能

### 新機能の追加
- 履歴機能
- 音声読み上げ機能
- 多言語対応
- オフライン機能

## 🚀 本番リリース

### iOS App Store
```bash
# EAS Build を使用
npm install -g @expo/cli
eas build --platform ios
```

### Google Play Store
```bash
# EAS Build を使用
eas build --platform android
```

詳細は[Expo Documentation](https://docs.expo.dev/distribution/introduction/)を参照

## 🛟 サポート・参考資料

### 公式ドキュメント
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

### よく使うコマンド
```bash
npm start                 # 開発サーバー起動
npm run android          # Android エミュレーター
npm run ios              # iOS シミュレーター
npm run web              # ウェブブラウザー
npm run lint             # コード品質チェック
npm install              # 依存関係のインストール
```

### トラブルシューティング
1. エラーメッセージをよく読む
2. ターミナルとExpo Goアプリの両方でエラーを確認
3. Google/Stack Overflowでエラーメッセージを検索
4. [Expo Discord](https://chat.expo.dev) で質問

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

Issue や Pull Request をお待ちしています！

---

**初回起動時の手順まとめ**
1. Node.js, Expo CLI, Git をインストール
2. リポジトリをクローン: `git clone [URL]`
3. 依存関係をインストール: `npm install`
4. OpenAI APIキーを取得
5. `.env.example` を `.env` にコピーしてAPIキーを設定
6. アプリを起動: `npm start`
7. Expo Go でQRコードをスキャン

何か問題があれば Issue を作成してください！ 🚀
