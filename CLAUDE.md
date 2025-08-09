# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm start        # or npx expo start
npm run android  # Run on Android emulator
npm run ios      # Run on iOS simulator  
npm run web      # Run on web browser
```

**Code quality:**
```bash
npm run lint     # Run ESLint (expo lint)
```

**Project management:**
```bash
npm install              # Install dependencies
npm run reset-project    # Move starter code to app-example/ and create blank app/
```

## Architecture

This is an **Expo Router** React Native app using **file-based routing** with the new architecture enabled.

**Key architectural elements:**

- **Routing**: File-based routing via `expo-router` with typed routes enabled
- **Navigation**: Stack navigator for root layout, Tab navigator for main app sections
- **Theming**: Automatic light/dark theme support using `@react-navigation/native` themes
- **Components**: Reusable themed components in `/components` with platform-specific variants
- **State**: Uses React hooks pattern with custom hooks in `/hooks`

**Directory structure:**
- `app/` - File-based routes (main application screens)
- `app/(tabs)/` - Tab-based navigation group containing index and explore screens
- `components/` - Reusable UI components with `/ui` subfolder for platform-specific variants
- `constants/` - App constants like Colors
- `hooks/` - Custom React hooks including theme and color scheme management
- `assets/` - Static assets (images, fonts)

**Key patterns:**
- Path aliases: `@/*` maps to root directory
- Platform-specific files: `.ios.tsx` and `.tsx` variants for cross-platform components
- Themed components: ThemedText and ThemedView components that adapt to color scheme
- Haptic feedback: HapticTab component for enhanced mobile UX

**Configuration:**
- TypeScript with strict mode enabled
- ESLint with Expo configuration
- Expo SDK ~53 with React Native 0.79.5 and React 19
- New Architecture enabled in app.json

## Project Requirements

# 物体判別アプリ MVP要件定義書

## 1. プロジェクト概要

### 1.1 プロジェクト名
ObjectDetector（仮称）

### 1.2 プロジェクトの目的
ユーザーがスマートフォンのカメラで撮影した物体を、OpenAI GPT-5の画像解析機能を活用してリアルタイムで判別・情報提供するモバイルアプリケーションの開発

### 1.3 対象プラットフォーム
- iOS（iPhone）
- Android

### 1.4 開発フレームワーク
- React Native (Expo SDK)
- TypeScript
- Expo Managed Workflow

## 2. ビジネス要件

### 2.1 ターゲットユーザー
- 日常生活で物体の名前や情報を知りたい一般ユーザー
- 学習目的で物体認識を活用したい学生
- 視覚障害者の生活支援ツールとしての利用者

### 2.2 価値提案
- 手軽な物体識別による日常生活の利便性向上
- 教育・学習支援ツールとしての活用
- バリアフリー対応による社会貢献

## 3. 機能要件（MVP）

### 3.1 必須機能

#### 3.1.1 カメラ機能
- 写真撮影機能（シンプルな撮影ボタンのみ）
- ギャラリーからの画像選択

#### 3.1.2 画像解析機能
- 撮影/選択した画像をOpenAI GPT-5 APIに送信
- 物体識別結果の受信・表示

#### 3.1.3 結果表示機能
- 識別結果のテキスト表示
- 「もう一度撮影」ボタン

#### 3.1.4 基本UI
- 撮影画面（カメラビューまたは画像選択）
- 結果表示画面
- シンプルで直感的な2画面構成

### 3.2 除外機能（将来の機能）
- リアルタイムカメラプレビュー
- カメラ切り替え・フラッシュ制御
- 履歴機能
- 設定画面
- 音声読み上げ機能
- 多言語対応
- オフライン機能

## 4. 非機能要件

### 4.1 パフォーマンス要件
- 画像解析レスポンス時間：5秒以内
- アプリ起動時間：3秒以内
- カメラプレビューのフレームレート：30fps以上

### 4.2 可用性要件
- アプリケーション稼働率：95%以上
- API接続エラー時の適切なエラーハンドリング

### 4.3 セキュリティ要件
- 撮影画像の一時的な保存（解析後は削除）
- OpenAI API キーの安全な管理
- ユーザーデータの最小限の収集

### 4.4 互換性要件
- iOS: 13.0以上
- Android: API Level 21以上（Android 5.0）
- Expo SDK: 50.0以上
- Node.js: 18.x以上

## 5. 技術要件

### 5.1 必要なライブラリ・パッケージ（最小限）
```
- expo-image-picker（画像選択・カメラ撮影）
- openai（OpenAI API クライアント）
- @react-navigation/native（画面遷移）
- @react-navigation/stack
```

### 5.2 外部API
- OpenAI GPT-5 API
- エンドポイント：新しいresponses APIを使用
- APIクライアント：openai npm パッケージ

### 5.3 開発環境
- Node.js 18.x以上
- Expo CLI または Expo Development Build
- EAS CLI（ビルド・デプロイ用）
- Expo Go（開発・テスト用）

## 6. ユーザーストーリー

### 6.1 基本フロー（シンプル版）
1. **アプリ起動**
   - メイン画面が表示される
   - 「写真を撮る」「ギャラリーから選ぶ」ボタン

2. **画像取得**
   - ユーザーが写真撮影またはギャラリーから画像選択
   - 画像が表示される

3. **解析実行**
   - 「解析する」ボタンをタップ
   - 「解析中...」表示
   - OpenAI APIに画像を送信

4. **結果表示**
   - 識別結果を表示
   - 「もう一度」ボタンで最初に戻る

### 6.2 エラーハンドリング
- ネットワークエラー時の再試行オプション
- カメラアクセス拒否時の設定画面誘導
- API制限エラー時の適切なメッセージ表示

## 7. 画面設計（シンプル版）

### 7.1 画面一覧
1. **メイン画面** - 画像取得・解析・結果表示を1画面で

### 7.2 画面構成
```
メイン画面
├── 画像表示エリア
├── 「写真を撮る」ボタン
├── 「ギャラリーから選ぶ」ボタン  
├── 「解析する」ボタン
├── 結果表示エリア
└── 「もう一度」ボタン
```

## 8. データ設計（シンプル版）

### 8.1 状態管理
```typescript
interface AppState {
  selectedImage: string | null;
  analysisResult: string | null;
  isAnalyzing: boolean;
}
```

### 8.2 OpenAI API リクエスト形式
```typescript
import OpenAI from "openai";

interface AnalysisRequest {
  model: "gpt-5";
  input: Array<{
    role: "user";
    content: Array<{
      type: "input_text" | "input_image";
      text?: string;
      image_url?: string;
    }>;
  }>;
}

// 実装例
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeImage = async (imageUri: string): Promise<string> => {
  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "この画像に写っている物体を日本語で識別して、名前と簡単な説明を教えてください。",
          },
          {
            type: "input_image",
            image_url: imageUri,
          },
        ],
      },
    ],
  });
  
  return response.output_text;
};
```

## 9. リスクと対策

### 9.1 技術的リスク
- **OpenAI API制限・新API形式**
  - 対策：responses APIの使用量監視とエラーハンドリング
- **Expoの制限事項**
  - 対策：Expo Development Buildの検討
- **カメラ権限拒否**
  - 対策：expo-image-pickerによる代替手段提供

### 9.2 ビジネスリスク
- **GPT-5 API コスト増大**
  - 対策：使用量制限とコスト監視ダッシュボード
- **新しいAPI形式の安定性**
  - 対策：フォールバック機能の実装検討

## 10. MVP実装のポイント

### 10.1 シンプルな実装方針
- 1画面で全機能を完結
- 最小限のライブラリ使用
- 複雑な状態管理は避ける
- エラーハンドリングも基本的なもののみ

### 10.2 実装の優先順位
1. 画像選択機能（expo-image-picker）
2. OpenAI API連携
3. 基本的なUI
4. 簡単なエラー表示

## 11. Expo固有の実装考慮事項（簡略版）

### 11.1 基本的な画像選択
```typescript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};

const takePhoto = async () => {
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
  }
};
```

### 11.2 シンプルなAPI連携
```typescript
import OpenAI from "openai";

const analyzeImage = async (imageUri: string) => {
  const client = new OpenAI({
    apiKey: 'your-api-key', // 本番では環境変数から取得
  });

  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "この画像の物体を日本語で簡潔に説明してください",
            },
            {
              type: "input_image",
              image_url: imageUri,
            },
          ],
        },
      ],
    });
    
    return response.output_text;
  } catch (error) {
    return "解析に失敗しました";
  }
};
```

---

**作成日：2025年8月9日**  
**バージョン：2.0（Expo対応版）**