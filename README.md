# Java Silver SE 17 練習問題アプリ

Java Silver SE 17 (1Z0-825) 相当の練習問題をブラウザ上で解ける学習アプリです。

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![vanilla](https://img.shields.io/badge/stack-HTML%20%2F%20JS-green.svg)

## 特徴

- **175問のオリジナル問題**（基礎6章 × 各25問 + SE 17新機能25問）
- **選択問題形式**で、選択肢の順番は毎回ランダム
- **ざっくり解説 / 詳しく解説** の2段階で理解を深められる
- **1問ずつ即判定**で、間違えた直後に解説を確認できる
- **90秒タイマー**（ON/OFF切替可、本試験ペースは約1.7分/問）
- **★苦手マーク**で気になる問題を後で復習
- **直近のミスを復習**モードで誤答だけ再挑戦
- **章別正答率**で弱点が一目でわかる
- **localStorage**に累計正答率・苦手マーク・履歴を自動保存
- フレームワーク不要・**単一HTMLで動作**

## 章構成

| 章 | テーマ |
|---|---|
| 第1章 | Javaの基本（環境・main・パッケージ・JVM） |
| 第2章 | データ型と変数（プリミティブ・リテラル・演算子・キャスト） |
| 第3章 | 制御構造（if/switch/for/while/break/continue） |
| 第4章 | 配列・文字列・コレクション（String/StringBuilder/ArrayList） |
| 第5章 | クラスとメソッド（コンストラクタ・static・オーバーロード・カプセル化） |
| 第6章 | 継承・ポリモーフィズム・例外・ラムダ |
| 第7章 | Java SE 17 新機能（var / switch式 / テキストブロック / record / sealed / pattern matching） |

## 使い方

### 1. ダウンロード

```bash
git clone https://github.com/foolish1023/java-silver.git
cd java-silver
```

### 2. ブラウザで開くだけ

```bash
open index.html
```

サーバー不要。`index.html` をダブルクリックするだけで起動します。

### 3. 問題モードを選ぶ

- **問題数**: 5問 / 10問 / 20問
- **出題範囲**: 全章ランダム or 特定章のみ
- **復習モード**: 直近のミスを再挑戦
- **★苦手のみ**: マークした問題だけ出題

## ファイル構成

```
java-silver/
├── index.html     # アプリ本体（UI + ロジック）
├── questions.js   # 問題データ150問
└── README.md
```

## 問題の出典について

全問題は Java Silver SE 17 (1Z0-825) の出題範囲に沿って書き下ろしたオリジナル問題です。実際の過去問の転載ではありません。

## ライセンス

MIT License

## フィードバック

誤りや改善提案は Issue または Pull Request でお願いします。
