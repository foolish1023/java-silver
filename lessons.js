// Java Silver SE 17 教科書コンテンツ (全40トピック)
// 構造: { id, chapter, title, summary, sections[{heading, body, code?}], points[], pitfalls[] }

const LESSONS = [
  // ==================== 第1章: Javaの基本 (5トピック) ====================
  {
    id: 'ch1-t1', chapter: 1,
    title: 'Javaの仕組み — JDK / JRE / JVM',
    summary: 'Javaはソースコードをバイトコードにコンパイルし、JVM（仮想マシン）で実行する。JDK⊃JRE⊃JVMの入れ子構造になっている。',
    sections: [
      {
        heading: '3つの違い',
        body: 'JDK（Java Development Kit）は開発者向けで、コンパイラ（javac）やツール類を含む。JREはJava Runtime Environmentで、アプリを実行するために必要な最小構成。JVMはJava Virtual Machineで、バイトコードを各OS向けに翻訳しながら実行する。JDKをインストールすればJREもJVMも入る。'
      },
      {
        heading: '実行の流れ',
        body: 'ソース(.java) → javac → バイトコード(.class) → JVM → 実行。この「一度コンパイルしてどのOSでも動く」仕組みが Write Once, Run Anywhere。',
        code: 'javac Hello.java   // コンパイル → Hello.class\njava Hello         // JVMで実行'
      },
      {
        heading: 'Java 11以降の便利機能',
        body: 'シングルファイルソース実行が追加され、javac を経由せず java Hello.java のように .java を直接実行できるようになった。スクリプト用途に便利。'
      }
    ],
    points: [
      'JDK ⊃ JRE ⊃ JVM の入れ子構造',
      '.java をコンパイルすると .class（バイトコード）になる',
      'JVMがバイトコードを読んで各OSで実行する',
      'Java 11以降は java Hello.java で直接実行可能'
    ],
    pitfalls: [
      'javac と java を逆に覚えない（javac=コンパイラ, java=実行）',
      'Java 17 は LTS（長期サポート）版。1Z0-825 は SE 17 対応'
    ]
  },
  {
    id: 'ch1-t2', chapter: 1,
    title: 'mainメソッド — エントリーポイント',
    summary: 'Javaプログラムは public static void main(String[] args) から開始する。これが欠けるとJVMが起動できない。',
    sections: [
      {
        heading: '必須シグネチャ',
        body: 'public・static・void・String[]配列の4要素が揃って初めてmainメソッドとして認識される。どれが欠けてもコンパイルは通るが、java コマンドで起動できない。',
        code: 'public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java 17!");\n  }\n}'
      },
      {
        heading: '許される書き方',
        body: '修飾子の順序は入れ替え可（static public voidもOK）。引数名は args でなくてもよい（String[] a でもOK）。String... args（可変長引数）も有効。配列の角括弧は String args[] でも可。'
      },
      {
        heading: 'コマンドライン引数',
        body: 'java Hello foo bar とすると args = ["foo", "bar"] として渡る。要素数は args.length で取得できる。'
      }
    ],
    points: [
      'public static void main(String[] args) が定型',
      'String[] args は String... args でもよい',
      'mainがないとJVMが起動できない（実行時エラー）',
      'mainが複数あってもコンパイルは通る（呼ばれないだけ）'
    ],
    pitfalls: [
      'void がないと戻り値の型エラー（mainは値を返さない）',
      'static がないとインスタンス化が必要になり起動できない',
      'String（配列でない）やString[][]では認識されない'
    ]
  },
  {
    id: 'ch1-t3', chapter: 1,
    title: 'パッケージとimport',
    summary: 'パッケージはクラスをまとめる名前空間。package文が先、import文が次、クラス定義が最後。',
    sections: [
      {
        heading: '記述順序',
        body: 'ソースファイルの先頭にpackage文、続いてimport文、その後にクラス定義の順で並べる。順序を入れ替えるとコンパイルエラー。',
        code: 'package com.example.app;\n\nimport java.util.List;\nimport java.util.ArrayList;\n\npublic class Main { /* ... */ }'
      },
      {
        heading: 'import の種類',
        body: '通常import（import java.util.List）、ワイルドカードimport（import java.util.*）、static import（import static java.lang.Math.PI）の3種類。ワイルドカードimportはサブパッケージは含まない。'
      },
      {
        heading: '暗黙import',
        body: 'java.lang パッケージ（String, System, Math, Objectなど）は暗黙的にimportされるためimport文不要。'
      }
    ],
    points: [
      'package → import → クラス定義の順',
      'ワイルドカード * はサブパッケージを含まない',
      'java.lang は自動import',
      '同一パッケージ内のクラスはimport不要'
    ],
    pitfalls: [
      'package文はファイルに1つまで',
      'import java.util.*; と import java.util.concurrent.*; は別物（concurrentは別途必要）',
      '同名クラスを2つのパッケージからワイルドカードimportするとエラー'
    ]
  },
  {
    id: 'ch1-t4', chapter: 1,
    title: 'ソースファイルのルール',
    summary: '1つの.javaファイルに書けるpublicクラスは1つだけ。そのpublicクラス名はファイル名と完全一致。',
    sections: [
      {
        heading: 'public クラスの制約',
        body: 'ソースファイルにpublicクラスを書く場合、ファイル名はそのクラス名+.javaと完全一致する必要がある。Foo.java には public class Foo のみ書ける。',
        code: '// Foo.java\npublic class Foo { }           // OK\nclass Bar { }                   // OK（publicでないので同居可）\npublic class Baz { }            // NG（publicは1つまで）'
      },
      {
        heading: 'publicでないクラス',
        body: 'publicでない（package-private）クラスは同じファイル内に複数記述できる。コンパイル結果はクラスごとの.classファイルになる。'
      }
    ],
    points: [
      'publicクラスは1ファイルに最大1つ',
      'publicクラス名はファイル名と完全一致（大文字小文字区別）',
      'publicでないクラスは複数共存可能',
      'コンパイル後はクラスごとに.classファイル'
    ],
    pitfalls: [
      'ファイル名とpublicクラス名が違うとコンパイルエラー',
      '拡張子は .java（ソース）、.class（バイトコード）',
      'publicなしクラスのみならファイル名は自由'
    ]
  },
  {
    id: 'ch1-t5', chapter: 1,
    title: 'javac / java コマンド',
    summary: 'javac でコンパイル、java で実行。Java 11以降は java file.java で直接実行もできる。',
    sections: [
      {
        heading: '基本の流れ',
        body: 'javacはJava Compiler、javaはJavaランチャー。javacに渡すのは.javaファイル、javaに渡すのは（.classを省いた）クラス名。',
        code: 'javac Hello.java      // Hello.class が生成される\njava Hello            // .class 拡張子を付けない\njava -cp . Hello      // classpathを指定'
      },
      {
        heading: 'Java 11の単一ファイル実行',
        body: 'java Hello.java とすると内部で一時的にコンパイル→実行する。スクリプト風に使える。',
        code: 'java Hello.java       // 直接.javaを指定（Java 11以降）\njava Hello.java arg1 arg2'
      }
    ],
    points: [
      'javac = コンパイル、java = 実行',
      'java に渡すのはクラス名（.class抜き）',
      'Java 11以降は java *.java で直接実行可能',
      'classpathは -cp または -classpath で指定'
    ],
    pitfalls: [
      'java Hello.class としない（拡張子NG、クラス名のみ）',
      'デフォルトclasspathは カレントディレクトリ'
    ]
  },

  // ==================== 第2章: データ型と変数 (6トピック) ====================
  {
    id: 'ch2-t1', chapter: 2,
    title: 'プリミティブ型 8種',
    summary: 'Javaのプリミティブ型は byte / short / int / long / float / double / char / boolean の8つ。すべて値型。',
    sections: [
      {
        heading: '整数型',
        body: 'byte（1バイト/-128〜127）、short（2バイト）、int（4バイト/約-21億〜21億）、long（8バイト）。既定で整数リテラルは int 型。long 型には末尾に L を付ける（例: 100L）。',
        code: 'byte  b = 127;\nshort s = 32000;\nint   i = 1_000_000;   // _ は見やすさのための区切り\nlong  l = 9999999999L; // Lサフィックス必須'
      },
      {
        heading: '浮動小数点型',
        body: 'float（4バイト）と double（8バイト）。既定で小数リテラルは double。float には末尾に F を付ける。',
        code: 'float  f = 3.14f;     // Fサフィックス必須\ndouble d = 3.14;      // サフィックス不要（既定double）'
      },
      {
        heading: '文字型と真偽型',
        body: 'char は16ビット Unicode 文字（0〜65535）。boolean は true または false の2値のみ。他の型との暗黙変換はしない。',
        code: "char c = 'A';         // シングルクオート\nchar u = '\\u3042';    // Unicodeエスケープ（あ）\nboolean flag = true;"
      }
    ],
    points: [
      '整数: byte(1) / short(2) / int(4) / long(8) バイト',
      '浮動小数点: float(4) / double(8) バイト',
      '整数の既定は int、小数の既定は double',
      'long は L、float は F サフィックスが必要',
      'boolean は true/false のみ（0や1で代用不可）'
    ],
    pitfalls: [
      'int の最大値は約21億。これを超えるリテラル（例: 3000000000）はエラー → Lを付けてlongに',
      'float f = 3.14; はエラー（3.14はdouble。縮小変換は暗黙不可）',
      'char は数値としても扱えるが boolean は数値化できない'
    ]
  },
  {
    id: 'ch2-t2', chapter: 2,
    title: '参照型と null',
    summary: 'クラス・配列・インターフェースの変数はすべて参照型。null は「何も指していない」状態を表す。',
    sections: [
      {
        heading: '参照型とは',
        body: 'プリミティブ以外はすべて参照型。変数はオブジェクト本体そのものではなく、ヒープ上のオブジェクトへの「参照（アドレスのようなもの）」を保持する。',
        code: 'String s = new String("hi");  // s はヒープ上の文字列を指す参照\nString t = null;              // 何も指していない'
      },
      {
        heading: 'null の扱い',
        body: 'null を指す変数のメソッドを呼ぶと NullPointerException が発生する。null 自体は「どんな参照型にも代入できる値」。プリミティブには null を代入できない。',
        code: 'String s = null;\n// s.length();  // ここで NullPointerException\nint n = null;  // コンパイルエラー'
      }
    ],
    points: [
      '参照型変数 = オブジェクトへの参照を保持',
      'null はどの参照型にも代入可能',
      'プリミティブには null を代入できない',
      'null に対するメソッド呼び出しは NullPointerException'
    ],
    pitfalls: [
      '== と equals() の違い: == は参照比較、equals は中身比較',
      'Integer と int は別物（オートボクシング/アンボクシング時にnull経由でNPE）'
    ]
  },
  {
    id: 'ch2-t3', chapter: 2,
    title: 'リテラルの書き方',
    summary: '2進数・8進数・16進数、アンダースコア区切り、サフィックスなど、リテラル表記には複数のバリエーションがある。',
    sections: [
      {
        heading: '進数表記',
        body: '0b で2進数、0 で8進数、0x で16進数を表す。10進数は特に接頭辞なし。',
        code: 'int bin = 0b1010;     // 10\nint oct = 017;        // 15（8進数）\nint hex = 0xFF;       // 255\nint dec = 100;'
      },
      {
        heading: 'アンダースコア区切り',
        body: 'Java 7以降、数値リテラルに _ を埋めて読みやすくできる。先頭・末尾・記号隣接は不可。',
        code: 'int  million = 1_000_000;\nlong card    = 1234_5678_9012_3456L;\n// int x = _100;   // NG\n// int y = 100_;   // NG\n// int z = 1__2;   // OK（連続は許可）'
      },
      {
        heading: 'サフィックス',
        body: 'long には L（小文字lも可だが1と紛らわしいので非推奨）、float には F、double には D（省略可）。文字は \'...\'、文字列は "..."。',
        code: 'long l = 1000L;\nfloat f = 1.5F;\ndouble d = 1.5;        // Dは省略可\nchar c = \'A\';\nString s = "A";'
      }
    ],
    points: [
      '2進=0b / 8進=0 / 16進=0x',
      'アンダースコアは数字の間だけ（先頭/末尾NG）',
      'long=L, float=F (小文字可だがL推奨)',
      '文字は \'...\'、文字列は "..."'
    ],
    pitfalls: [
      '017 は10進の17ではなく8進の15。リーディング0に注意',
      '小文字 l は数字1と見分けにくい → L を使う',
      '2進リテラルの0b は 0B でもOK'
    ]
  },
  {
    id: 'ch2-t4', chapter: 2,
    title: 'キャスト — 拡大変換と縮小変換',
    summary: '小さい型から大きい型への変換は暗黙（拡大変換）、逆は明示的なキャスト（縮小変換）が必要。',
    sections: [
      {
        heading: '拡大変換（暗黙）',
        body: 'byte → short → int → long → float → double の方向は自動変換される。情報は失われない（ただし long→float、int→float では精度低下あり）。',
        code: 'int  i = 100;\nlong l = i;        // int→long 暗黙OK\ndouble d = l;      // long→double 暗黙OK'
      },
      {
        heading: '縮小変換（明示キャスト）',
        body: '大きい型から小さい型への代入はキャストが必須。情報が失われる可能性があるため Java は明示を要求する。',
        code: 'double d = 3.9;\nint i = (int) d;       // 3（小数切り捨て）\n\nint big = 300;\nbyte b = (byte) big;   // 44（オーバーフロー）'
      },
      {
        heading: '参照型のキャスト',
        body: 'アップキャスト（子→親）は暗黙、ダウンキャスト（親→子）は明示。誤ると ClassCastException。',
        code: 'Object o = "hi";\nString s = (String) o;   // OK\nObject n = 123;\nString x = (String) n;   // 実行時 ClassCastException'
      }
    ],
    points: [
      '拡大変換は暗黙、縮小変換は明示',
      '(型) 値 で明示キャスト',
      '縮小変換では情報が失われる',
      '参照型のダウンキャストはClassCastException に注意'
    ],
    pitfalls: [
      'byte b = 128; はエラー（範囲外）。(byte)128 にすれば -128 にオーバーフロー',
      'double → int は小数切り捨て（四捨五入ではない）',
      'final 付き定数なら範囲内チェックを通れば縮小変換が暗黙になる（定数畳み込み）'
    ]
  },
  {
    id: 'ch2-t5', chapter: 2,
    title: '演算子の基本',
    summary: '算術 / 関係 / 論理 / ビット / 代入 / 三項 / instanceof などの演算子と優先順位を押さえる。',
    sections: [
      {
        heading: '算術・関係・論理',
        body: '算術: + - * / % / 関係: == != < > <= >= / 論理: && || ! / ビット: & | ^ ~ / シフト: << >> >>>（符号なし右シフト）。',
        code: 'int a = 10 % 3;              // 1（余り）\nboolean b = a > 0 && a < 5;  // && はショートサーキット\nint c = 1 << 3;              // 8（2の3乗）'
      },
      {
        heading: '三項演算子',
        body: '条件 ? 値1 : 値2 で条件に応じた値を返す。if文の式版。',
        code: 'int max = (a > b) ? a : b;'
      },
      {
        heading: '代入演算子',
        body: '= に加えて += -= *= /= %= などの複合代入がある。複合代入は暗黙キャストを含む。',
        code: 'byte b = 10;\nb += 200;       // OK（内部でキャスト）\n// b = b + 200; // エラー（結果がint）'
      },
      {
        heading: 'instanceof',
        body: '参照が指定クラス/インターフェースのインスタンスかを判定。Java 16以降はパターン変数もバインド可能。',
        code: 'Object o = "hi";\nif (o instanceof String s) {\n  System.out.println(s.length());  // sは自動キャスト済\n}'
      }
    ],
    points: [
      '&& || はショートサーキット（左で確定したら右を評価しない）',
      '整数除算は切り捨て（5/2=2）',
      '複合代入 += は暗黙キャストを含む',
      'instanceof で null は常に false'
    ],
    pitfalls: [
      '== は参照比較。文字列比較は equals() を使う',
      '5 / 2 は 2（int同士）。2.5 にしたければ 5.0/2 のように少なくとも一方をdoubleに',
      '== の左右で型が違うと暗黙型昇格が起きる'
    ]
  },
  {
    id: 'ch2-t6', chapter: 2,
    title: '型昇格（数値演算の暗黙変換）',
    summary: '算術演算時、小さい数値型は int に昇格される。異なる型同士の演算では大きい方に揃えられる。',
    sections: [
      {
        heading: '単項数値昇格',
        body: 'byte・short・char に対して算術演算・シフトを行うと結果はintに昇格する。そのため byte + byte の結果はintで、byteに代入するにはキャストが必要。',
        code: 'byte a = 1, b = 2;\nbyte c = a + b;         // エラー（結果はint）\nbyte d = (byte)(a + b); // OK'
      },
      {
        heading: '二項数値昇格',
        body: 'オペランドの型が違う場合、以下の順で大きい方に揃える: ①どちらかがdouble→両方double ②floatなら両方float ③longなら両方long ④それ以外は両方int。',
        code: 'int    i = 10;\ndouble d = 3.14;\n// 結果は double に昇格\ndouble result = i + d;'
      }
    ],
    points: [
      'byte/short/char の演算は int に昇格',
      '異なる型の演算は大きい方に揃う（double > float > long > int）',
      '縮小先の型に代入するときは明示キャストが必要',
      'char も数値として扱える（Unicode 値）'
    ],
    pitfalls: [
      'short s = 1; s = s + 1; はエラー（s+1がint）→ s += 1; ならOK',
      'long + int の結果は long',
      '1 / 2.0 は 0.5（double）だが 1 / 2 は 0'
    ]
  },

  // ==================== 第3章: 制御構造 (5トピック) ====================
  {
    id: 'ch3-t1', chapter: 3,
    title: 'if / else',
    summary: 'もっとも基本的な分岐。条件式は boolean でなければならない（Cのような数値0/非0はNG）。',
    sections: [
      {
        heading: '基本構文',
        body: 'if (条件式) { ... } else if (...) { ... } else { ... }。中括弧を省略すると直後の1文だけが分岐対象になる（非推奨）。',
        code: 'int n = 10;\nif (n > 0) {\n  System.out.println("positive");\n} else if (n < 0) {\n  System.out.println("negative");\n} else {\n  System.out.println("zero");\n}'
      },
      {
        heading: '条件式は必ずboolean',
        body: 'C/C++と異なり、if (x) の x は boolean 限定。int や null をそのまま書くとエラー。',
        code: 'int x = 5;\n// if (x) { }   // エラー\nif (x != 0) { }  // OK'
      }
    ],
    points: [
      '条件式は必ず boolean 型',
      '中括弧 {} は省略可能だが推奨',
      '== と = を間違えない（== 比較、= 代入）',
      'else は最も近い if と結びつく'
    ],
    pitfalls: [
      'if (x = 5) はエラー（xがbooleanなら代入なのでOK = バグの温床）',
      '中括弧なしだと後続の1文だけが分岐対象、意図しないインデントで混乱しがち'
    ]
  },
  {
    id: 'ch3-t2', chapter: 3,
    title: 'switch文 / switch式',
    summary: '従来のcolon形式（break必須・フォールスルーあり）と、Java 14で正式化されたアロー形式（->）の両方を理解する。',
    sections: [
      {
        heading: 'switch文（colon形式）',
        body: '各caseの末尾にbreakを書かないと次のcaseへフォールスルー（落ちる）する。default は任意。',
        code: 'int n = 2;\nswitch (n) {\n  case 1:\n    System.out.println("one");\n    break;\n  case 2:\n  case 3:\n    System.out.println("two or three");\n    break;\n  default:\n    System.out.println("other");\n}'
      },
      {
        heading: 'アロー形式（switch文 / switch式）',
        body: 'case A -> ...; の形ならフォールスルーしない。複数ラベルはカンマ区切り。switch式は値を返せる。',
        code: 'String s = switch (n) {\n  case 1 -> "one";\n  case 2, 3 -> "two or three";\n  default -> "other";\n};'
      },
      {
        heading: 'ブロックと yield',
        body: 'アロー形式で複数文を書く場合は { } で囲み、値を返すときは yield を使う。',
        code: 'int r = switch (n) {\n  case 1 -> 10;\n  case 2 -> {\n    int v = compute(n);\n    yield v * 2;\n  }\n  default -> 0;\n};'
      },
      {
        heading: 'switch の対象型',
        body: 'byte / short / int / char と対応するラッパー、String、enum、（Java 21〜）参照型パターン。long / float / double / boolean は不可。'
      }
    ],
    points: [
      'colon形式は break でフォールスルー防止',
      'アロー -> はフォールスルーしない',
      'switch式（値を返す）は全ケース網羅が必須',
      'yield でブロックから値を返す',
      '対象型は整数系 + String + enum'
    ],
    pitfalls: [
      'colon形式で break 忘れ → 複数 case が連続実行される',
      'switch式は case を網羅しないとコンパイルエラー',
      'switch式で return は書けない（yield を使う）',
      'long や boolean は switch 不可'
    ]
  },
  {
    id: 'ch3-t3', chapter: 3,
    title: 'for文 / 拡張for文',
    summary: 'カウンタ制御のfor、反復ごとに要素を取り出す拡張for（for-each）がある。',
    sections: [
      {
        heading: '基本for',
        body: 'for (初期化; 条件; 更新) { ... }。初期化と更新はカンマ区切りで複数書ける。',
        code: 'for (int i = 0, j = 10; i < j; i++, j--) {\n  System.out.println(i + "," + j);\n}'
      },
      {
        heading: '拡張for（for-each）',
        body: '配列や Iterable（List など）の全要素を順に取り出す。インデックスは取得できないので必要ならbasic forを使う。',
        code: 'int[] arr = {1, 2, 3};\nfor (int v : arr) {\n  System.out.println(v);\n}\n\nList<String> list = List.of("a", "b");\nfor (String s : list) {\n  System.out.println(s);\n}'
      },
      {
        heading: '無限ループ',
        body: 'for (;;) や while (true) で無限ループになる。break で抜ける。',
        code: 'for (;;) {\n  if (shouldStop()) break;\n}'
      }
    ],
    points: [
      'basic for は 初期化 / 条件 / 更新 の3要素',
      '拡張for は 配列 / Iterable が対象',
      '拡張for はインデックスが取れない',
      'カンマで複数式を初期化・更新できる'
    ],
    pitfalls: [
      '拡張for中に元のコレクションをadd/removeすると ConcurrentModificationException（remove には Iterator.remove() を使う）',
      '条件式を省略すると無限ループ扱い',
      'i を forの外で参照したいなら forの外側で宣言する'
    ]
  },
  {
    id: 'ch3-t4', chapter: 3,
    title: 'while / do-while',
    summary: 'whileは「前判定」、do-whileは「後判定」。do-whileは最低1回実行される。',
    sections: [
      {
        heading: 'while',
        body: '条件を先に評価してtrueなら本体を実行。falseなら一度も実行されない。',
        code: 'int i = 0;\nwhile (i < 3) {\n  System.out.println(i);\n  i++;\n}'
      },
      {
        heading: 'do-while',
        body: '本体を先に1回実行し、その後条件を評価する。末尾の ; を忘れやすい。',
        code: 'int i = 0;\ndo {\n  System.out.println(i);\n  i++;\n} while (i < 3);   // セミコロン必須'
      }
    ],
    points: [
      'while は前判定（0回実行あり）',
      'do-while は後判定（最低1回実行）',
      'do-while の末尾には ; が必要',
      '条件式は boolean のみ'
    ],
    pitfalls: [
      'do-while のセミコロン忘れはコンパイルエラー',
      '無限ループになる条件を書かないよう注意'
    ]
  },
  {
    id: 'ch3-t5', chapter: 3,
    title: 'break / continue / ラベル',
    summary: 'break は最も内側のループ/switchを抜ける。continue は次の反復へ。ラベルで多重ループから一気に抜けられる。',
    sections: [
      {
        heading: 'break / continue',
        body: 'break はループや switch を抜ける。continue はループの次の反復に進む。どちらも最内側のループが対象。',
        code: 'for (int i = 0; i < 10; i++) {\n  if (i == 5) break;     // ループ終了\n  if (i % 2 == 0) continue; // 次の反復へ\n  System.out.println(i);  // 1,3\n}'
      },
      {
        heading: 'ラベル付きbreak/continue',
        body: 'ループに名前（ラベル）を付け、break 名前; で外側のループを抜けられる。多重ループの脱出に使う。',
        code: 'outer:\nfor (int i = 0; i < 5; i++) {\n  for (int j = 0; j < 5; j++) {\n    if (i * j > 6) break outer;\n    System.out.println(i + "," + j);\n  }\n}'
      }
    ],
    points: [
      'break は最内側のループ/switchを抜ける',
      'continue は次の反復へジャンプ',
      'ラベル名: をループ前に付けて break/continue ラベル で外側制御',
      'switchの中のbreakはswitchを抜けるだけ（ループには影響しない）'
    ],
    pitfalls: [
      'switch内のbreakは外側ループからは抜けない（ラベル付きbreakが必要）',
      'ラベル付きcontinueは「ラベル付きループの次の反復」に飛ぶ'
    ]
  },

  // ==================== 第4章: 配列・文字列・コレクション (5トピック) ====================
  {
    id: 'ch4-t1', chapter: 4,
    title: '配列の宣言と初期化',
    summary: '配列はサイズ固定。型[] 名前 = new 型[長さ] または {要素...} で初期化する。',
    sections: [
      {
        heading: '宣言と初期化',
        body: '配列の宣言は 型[] 変数名 または 型 変数名[]。new で長さ指定、または {} で要素列挙で初期化。',
        code: 'int[] a = new int[5];         // 全要素0\nint[] b = {1, 2, 3};           // 長さ3\nint[] c = new int[]{1, 2, 3};  // new版\nint d[] = {1, 2};              // 型 名前[] の書き方'
      },
      {
        heading: '長さとアクセス',
        body: '長さは .length で取得。範囲外アクセスは ArrayIndexOutOfBoundsException。',
        code: 'int[] a = {10, 20, 30};\nSystem.out.println(a.length);   // 3\nSystem.out.println(a[0]);       // 10\n// a[3] → 実行時例外'
      },
      {
        heading: '多次元配列',
        body: 'int[][] は「int配列の配列」。各行の長さは異なっていてもよい（ジャグ配列）。',
        code: 'int[][] grid = new int[3][4];   // 3x4\nint[][] jag = new int[3][];\njag[0] = new int[]{1};\njag[1] = new int[]{1, 2};'
      }
    ],
    points: [
      '配列は固定長（サイズ変更不可）',
      'new 型[長さ] で生成、各要素は既定値（数値=0, boolean=false, 参照=null）',
      '.length で長さ取得',
      '添字は0始まり、範囲外は ArrayIndexOutOfBoundsException'
    ],
    pitfalls: [
      'new 型[] のあとに { } を同時指定するとエラー（どちらか一方）',
      '宣言時の初期化 {1,2,3} は宣言と同じ文でしか使えない',
      '配列の length はメソッドではなくフィールド（()不要）'
    ]
  },
  {
    id: 'ch4-t2', chapter: 4,
    title: 'String と 文字列リテラルプール',
    summary: 'Stringは不変（immutable）。リテラルは文字列プールで共有されるが new String は新しいインスタンスを作る。',
    sections: [
      {
        heading: 'Stringは不変',
        body: 'String オブジェクトは一度作ったら変更できない。s = s + "!" は新しい String を作って代入している。',
        code: 'String s = "hello";\ns.toUpperCase();             // 戻り値を捨てるだけで s は変わらない\ns = s.toUpperCase();         // 代入し直すと変わる'
      },
      {
        heading: '== と equals()',
        body: 'リテラル同士の == は文字列プールで共有されるため true になることが多いが、内容比較は equals() を使う。',
        code: 'String a = "abc";\nString b = "abc";              // プールから共有\nString c = new String("abc"); // 新しいインスタンス\nSystem.out.println(a == b);       // true\nSystem.out.println(a == c);       // false\nSystem.out.println(a.equals(c));  // true'
      },
      {
        heading: '主要メソッド',
        body: 'length() / charAt(int) / substring(int,int) / indexOf / concat / toUpperCase / trim / strip / isEmpty / isBlank / equals / equalsIgnoreCase / contains / startsWith / endsWith / split など。',
        code: 'String s = " Java ";\nSystem.out.println(s.strip());    // "Java"（trimより厳密、Unicode対応）\nSystem.out.println(s.isBlank());  // false\nSystem.out.println(s.contains("v")); // true'
      }
    ],
    points: [
      'String は不変（immutable）',
      'リテラルは文字列プールで共有',
      'new String("x") は毎回新インスタンス',
      '内容比較は equals()、参照比較は ==',
      'Java 11: strip() / isBlank() / repeat(n) が追加'
    ],
    pitfalls: [
      's.toUpperCase() の戻り値を受け取らないと何も変わらない',
      'String の == は罠。equals を使う',
      'substring(begin, end) の end は「含まない」'
    ]
  },
  {
    id: 'ch4-t3', chapter: 4,
    title: 'StringBuilder',
    summary: '可変な文字列バッファ。ループ内で文字列を連結する場合は String より高速。',
    sections: [
      {
        heading: 'なぜ使うか',
        body: 'String は不変なので + で連結するたびに新オブジェクトを作る。ループ内の連結は StringBuilder を使うとメモリ効率が良い。',
        code: 'StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 100; i++) {\n  sb.append(i).append(",");\n}\nString result = sb.toString();'
      },
      {
        heading: '主要メソッド',
        body: 'append / insert / delete / deleteCharAt / replace / reverse / setCharAt / length / charAt / toString。多くは StringBuilder 自身を返すのでメソッドチェーンできる。'
      },
      {
        heading: 'StringBuffer との違い',
        body: 'StringBuffer はスレッドセーフ（同期化されているがその分遅い）。StringBuilder は非同期で高速。シングルスレッドなら StringBuilder 一択。'
      }
    ],
    points: [
      'StringBuilder は可変',
      'append / insert / delete はチェーン可能',
      'ループ内連結は StringBuilder を使う',
      'StringBuffer は同期化版（使う機会少ない）'
    ],
    pitfalls: [
      'toString() を呼ばないと String にならない',
      'StringBuilder sb = "abc"; はエラー（new が必要）'
    ]
  },
  {
    id: 'ch4-t4', chapter: 4,
    title: 'ArrayList の基本',
    summary: '可変長の配列的なコレクション。List<E> インターフェースの最もよく使われる実装。',
    sections: [
      {
        heading: '生成と追加',
        body: 'ジェネリクスで要素型を指定。Java 7以降はダイヤモンド演算子 <> で右辺の型引数を省略可能。',
        code: 'import java.util.ArrayList;\nimport java.util.List;\n\nList<String> list = new ArrayList<>();\nlist.add("a");\nlist.add("b");\nlist.add(0, "z");    // 指定位置に挿入'
      },
      {
        heading: '取得 / 更新 / 削除',
        body: 'get(index) / set(index, value) / remove(index) / remove(Object) / size() / isEmpty() / contains(Object) / indexOf(Object)。',
        code: 'list.set(1, "B");            // 置換\nlist.remove(0);              // 0番目を削除\nboolean has = list.contains("b");'
      },
      {
        heading: '不変リスト',
        body: 'Java 9以降は List.of(...) で不変リストを作れる。add/remove 不可。',
        code: 'List<Integer> nums = List.of(1, 2, 3);\n// nums.add(4); // UnsupportedOperationException'
      }
    ],
    points: [
      'ArrayList は可変長リスト（内部は配列）',
      'ダイヤモンド <> で型引数を省略可能',
      '要素はインデックスで取得・置換・削除',
      'List.of() は不変リスト'
    ],
    pitfalls: [
      'List<int> はNG（プリミティブ不可）。List<Integer> にする',
      'remove(int) と remove(Object) の区別。Integer型で削除したいときは remove(Integer.valueOf(1)) とする',
      'List.of() や Arrays.asList() の返すリストはサイズ変更不可'
    ]
  },
  {
    id: 'ch4-t5', chapter: 4,
    title: 'Iterator と for-each',
    summary: 'コレクションを反復処理する2通りの方法。for-eachは内部的にIteratorを使う。',
    sections: [
      {
        heading: 'Iterator',
        body: 'hasNext() / next() / remove() の3メソッドを持つ。反復中にコレクションを安全に削除するには Iterator.remove() を使う。',
        code: 'Iterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n  String s = it.next();\n  if (s.isEmpty()) it.remove();  // 安全な削除\n}'
      },
      {
        heading: 'for-each',
        body: '拡張for（for (型 変数 : コレクション) {...}）は配列・Iterable で使える。内部的には Iterator を使っている。',
        code: 'for (String s : list) {\n  System.out.println(s);\n}'
      }
    ],
    points: [
      'Iterator は hasNext / next / remove の3メソッド',
      'for-each は Iterable または配列で動く',
      '反復中の安全な削除は Iterator.remove()',
      'for-each 中に直接 list.remove() すると ConcurrentModificationException'
    ],
    pitfalls: [
      'for-each はインデックスが取れない',
      'next() の前に hasNext() で確認しないと NoSuchElementException',
      'remove() は next() の直後でしか呼べない'
    ]
  },

  // ==================== 第5章: クラスとメソッド (6トピック) ====================
  {
    id: 'ch5-t1', chapter: 5,
    title: 'クラスとフィールド',
    summary: 'クラスはオブジェクトの設計図。フィールド（状態）とメソッド（振る舞い）から成る。',
    sections: [
      {
        heading: 'クラスの基本',
        body: 'class ClassName { フィールド宣言; メソッド宣言; } の形。フィールドには型と初期値を指定できる。',
        code: 'public class Person {\n  private String name;\n  private int age = 0;     // 明示初期値\n\n  public String getName() { return name; }\n}'
      },
      {
        heading: 'フィールドの既定値',
        body: '明示初期化がない場合、数値型は 0、boolean は false、char は \'\\u0000\'、参照型は null が自動で入る（ローカル変数とは違う）。'
      },
      {
        heading: 'インスタンス化',
        body: 'new ClassName() でインスタンス（オブジェクト）を生成する。',
        code: 'Person p = new Person();\np.setName("Taro");  // メソッド呼び出し'
      }
    ],
    points: [
      'フィールドは自動で既定値に初期化される',
      'new でインスタンス化',
      'ローカル変数は自動初期化されない（使うと未初期化エラー）',
      'this はインスタンス自身を指す参照'
    ],
    pitfalls: [
      'フィールドとローカル変数の初期化ルールの違い',
      'クラス名と同名のメソッドはコンストラクタ扱いになる'
    ]
  },
  {
    id: 'ch5-t2', chapter: 5,
    title: 'コンストラクタ',
    summary: 'インスタンス生成時に呼ばれる特殊なメソッド。クラス名と同じ、戻り値型を書かない。',
    sections: [
      {
        heading: '基本',
        body: 'コンストラクタはクラス名と同じ名前、戻り値型なし。void も書かない。定義しなければコンパイラが引数なしのデフォルトコンストラクタを自動生成する。',
        code: 'public class Point {\n  private int x, y;\n  public Point(int x, int y) {   // コンストラクタ\n    this.x = x;\n    this.y = y;\n  }\n}'
      },
      {
        heading: 'デフォルトコンストラクタ',
        body: 'コンストラクタを1つも書かなかった場合に限り、引数なしのデフォルトコンストラクタが自動生成される。1つでも書くと自動生成は行われない。'
      },
      {
        heading: 'this() で他のコンストラクタを呼ぶ',
        body: '1つ目の行に this(引数) と書くと、同じクラスの別のコンストラクタを呼べる。super() と併用不可。',
        code: 'public Point() {\n  this(0, 0);   // 必ず1行目\n}'
      }
    ],
    points: [
      'コンストラクタ名 = クラス名',
      '戻り値型を書かない（voidも書かない）',
      '引数なしコンストラクタは必要なら明示宣言',
      'this() / super() は必ず1行目'
    ],
    pitfalls: [
      'voidをつけるとただのメソッド扱いになり new のときに呼ばれない',
      'コンストラクタを1つ定義すると自動生成は消える → 引数なしnewがエラーになるかも',
      'this() と super() は併用できない'
    ]
  },
  {
    id: 'ch5-t3', chapter: 5,
    title: 'メソッドとオーバーロード',
    summary: 'メソッドはクラスの振る舞い。同名で引数リストが違えばオーバーロードできる。',
    sections: [
      {
        heading: 'メソッドの基本',
        body: '戻り値型 メソッド名(引数リスト) { ... }。戻り値がないときは void。return 文で戻る。',
        code: 'public int add(int a, int b) {\n  return a + b;\n}\npublic void greet(String name) {\n  System.out.println("Hi, " + name);\n}'
      },
      {
        heading: 'オーバーロード',
        body: 'メソッド名が同じでも、引数の「型・数・並び」が違えば複数定義できる。戻り値型だけの違いはオーバーロードにならない（コンパイルエラー）。',
        code: 'int calc(int x) { return x; }\nint calc(int x, int y) { return x + y; }   // OK\n// double calc(int x) { return x; }        // エラー（引数同じ）'
      },
      {
        heading: '呼び出しの解決',
        body: 'オーバーロードは静的解決。型昇格（int→long→double）やオートボクシングを考慮して最も近いメソッドが選ばれる。'
      }
    ],
    points: [
      'オーバーロード: 名前同じ + 引数リスト違い',
      '戻り値型だけの違いはオーバーロードにならない',
      '型昇格とオートボクシングを考慮した解決',
      'void メソッドは return 文で値を返せない'
    ],
    pitfalls: [
      'オーバーロード vs オーバーライド（継承時のシグネチャ一致）を混同しない',
      'オートボクシングが絡むと「どちらのオーバーロードが選ばれるか」が分かりにくい'
    ]
  },
  {
    id: 'ch5-t4', chapter: 5,
    title: 'static メンバ',
    summary: 'クラスに1つだけ存在するフィールド/メソッド。インスタンス化しなくてもクラス名で呼べる。',
    sections: [
      {
        heading: 'static フィールド',
        body: 'インスタンスごとではなくクラスに1つだけ存在する。全インスタンスで共有される。',
        code: 'public class Counter {\n  public static int count = 0;\n  public Counter() { count++; }\n}\n\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.count);   // 2'
      },
      {
        heading: 'static メソッド',
        body: 'インスタンスなしで呼べるメソッド。this が使えない。staticメソッドから非staticメンバにアクセスするにはインスタンスが必要。',
        code: 'public static int square(int n) { return n * n; }\n\nMath.max(1, 2);      // Math の static\nCounter.count;       // static フィールドアクセス'
      },
      {
        heading: 'main も static',
        body: 'mainメソッドが static なのは、JVM が起動時に Main のインスタンスを作らずに呼び出すため。'
      }
    ],
    points: [
      'static はクラス単位（全インスタンス共有）',
      'static からは this / 非staticメンバに直接アクセスできない',
      'クラス名.メンバ名 でアクセス（インスタンス名でも可だが非推奨）',
      'main は static なので JVM が直接呼べる'
    ],
    pitfalls: [
      'static メソッドから非static フィールドは直接参照できない',
      'インスタンス変数とstaticフィールドの参照先を混同しない'
    ]
  },
  {
    id: 'ch5-t5', chapter: 5,
    title: 'カプセル化とアクセス修飾子',
    summary: 'フィールドを private にして getter/setter で公開するのがカプセル化。アクセス修飾子は4段階。',
    sections: [
      {
        heading: 'アクセス修飾子の範囲',
        body: '① public = どこからでも ② protected = 同パッケージ + サブクラス ③ package-private（無指定）= 同パッケージのみ ④ private = 同クラスのみ。',
        code: 'public    int a;   // 全公開\nprotected int b;   // 同パッケージ＋サブクラス\n          int c;   // 同パッケージのみ\nprivate   int d;   // 自分だけ'
      },
      {
        heading: 'カプセル化の典型',
        body: 'フィールドは private にし、アクセスには public な getter/setter を用意する。これにより内部実装を隠蔽できる。',
        code: 'public class Person {\n  private int age;\n  public int getAge() { return age; }\n  public void setAge(int age) {\n    if (age < 0) throw new IllegalArgumentException();\n    this.age = age;\n  }\n}'
      }
    ],
    points: [
      'public > protected > package-private > private',
      'カプセル化: field は private、API は getter/setter',
      '同パッケージは package-private でアクセス可',
      'protected はサブクラス経由でもアクセス可'
    ],
    pitfalls: [
      'トップレベルクラスには public / package-private しか指定できない（private / protected 不可）',
      'protected の「サブクラス経由」条件に注意（別パッケージのサブクラスの this 経由のみ）'
    ]
  },
  {
    id: 'ch5-t6', chapter: 5,
    title: '可変長引数（varargs）',
    summary: '型... 名前 で任意個の引数を受け取れる。メソッド内では配列として扱う。',
    sections: [
      {
        heading: '基本',
        body: 'メソッド引数の最後に 型... 名前 と書くと可変長引数になる。呼び出し側は個別に並べるか配列を渡せる。',
        code: 'public static int sum(int... nums) {\n  int t = 0;\n  for (int n : nums) t += n;\n  return t;\n}\n\nsum(1, 2, 3);          // 個別\nsum(new int[]{1, 2});  // 配列'
      },
      {
        heading: '制約',
        body: '可変長引数はメソッドの引数リストの最後の1つだけ。複数は不可。',
        code: '// void f(int... a, String s)  // NG\nvoid f(String s, int... a)     // OK'
      }
    ],
    points: [
      '型... 名前 で宣言、内部では配列扱い',
      '1メソッドに1つまで、かつ最後',
      '呼び出し側は個別並べ or 配列',
      'String.format や printf も可変長引数を使う例'
    ],
    pitfalls: [
      'オーバーロードとvarargsが混じると解決が複雑',
      '可変長引数を複数書くとコンパイルエラー'
    ]
  },

  // ==================== 第6章: 継承・ポリモーフィズム・例外・ラムダ (7トピック) ====================
  {
    id: 'ch6-t1', chapter: 6,
    title: '継承とオーバーライド',
    summary: 'extends で親クラスを継承。親のメソッドを上書きするのがオーバーライド。',
    sections: [
      {
        heading: '継承',
        body: 'class Child extends Parent { ... } で Parent の public/protected/package-private メンバを引き継ぐ。Javaは単一継承（extendsは1つだけ）。',
        code: 'class Animal { void cry() { System.out.println("?"); } }\nclass Dog extends Animal {\n  @Override void cry() { System.out.println("Woof"); }\n}'
      },
      {
        heading: '@Override',
        body: '@Override を付けると「オーバーライドのつもり」をコンパイラに伝えられる。シグネチャが合わないとコンパイルエラーで間違いを防げる。'
      },
      {
        heading: 'オーバーライドの規則',
        body: '①メソッド名・引数が完全一致 ②戻り値は同じか共変（親の戻り値型のサブクラス）③アクセス修飾子は親と同じか広く ④チェック例外は親以下 ⑤static や private はオーバーライドではなく隠蔽/再定義。'
      }
    ],
    points: [
      'extends は1クラスのみ（単一継承）',
      '@Override でタイプミス防止',
      'アクセス修飾子は親以上に広く',
      'static / private はオーバーライド不可（隠蔽/再定義）'
    ],
    pitfalls: [
      '親のprivate メソッドは子から呼べない（継承されない）',
      '親public → 子 protected はアクセス狭めたことになりエラー',
      'オーバーロード（同名別シグネチャ）とオーバーライドを混同しない'
    ]
  },
  {
    id: 'ch6-t2', chapter: 6,
    title: 'super / super()',
    summary: 'super は親クラスを指す参照。super() は親のコンストラクタ呼び出し。',
    sections: [
      {
        heading: 'super.メソッド',
        body: '親のメソッドを呼びたいときは super.method() とする。オーバーライドで「親の処理も実行したうえで追加処理」というパターンでよく使う。',
        code: 'class Dog extends Animal {\n  @Override void cry() {\n    super.cry();                // 親の ? を鳴らす\n    System.out.println("Woof");\n  }\n}'
      },
      {
        heading: 'super()',
        body: 'コンストラクタの1行目で super(引数) と書くと親のコンストラクタを呼べる。省略すると引数なしの super() が暗黙に呼ばれる。親に引数なしコンストラクタがないと明示必須。',
        code: 'class Animal {\n  Animal(String name) { /* ... */ }  // 引数なしなし\n}\nclass Dog extends Animal {\n  Dog() {\n    super("dog");   // 明示必須\n  }\n}'
      }
    ],
    points: [
      'super.method() で親のメソッドを呼ぶ',
      'super(...) は必ずコンストラクタの1行目',
      '書かなければ super() が暗黙に挿入される',
      '親に引数なしコンストラクタがないと明示必須'
    ],
    pitfalls: [
      'super() と this() は併用不可',
      'コンストラクタの1行目以外では super(...) は呼べない'
    ]
  },
  {
    id: 'ch6-t3', chapter: 6,
    title: 'ポリモーフィズム',
    summary: '親型の変数で子のインスタンスを扱い、実際に呼ばれるメソッドは実行時に決まる。',
    sections: [
      {
        heading: '動的ディスパッチ',
        body: '親型で受けても、実体が子クラスのインスタンスなら子のオーバーライドメソッドが呼ばれる（動的ディスパッチ）。これが多態性。',
        code: 'Animal a = new Dog();\na.cry();    // Dogのcry()が呼ばれる（Woof）'
      },
      {
        heading: 'アップキャスト / ダウンキャスト',
        body: '子→親は暗黙（アップキャスト）、親→子は明示（ダウンキャスト、誤ると ClassCastException）。',
        code: 'Dog d = new Dog();\nAnimal a = d;          // アップ（暗黙）\nDog d2 = (Dog) a;      // ダウン（明示）'
      },
      {
        heading: 'instanceof による安全チェック',
        body: 'ダウンキャスト前に instanceof で型確認するのが安全。Java 16以降はパターン変数も使える。',
        code: 'if (a instanceof Dog d) {\n  d.fetch();\n}'
      }
    ],
    points: [
      '親型で受けても子のオーバーライドが呼ばれる',
      'アップキャストは暗黙、ダウンキャストは明示',
      'instanceof で安全チェック',
      'フィールド（変数）は静的解決、メソッドは動的ディスパッチ'
    ],
    pitfalls: [
      'フィールドはオーバーライドされない（変数の宣言型で決まる）',
      'static メソッドは実行時ディスパッチではなく宣言型で解決'
    ]
  },
  {
    id: 'ch6-t4', chapter: 6,
    title: '抽象クラス / 抽象メソッド',
    summary: 'abstract 付きクラスはインスタンス化不可。abstract メソッドは実装を持たない。サブクラスで具象化が必要。',
    sections: [
      {
        heading: '抽象クラス',
        body: 'abstract class で宣言。new できない。抽象メソッドを1つでも持つクラスは必ず abstract にする必要がある。',
        code: 'abstract class Shape {\n  abstract double area();        // 実装なし（;）\n  void describe() {\n    System.out.println("area=" + area());\n  }\n}\nclass Circle extends Shape {\n  double r;\n  Circle(double r) { this.r = r; }\n  double area() { return Math.PI * r * r; }\n}'
      },
      {
        heading: '特徴',
        body: '抽象クラスはフィールドやコンストラクタを持てる。全メソッドが具象でも abstract 宣言可能（new 禁止したいとき）。'
      }
    ],
    points: [
      'abstract クラスは new できない',
      'abstract メソッドは実装を持たない（;で終わる）',
      'サブクラスは抽象メソッドを実装しないとそれも抽象扱い',
      'フィールドやコンストラクタを持てる（インターフェースとの違い）'
    ],
    pitfalls: [
      'abstract と final は同時指定不可（矛盾する）',
      'abstract メソッドに private や static は付けられない',
      '抽象メソッドの本体 {} を書くとエラー（;で終わる）'
    ]
  },
  {
    id: 'ch6-t5', chapter: 6,
    title: 'インターフェース',
    summary: '型の契約のみを定義する仕組み。複数実装可能。Java 8以降は default / static / private メソッドも持てる。',
    sections: [
      {
        heading: '基本',
        body: 'interface で宣言。メソッドは暗黙に public abstract。フィールドは暗黙に public static final（定数）。',
        code: 'interface Flyable {\n  void fly();                   // 暗黙 public abstract\n  int MAX = 1000;               // 暗黙 public static final\n}\nclass Bird implements Flyable {\n  public void fly() { System.out.println("flying"); }\n}'
      },
      {
        heading: '多重実装',
        body: 'クラスは extends が1つだが、implements は複数可能。メソッド名が衝突したら実装クラスで明示する。',
        code: 'class Duck implements Flyable, Swimmer { /* ... */ }'
      },
      {
        heading: 'default / static / private メソッド',
        body: 'Java 8で default（実装付き、オーバーライド可）と static（インターフェース共通ユーティリティ）が、Java 9で private（default 間の共通処理）が追加された。',
        code: 'interface Greeter {\n  default void greet() { System.out.println("Hi"); }\n  static Greeter plain() { return () -> System.out.println("-"); }\n  private void log() { /* default 内部の補助 */ }\n}'
      }
    ],
    points: [
      'フィールドは暗黙 public static final',
      '抽象メソッドは暗黙 public abstract',
      '複数 implements 可能',
      'default / static / private メソッドを持てる（Java 8/9〜）'
    ],
    pitfalls: [
      '2つのインターフェースの default メソッドが衝突すると実装クラスで明示オーバーライドが必要',
      'インターフェースのフィールドは必ず定数（再代入不可）'
    ]
  },
  {
    id: 'ch6-t6', chapter: 6,
    title: '例外処理 — try-catch-finally',
    summary: 'try で例外が起きる可能性のあるコードを囲み、catch で捕捉、finally は必ず実行。',
    sections: [
      {
        heading: '基本',
        body: 'try の中で例外が発生すると、対応する catch に飛ぶ。finally は例外の有無にかかわらず必ず実行される。',
        code: 'try {\n  risky();\n} catch (IOException e) {\n  e.printStackTrace();\n} catch (RuntimeException e) {\n  // 複数catch可\n} finally {\n  cleanup();   // 必ず実行\n}'
      },
      {
        heading: 'チェック例外 vs 非チェック例外',
        body: 'Exception のサブクラス（RuntimeException 以外）はチェック例外で、呼び出し側が try-catch または throws を書かないとコンパイルエラー。RuntimeException / Error は非チェック。'
      },
      {
        heading: 'multi-catch / try-with-resources',
        body: '複数の例外を | で区切ってひとつの catch で受けられる。AutoCloseable を実装したリソースは try (...) で宣言すると自動 close される。',
        code: 'try (BufferedReader r = new BufferedReader(new FileReader("a"))) {\n  // 使う\n} catch (IOException | RuntimeException e) {\n  // multi-catch\n}'
      },
      {
        heading: 'throw / throws',
        body: 'throw は実際に例外を投げる文。throws はメソッド宣言で「投げる可能性がある」と明示する。',
        code: 'void load() throws IOException {\n  if (!exists()) throw new IOException("not found");\n}'
      }
    ],
    points: [
      'finally は必ず実行される（System.exit 除く）',
      'チェック例外は try-catch or throws が必須',
      'try-with-resources で自動 close',
      'multi-catch は | で区切る'
    ],
    pitfalls: [
      'catch の順序: 子クラス→親クラス（逆にすると到達不能）',
      'finally で return すると try/catch の return が上書きされる',
      'multi-catch で捕捉した変数は暗黙的に final 扱い'
    ]
  },
  {
    id: 'ch6-t7', chapter: 6,
    title: 'ラムダ式と関数型インターフェース',
    summary: '抽象メソッドが1つだけのインターフェースをラムダ式 (引数) -> 式 で簡潔に実装できる。',
    sections: [
      {
        heading: '関数型インターフェース',
        body: '抽象メソッドがちょうど1つのインターフェースを関数型インターフェースと呼ぶ。@FunctionalInterface アノテーションで明示できる（なくても関数型）。'
      },
      {
        heading: 'ラムダ式',
        body: '(引数リスト) -> 式 または (引数) -> { 文... return 値; } の形で関数型インターフェースの実装を簡潔に書ける。',
        code: 'Runnable r = () -> System.out.println("hi");\nComparator<String> cmp = (a, b) -> a.length() - b.length();\n\n// メソッド参照（ラムダの短縮形）\nComparator<String> byLen = Comparator.comparingInt(String::length);'
      },
      {
        heading: '代表的な関数型インターフェース',
        body: 'java.util.function パッケージに多数。Runnable（()→void）、Supplier<T>（()→T）、Consumer<T>（T→void）、Function<T,R>（T→R）、Predicate<T>（T→boolean）、BiFunction<T,U,R> など。'
      }
    ],
    points: [
      '関数型インターフェース = 抽象メソッド1つのインターフェース',
      'ラムダ = (引数) -> 本体',
      'メソッド参照 Type::method は ラムダの短縮',
      'Supplier / Consumer / Function / Predicate を覚える'
    ],
    pitfalls: [
      'ラムダ内から外側のローカル変数を使うとき、その変数は実質 final でないとエラー',
      '複数行ブロックのラムダは { return 値; } のように return が必要',
      'default メソッドが複数あっても抽象メソッドが1つなら関数型インターフェース'
    ]
  },

  // ==================== 第7章: Java SE 17 新機能 (6トピック) ====================
  {
    id: 'ch7-t1', chapter: 7,
    title: 'var — ローカル変数の型推論',
    summary: 'ローカル変数の型を右辺から推論させる。型はコンパイル時に確定するため動的型付けではない。',
    sections: [
      {
        heading: '基本',
        body: 'ローカル変数に限り var と書くと初期化子から型を推論する。一度推論されるとその型に固定される。',
        code: 'var n = 10;                        // int\nvar s = "hello";                   // String\nvar list = new ArrayList<String>(); // ArrayList<String>'
      },
      {
        heading: '使える場所・使えない場所',
        body: '◯ ローカル変数 / 拡張for / 基本for の初期化  × メソッド引数 / フィールド / 戻り値 / catchパラメータ / ラムダ引数（単独のvar）',
        code: 'for (var i = 0; i < 10; i++) { }     // OK\nfor (var s : list) { }               // OK\n\n// void f(var x) { }                  // NG（引数）\n// class C { var field; }             // NG（フィールド）'
      },
      {
        heading: 'null と初期化子必須',
        body: 'var x = null; は型が決まらずエラー。初期化子がない var x; もエラー。'
      }
    ],
    points: [
      'var は ローカル変数限定',
      '初期化子が必須',
      'null リテラル単独では推論不能',
      'ダイヤモンド演算子と組み合わせると Object に推論されがち'
    ],
    pitfalls: [
      'var x = new ArrayList<>(); は ArrayList<Object> に推論される',
      'var は予約語ではなく「型推論キーワード」（変数名としても使える）',
      'コードの可読性が落ちる場面では明示型のほうが良い'
    ]
  },
  {
    id: 'ch7-t2', chapter: 7,
    title: 'switch式（アロー / yield / 網羅性）',
    summary: 'Java 14で正式化。case -> 式 で値を返せる、フォールスルーしない、全ケース網羅が必要。',
    sections: [
      {
        heading: 'アロー形式と式としての switch',
        body: 'case ラベル -> 式; で値を返すか文を実行する。左辺に代入して式としても使える。',
        code: 'String s = switch (day) {\n  case MON, TUE, WED, THU, FRI -> "weekday";\n  case SAT, SUN -> "weekend";\n};'
      },
      {
        heading: 'yield',
        body: 'ブロック { ... } を使うときは yield 値; でその case の値を返す。return はメソッドを抜ける意味なので使えない。',
        code: 'int r = switch (op) {\n  case "double" -> n * 2;\n  case "square" -> {\n    int v = n * n;\n    yield v + 1;\n  }\n  default -> 0;\n};'
      },
      {
        heading: '網羅性',
        body: '値を返すswitch式は全ケースを網羅する必要がある。intなどではdefault必須、enumとsealed階層なら全値を列挙すればdefault省略可能。'
      }
    ],
    points: [
      '-> はフォールスルーしない',
      '複数ラベルはカンマ区切り（case A, B ->）',
      'ブロックから値を返すには yield',
      'switch式は網羅が必須（default または全ケース列挙）'
    ],
    pitfalls: [
      'switch式で return は書けない',
      'break 値; の旧構文は廃止',
      'アロー形式と colon形式の混在は不可'
    ]
  },
  {
    id: 'ch7-t3', chapter: 7,
    title: 'テキストブロック',
    summary: '"""で囲む複数行文字列。共通インデントは自動で除去される。',
    sections: [
      {
        heading: '基本',
        body: '"""の後に改行してから内容を書く。閉じる"""の位置が「インデント基準」になり、各行の先頭空白はその基準まで削られる（incidental whitespace削除）。',
        code: 'String sql = """\n  SELECT *\n  FROM users\n  WHERE id = ?\n  """;\n// → "SELECT *\\nFROM users\\nWHERE id = ?\\n"'
      },
      {
        heading: 'エスケープ',
        body: '\\s は行末の空白を意味のあるスペースにする。行末の \\ は改行を無効化して続行。"""を含めたいときは""で済むか、\\"""でエスケープ。'
      },
      {
        heading: '通常リテラルとの互換',
        body: 'テキストブロックの値はString型。+や.formatted()も使える。文字列プールにも入る。'
      }
    ],
    points: [
      '"""の直後に改行必須（単一行 """x""" はエラー）',
      '共通インデントは閉じ """ 位置を基準に削除',
      '\\s で末尾空白を保持、行末 \\ で行継続',
      '戻り値は通常のString（equalsや+で比較・連結可）'
    ],
    pitfalls: [
      '「改行が最後に入るかどうか」は閉じ """ の置き方で決まる',
      '全角空白や混入したタブでインデント基準が崩れる'
    ]
  },
  {
    id: 'ch7-t4', chapter: 7,
    title: 'record — 不変データクラス',
    summary: '全フィールド final の不変データキャリア。equals / hashCode / toString / アクセッサが自動生成される。',
    sections: [
      {
        heading: '基本',
        body: 'record RecName(型 name, ...) { } で宣言すると、暗黙的に private final フィールドが用意され、コンストラクタ・アクセッサ（getName() ではなく name()）・equals / hashCode / toString が自動生成される。',
        code: 'record Point(int x, int y) {}\n\nPoint p = new Point(1, 2);\nSystem.out.println(p.x());      // 1（getXではない）\nSystem.out.println(p);          // Point[x=1, y=2]'
      },
      {
        heading: 'コンパクトコンストラクタ',
        body: '検証・正規化を書きたいときに使う。引数リストを書かず、引数の再代入で正規化できる（this.xへの代入は不可、暗黙代入が最後に実行される）。',
        code: 'record Range(int from, int to) {\n  public Range {\n    if (from > to) throw new IllegalArgumentException();\n    from = Math.max(0, from);  // 正規化\n  }\n}'
      },
      {
        heading: '制約',
        body: '暗黙的に final（継承不可）、Recordを暗黙継承するため他クラスをextends不可（implementsはOK）、インスタンスフィールドの追加は不可、static メンバは追加可能。'
      }
    ],
    points: [
      '全フィールドが private final（不変）',
      'アクセッサは xxx() （getXxx ではない）',
      'equals / hashCode / toString 自動生成',
      '暗黙 final → 継承不可、他クラスextends不可'
    ],
    pitfalls: [
      'インスタンスフィールドの追加はNG、static はOK',
      'コンパクトコンストラクタでは this.x = x を書いてはいけない',
      '参照型フィールドは「参照が不変」なだけで、指す先が可変（ListなどMutable）な場合は注意'
    ]
  },
  {
    id: 'ch7-t5', chapter: 7,
    title: 'sealed classes / interfaces',
    summary: 'permits 句で継承できるサブクラスを限定する。サブクラスは final / sealed / non-sealed のいずれかで宣言必須。',
    sections: [
      {
        heading: '基本',
        body: 'sealed class Parent permits A, B, C { } で継承できるサブクラスを列挙する。permits に書かれていないクラスは継承不可。',
        code: 'public sealed class Shape permits Circle, Square {}\n\nfinal class Circle extends Shape { /* 終端 */ }\nnon-sealed class Square extends Shape { /* 以降自由に継承可 */ }'
      },
      {
        heading: 'サブクラスの修飾子',
        body: 'sealed の直接サブクラスは必ず以下のいずれか: ① final（これ以上継承不可） ② sealed permits ...（さらに限定） ③ non-sealed（制限解除して自由に継承可）。'
      },
      {
        heading: 'permits の省略条件',
        body: '全サブクラスが同じコンパイル単位（同じ .java ファイル）にある場合は permits 省略可能。コンパイラが自動で検出する。'
      },
      {
        heading: 'switch式との相性',
        body: 'permits で継承が限定されるため、switch式で全サブクラスを列挙すれば default を省略できる（網羅性が静的に保証される）。'
      }
    ],
    points: [
      'sealed + permits で継承を限定',
      'サブクラスは final / sealed / non-sealed 必須',
      '同ファイル内なら permits 省略可',
      'switch式の網羅性が保証される'
    ],
    pitfalls: [
      'permits の中のクラスは必ず宣言しなければならない',
      'モジュール/パッケージ境界を越える permits は制約あり（同モジュール内が原則）'
    ]
  },
  {
    id: 'ch7-t6', chapter: 7,
    title: 'instanceof パターンマッチング',
    summary: 'if (o instanceof Type name) で型チェックと変数バインドを同時に行える。flow scoping で以降の文でも使える。',
    sections: [
      {
        heading: '基本',
        body: 'Java 16 で正式採用。従来は instanceof チェック後に再キャストが必要だったが、パターンマッチングなら1文で済む。',
        code: 'Object o = "hello";\nif (o instanceof String s) {\n  System.out.println(s.length());  // s は自動でString扱い\n}'
      },
      {
        heading: 'スコープ（flow scoping）',
        body: 'パターン変数のスコープは「確実にバインドされている範囲」に広がる。! を使った判定後のreturn などで流れが決まると、以降の文でも使える。',
        code: 'if (!(o instanceof Integer i)) return;\nSystem.out.println(i);   // 以降でも i が使える'
      },
      {
        heading: '論理結合',
        body: '&& は左が true のとき右を評価するので、右側でパターン変数を使える。|| は逆なのでパターン変数が使えない。',
        code: 'if (o instanceof Integer i && i > 0) {\n  System.out.println("positive: " + i);\n}'
      }
    ],
    points: [
      'if (o instanceof Type var) で型チェック + バインド',
      '&& の右ではパターン変数が使える',
      'flow scoping で以降の文でも有効',
      'キャスト不要、コードが簡潔に'
    ],
    pitfalls: [
      'var は instanceof では使えない（型を明示する）',
      '|| の右ではパターン変数は使えない（パターンが失敗したケースだから）',
      '同一スコープで同名のパターン変数を再宣言できない'
    ]
  }
];
