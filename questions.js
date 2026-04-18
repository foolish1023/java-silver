// Java Silver SE 11 相当 練習問題 150問
// 章構成:
// 1章: Javaの基本 (環境・main・パッケージ・import・JVM)
// 2章: データ型と変数 (プリミティブ・リテラル・演算子・キャスト)
// 3章: 制御構造 (if/switch/for/while/break/continue)
// 4章: 配列・文字列・コレクション (String/StringBuilder/配列/ArrayList)
// 5章: クラスとメソッド (クラス定義・コンストラクタ・static・オーバーロード・カプセル化)
// 6章: 継承・ポリモーフィズム・例外・ラムダ (extends/implements/abstract/interface/try-catch/lambda)

const QUESTIONS = [
  // ==================== 第1章: Javaの基本 (25問) ====================
  {
    id: 1, chapter: 1,
    question: "Javaプログラムのエントリーポイントとなるmainメソッドのシグネチャとして正しいものはどれか。",
    choices: [
      "public static void main(String args)",
      "public static void main(String[] args)",
      "public void main(String[] args)",
      "static public main(String[] args)"
    ],
    answer: 1,
    brief: "mainメソッドは public static void main(String[] args) と宣言する。",
    detail: "JVMはクラスをロードした後、publicかつstaticなvoid main(String[] args)を探して実行する。戻り値はvoid、引数はString配列（Stringの可変長引数String... argsも可）。修飾子の順序はpublic staticでもstatic publicでも可だが、どちらも必須。void・String[]のどれかが欠けると起動時にエラーになる。"
  },
  {
    id: 2, chapter: 1,
    question: "Javaのソースファイルに関する記述として正しいものはどれか。",
    choices: [
      "1ファイルに複数のpublicクラスを定義できる",
      "ファイル名はpublicクラスの名前と一致する必要がある",
      "publicでないクラスはソースファイルに記述できない",
      "拡張子は .class である"
    ],
    answer: 1,
    brief: "publicクラスはファイル名と一致させる必要がある。",
    detail: "1つのソースファイルに定義できるpublicクラスは1つだけで、ファイル名（.javaを除いた部分）と完全一致させる必要がある。publicでないクラスは複数定義可能で、それぞれがコンパイルされると個別の.classファイルになる。ソースの拡張子は.java、コンパイル後が.class。"
  },
  {
    id: 3, chapter: 1,
    question: "javaコマンドとjavacコマンドの役割の組み合わせとして正しいものはどれか。",
    choices: [
      "javac=実行, java=コンパイル",
      "javac=コンパイル, java=実行",
      "両方ともコンパイル用",
      "両方とも実行用"
    ],
    answer: 1,
    brief: "javacがコンパイラ、javaがJVM起動（実行）コマンド。",
    detail: "javac（Java Compiler）はソースコード（.java）をバイトコード（.class）に変換するコマンド。java（Java Virtual Machine launcher）は.classファイルを読み込んでJVM上で実行するコマンド。Java 11以降はjava ファイル名.java で直接ソースを実行する機能もある。"
  },
  {
    id: 4, chapter: 1,
    question: "パッケージ宣言とimport文の記述順序として正しいものはどれか。",
    choices: [
      "import文 → package文 → クラス定義",
      "package文 → import文 → クラス定義",
      "クラス定義 → package文 → import文",
      "package文 → クラス定義 → import文"
    ],
    answer: 1,
    brief: "package文 → import文 → クラス定義の順。",
    detail: "ソースファイル先頭にpackage文（省略時は無名パッケージ）、次にimport文、その後にクラス定義を書く。package文は1つだけ、import文は複数可。コメントは任意の位置に書ける。"
  },
  {
    id: 5, chapter: 1,
    question: "java.lang.Stringクラスを使用するために必要なimport文はどれか。",
    choices: [
      "import java.lang.String;",
      "import java.lang.*;",
      "import java.util.String;",
      "不要（自動的にimportされる）"
    ],
    answer: 3,
    brief: "java.langパッケージは自動import。",
    detail: "java.langパッケージのクラス（String/Integer/System/Object等）はimport不要で使える。JVMが暗黙的にimport java.lang.*;を行うと考えればよい。java.utilなど他のパッケージのクラスは明示的にimportが必要。"
  },
  {
    id: 6, chapter: 1,
    question: "次のコードをコンパイル・実行した結果として正しいものはどれか。\n\npublic class Test {\n    public static void main(String[] args) {\n        System.out.println(args.length);\n    }\n}\n\n実行: java Test hello world",
    choices: ["0", "1", "2", "3"],
    answer: 2,
    brief: "コマンドライン引数は args に配列で渡される。hello と world で2個。",
    detail: "java クラス名 の後に書かれた空白区切りの文字列がString[] argsに格納される。この例ではargs[0]=\"hello\", args[1]=\"world\"で、args.lengthは2。クラス名自体は含まれない（C言語のargc/argvとの違い）。"
  },
  {
    id: 7, chapter: 1,
    question: "Javaのコメントの書き方として正しくないものはどれか。",
    choices: [
      "// 1行コメント",
      "/* 複数行コメント */",
      "/** Javadocコメント */",
      "# シャープコメント"
    ],
    answer: 3,
    brief: "#はJavaのコメント記号ではない。",
    detail: "Javaのコメントは //（行コメント）、/* */（ブロックコメント）、/** */（Javadocコメント）の3種類。#はPythonやシェルのコメントでJavaでは構文エラー。"
  },
  {
    id: 8, chapter: 1,
    question: "Javaの識別子（変数名・クラス名など）として使用できないものはどれか。",
    choices: ["_value", "$price", "1stName", "name2"],
    answer: 2,
    brief: "識別子は数字で始められない。",
    detail: "Javaの識別子は英字・_・$で始まり、2文字目以降は英数字・_・$が使える。予約語（if, class, new等）は使えない。1stNameは数字開始のためコンパイルエラー。_valueや$priceは有効（ただし$は自動生成コード用途が一般的）。"
  },
  {
    id: 9, chapter: 1,
    question: "JDKとJREの違いについて正しい記述はどれか。",
    choices: [
      "JDKは実行環境、JREは開発環境",
      "JDKは開発環境（コンパイラ等を含む）、JREは実行環境",
      "JDKとJREは同じもの",
      "JREにはコンパイラが含まれる"
    ],
    answer: 1,
    brief: "JDK=開発キット（javac含む）、JRE=実行環境（JVMのみ）。",
    detail: "JDK（Java Development Kit）は開発に必要なツール一式でjavac・javadoc・javaなどを含む。JRE（Java Runtime Environment）は実行だけに必要なJVMと標準ライブラリ。Java 11以降、JREの単体配布は廃止され、jlinkで必要最小限のランタイムを作成する形になった。"
  },
  {
    id: 10, chapter: 1,
    question: "次のimport文のうち有効なものはどれか。",
    choices: [
      "import java.util.*.ArrayList;",
      "import java.util.ArrayList;",
      "import java.util.ArrayList.*;",
      "import *.ArrayList;"
    ],
    answer: 1,
    brief: "import java.util.ArrayList; が正しい。",
    detail: "import文は「import パッケージ.クラス;」または「import パッケージ.*;」の形式。*は末尾の1階層のみ指定可能で、import java.util.*;はjava.util直下のクラスしかimportしない（サブパッケージは含まない）。static importはimport static で始まる。"
  },
  {
    id: 11, chapter: 1,
    question: "static import文の使用例として正しいものはどれか。",
    choices: [
      "import static java.lang.Math.PI;",
      "static import java.lang.Math.PI;",
      "import java.lang.static Math.PI;",
      "import java.lang.Math.static PI;"
    ],
    answer: 0,
    brief: "import static パッケージ.クラス.メンバ; の順。",
    detail: "static importはクラスのstaticメンバを修飾なしで使えるようにする機能。import static java.lang.Math.*; とすると Math.PI が単に PI で参照できる。キーワードの順序はimportが先でstaticが後。"
  },
  {
    id: 12, chapter: 1,
    question: "デフォルトパッケージ（無名パッケージ）に関する正しい記述はどれか。",
    choices: [
      "package文を書かないクラスは無名パッケージに属する",
      "無名パッケージのクラスは他のパッケージからimportできる",
      "package default; と書く必要がある",
      "無名パッケージのクラスは実行できない"
    ],
    answer: 0,
    brief: "package文がないクラスは無名パッケージに属する。",
    detail: "package文を書かないと無名パッケージになり、同じ無名パッケージ内のクラス同士は参照できるが、名前付きパッケージからは参照できない（importの指定方法がないため）。実用では必ずパッケージを切るべき。"
  },
  {
    id: 13, chapter: 1,
    question: "Javaプラットフォームの「Write Once, Run Anywhere」を実現している仕組みはどれか。",
    choices: [
      "ソースコードを各OS用にコンパイルするため",
      "OSごとに専用のコンパイラを使うため",
      "バイトコードをJVMが各OS用に解釈実行するため",
      "Javaは1つのOSでしか動かないため"
    ],
    answer: 2,
    brief: "OSごとのJVMが共通バイトコードを実行するため移植性が高い。",
    detail: "Javaのソースコードはコンパイルすると中間形式のバイトコード（.class）になる。各OS用のJVMがそのバイトコードを解釈実行するため、一度コンパイルすれば任意のOSで動作する（Write Once, Run Anywhere）。"
  },
  {
    id: 14, chapter: 1,
    question: "次のクラス定義のうち、1つのソースファイル Main.java に書けないものはどれか。",
    choices: [
      "public class Main と class Helper",
      "public class Main と class Util と class Tool",
      "public class Main と public class Helper",
      "public class Main のみ"
    ],
    answer: 2,
    brief: "publicクラスは1ファイルに1つまで。",
    detail: "1つの.javaファイルにpublicクラスは最大1個しか定義できない。非publicクラス（デフォルトアクセス）は何個でも書ける。publicが2つあるとコンパイルエラー。"
  },
  {
    id: 15, chapter: 1,
    question: "mainメソッドの宣言として有効でないものはどれか。",
    choices: [
      "public static void main(String[] args)",
      "public static void main(String... args)",
      "static public void main(String[] args)",
      "public void main(String[] args)"
    ],
    answer: 3,
    brief: "staticがないとJVMから呼び出せない。",
    detail: "mainメソッドはstatic必須（インスタンス化せず呼び出すため）、戻り値void、引数はString[]またはString...（可変長引数）。public static voidの順序は入れ替え可能。finalやsynchronizedは付けられるが、staticは絶対に必要。"
  },
  {
    id: 16, chapter: 1,
    question: "次のコードの出力はどれか。\n\npublic class Test {\n    public static void main(String[] args) {\n        System.out.print(\"A\");\n        System.out.println(\"B\");\n        System.out.print(\"C\");\n    }\n}",
    choices: ["A\\nB\\nC", "AB\\nC", "ABC", "A B C"],
    answer: 1,
    brief: "printlnだけが改行を出力する。print は改行しない。",
    detail: "System.out.printは改行なし、System.out.printlnは末尾に改行を付ける。この例ではA→B（+改行）→Cの順で出力されるので「AB\\nC」（ABの後に改行、そしてC）となる。"
  },
  {
    id: 17, chapter: 1,
    question: "Javaのパッケージとディレクトリ構造の関係について正しいものはどれか。",
    choices: [
      "パッケージ名とディレクトリ構造は無関係",
      "パッケージ名のドットがディレクトリの階層に対応する",
      "パッケージ名はすべて1つのディレクトリに配置する",
      "パッケージ名の大文字小文字は区別されない"
    ],
    answer: 1,
    brief: "com.example.app → com/example/app/ のディレクトリに配置する。",
    detail: "Javaではパッケージ名のドットがディレクトリ階層に対応する。com.example.appパッケージのクラスは com/example/app/ ディレクトリに置く必要がある。この規約に従わないとクラスローダーがクラスを見つけられずClassNotFoundExceptionが発生する。"
  },
  {
    id: 18, chapter: 1,
    question: "次のコードをコンパイルしたときに起こることはどれか。\n\npublic class Sample {\n    public static void main(String[] args) {\n        System.out.println(\"Hello\")\n    }\n}",
    choices: [
      "正常にコンパイルされ Hello と出力",
      "セミコロン不足でコンパイルエラー",
      "警告が出るが実行は可能",
      "実行時エラーになる"
    ],
    answer: 1,
    brief: "文末のセミコロンがないためコンパイルエラー。",
    detail: "Javaでは文（statement）の末尾にセミコロン ; が必要。このコードではprintlnの後にセミコロンがないので 「';' expected」というコンパイルエラーになる。実行以前の問題。"
  },
  {
    id: 19, chapter: 1,
    question: "コマンドラインから java -cp . com.example.Main と実行したときの挙動の説明として正しいものはどれか。",
    choices: [
      "カレントディレクトリをクラスパスに指定しcom.example.Mainを実行",
      "-cpは-classpathの対義語で除外指定",
      "com.example.Main.javaを直接実行",
      "com.example.Mainをコンパイルする"
    ],
    answer: 0,
    brief: "-cp（-classpath）でクラスパスを指定して実行する。",
    detail: "-cp（または-classpath）オプションはJVMがクラスファイルを探すパスを指定する。 . はカレントディレクトリ。 com.example.Main はFQCN（完全修飾クラス名）で、実際には./com/example/Main.class を探して実行する。"
  },
  {
    id: 20, chapter: 1,
    question: "以下のソースが Main.java に書かれているとき、javac でコンパイルすると生成される .class ファイルはどれか。\n\npublic class Main {}\nclass Helper {}\nclass Util {}",
    choices: [
      "Main.class のみ",
      "Main.class と Helper.class",
      "Main.class, Helper.class, Util.class",
      "1つの Main.class にすべてまとめられる"
    ],
    answer: 2,
    brief: "クラスごとに.classファイルが生成される。",
    detail: "1つの.javaファイルに複数クラスがあっても、コンパイラはクラスごとに別々の.classファイルを生成する。ネストクラスの場合はOuter$Inner.classという名前になる。"
  },
  {
    id: 21, chapter: 1,
    question: "Javaの予約語でないものはどれか。",
    choices: ["goto", "const", "null", "String"],
    answer: 3,
    brief: "Stringはクラス名で予約語ではない。",
    detail: "Javaの予約語（キーワード）には、gotoとconstが含まれる（予約だけで使用は未実装）。null・true・falseはリテラルで予約されている。StringはJavaクラスだが予約語ではないため、（非推奨だが）変数名として使うことも可能。"
  },
  {
    id: 22, chapter: 1,
    question: "以下の実行結果の説明として正しいものはどれか。\n\npublic class Sample {\n    public static void main(String[] args) {\n        System.out.println(args[0]);\n    }\n}\n\n実行: java Sample",
    choices: [
      "null が出力される",
      "空文字が出力される",
      "ArrayIndexOutOfBoundsException で実行時例外",
      "コンパイルエラー"
    ],
    answer: 2,
    brief: "引数なしで実行するとargs.length=0でargs[0]は例外。",
    detail: "引数なしで起動した場合、argsはnullではなく長さ0のString配列（String[0]）になる。args[0]にアクセスするとArrayIndexOutOfBoundsExceptionが発生する。コンパイルは通る点に注意。"
  },
  {
    id: 23, chapter: 1,
    question: "Javaにおけるソースファイル名のルールとして正しいものはどれか。",
    choices: [
      "publicクラスがある場合、ファイル名はそのクラス名と一致する必要がある",
      "ファイル名は小文字で始める必要がある",
      "ファイル名は必ずMainで始める",
      "ファイル名に数字を含めてはいけない"
    ],
    answer: 0,
    brief: "publicクラス名 = ファイル名 のルール。",
    detail: "publicクラスがソースにある場合、ファイル名（拡張子を除く）はそのクラス名と完全一致する必要がある（大文字小文字含む）。publicクラスがない場合はファイル名は任意（慣習として含まれるクラス名に合わせる）。"
  },
  {
    id: 24, chapter: 1,
    question: "次のコードの出力はどれか。\n\npublic class Test {\n    public static void main(String[] args) {\n        System.out.printf(\"%d+%d=%d\", 1, 2, 1+2);\n    }\n}",
    choices: ["1+2=3", "%d+%d=%d", "1 2 3", "コンパイルエラー"],
    answer: 0,
    brief: "printfは書式指定出力。%d は整数に置換される。",
    detail: "printfはC言語のprintfと同様の書式付き出力。%dは10進整数、%sは文字列、%fは浮動小数点。改行は含まれないので注意。%n はOS依存の改行文字で、\\nと違ってOSに合わせた改行が出力される。"
  },
  {
    id: 25, chapter: 1,
    question: "package com.example;  と書かれたソースの .class ファイルをクラスパスに正しく配置する方法はどれか。",
    choices: [
      "classes/Main.class として配置",
      "classes/com/example/Main.class として配置",
      "classes/com.example/Main.class として配置",
      "com/example/classes/Main.class として配置"
    ],
    answer: 1,
    brief: "パッケージ名のドットをディレクトリに変換して配置する。",
    detail: "クラスパスのルートからパッケージの階層をディレクトリとして作り、その中に.classを置く。com.example.Main なら classpath/com/example/Main.class。このルールを守らないとJVMがクラスを発見できずNoClassDefFoundErrorになる。"
  },

  // ==================== 第2章: データ型と変数 (25問) ====================
  {
    id: 26, chapter: 2,
    question: "Javaのプリミティブ型でないものはどれか。",
    choices: ["int", "boolean", "String", "char"],
    answer: 2,
    brief: "Stringは参照型（クラス）。",
    detail: "Javaのプリミティブ型は8つ: byte, short, int, long, float, double, char, boolean。Stringはjava.lang.Stringクラスの参照型。プリミティブ型は小文字で始まり、参照型は大文字で始まる（慣習）。"
  },
  {
    id: 27, chapter: 2,
    question: "int型の範囲として正しいものはどれか。",
    choices: [
      "-128 〜 127",
      "-32768 〜 32767",
      "-2^31 〜 2^31-1",
      "-2^63 〜 2^63-1"
    ],
    answer: 2,
    brief: "intは32bit符号付き整数で -2^31 〜 2^31-1。",
    detail: "byte=8bit(-128〜127)、short=16bit(-32768〜32767)、int=32bit(-2^31〜2^31-1 約±21億)、long=64bit(-2^63〜2^63-1)。floatは32bit、doubleは64bitの浮動小数点。"
  },
  {
    id: 28, chapter: 2,
    question: "次のコードをコンパイルしたときの結果はどれか。\n\nint x = 10;\nlong y = x;\nint z = y;",
    choices: [
      "正常にコンパイルされる",
      "2行目でコンパイルエラー",
      "3行目でコンパイルエラー（明示的キャストが必要）",
      "実行時エラー"
    ],
    answer: 2,
    brief: "long→intは縮小変換で明示的キャストが必要。",
    detail: "int→long は拡大変換で暗黙的に行われる（サイズが大きい方向）。long→int は縮小変換で情報が失われる可能性があるため明示的キャスト (int)y が必要。なしだとコンパイルエラー「incompatible types: possible lossy conversion」。"
  },
  {
    id: 29, chapter: 2,
    question: "次のリテラル表現で有効なlong型リテラルはどれか。",
    choices: ["1000000", "1_000_000", "1000000L", "long 1000000"],
    answer: 2,
    brief: "long型リテラルは末尾にL（またはl）を付ける。",
    detail: "long型リテラルは末尾にL/lを付ける（小文字のlは1と紛らわしいのでL推奨）。整数リテラルは既定でint型。1_000_000 のアンダースコア区切りはJava 7以降で可能（可読性向上）だがlongリテラルにはならない。"
  },
  {
    id: 30, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint a = 10;\nint b = 3;\nSystem.out.println(a / b);",
    choices: ["3.333", "3.0", "3", "3.33"],
    answer: 2,
    brief: "int同士の除算は整数除算で小数部は切り捨て。",
    detail: "Javaではint/intの結果はintとなり、小数部は切り捨てられる。10/3=3（3.333...ではない）。浮動小数点の結果が欲しい場合は片方をdoubleにする（10.0/3や(double)a/b）。"
  },
  {
    id: 31, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint x = 5;\nSystem.out.println(x++);\nSystem.out.println(++x);",
    choices: ["5, 6", "5, 7", "6, 7", "6, 6"],
    answer: 1,
    brief: "x++は後置（評価後に加算）、++xは前置（加算後に評価）。",
    detail: "x++は「現在の値を返してから+1」、++xは「+1してから値を返す」。最初のprintでx=5が出力されxは6に。次のprintで++xは7に増やしてから7を出力。結果は5と7。"
  },
  {
    id: 32, chapter: 2,
    question: "次のコードの結果はどれか。\n\nboolean flag = true;\nif (flag = false) {\n    System.out.println(\"true\");\n} else {\n    System.out.println(\"false\");\n}",
    choices: ["true", "false", "コンパイルエラー", "実行時エラー"],
    answer: 1,
    brief: "= は代入。flag = falseの代入結果がfalseで評価される。",
    detail: "flag = false は代入式。代入結果（flagの新しい値 false）がif文の条件になる。よってelse節が実行されfalseが出力。比較演算子 == との混同に注意。なおCと違いJavaはintをboolean条件に使えないので、if(0)などはエラー。"
  },
  {
    id: 33, chapter: 2,
    question: "char型に関する正しい記述はどれか。",
    choices: [
      "char型は符号付き16bit整数",
      "char型は符号なし16bit整数（0〜65535）",
      "char型は8bitのASCII文字",
      "char型は32bit Unicode"
    ],
    answer: 1,
    brief: "charは符号なし16bitでUnicode（UTF-16コード単位）を表す。",
    detail: "char型は0〜65535の符号なし16bit整数で、UTF-16のコード単位を格納する。int型への自動変換が可能で 'A'+1=66 のような演算もできる。サロゲートペアで表現されるコードポイント（絵文字等）は2つのchar必要。"
  },
  {
    id: 34, chapter: 2,
    question: "次の変数宣言でコンパイルエラーになるものはどれか。",
    choices: [
      "byte b = 100;",
      "byte b = 128;",
      "byte b = -128;",
      "byte b = (byte)200;"
    ],
    answer: 1,
    brief: "byteの範囲は-128〜127。128は範囲外でエラー。",
    detail: "byteは-128〜127の範囲。128は範囲外なのでコンパイルエラー「incompatible types: possible lossy conversion」。ただし定数式であればその範囲内に収まる場合は暗黙的に縮小変換される（100はOK）。明示的キャストがあれば範囲外も通るが値はオーバーフローする。"
  },
  {
    id: 35, chapter: 2,
    question: "次のコードの出力はどれか。\n\ndouble d = 10.0 / 0;\nSystem.out.println(d);",
    choices: ["0.0", "Infinity", "NaN", "ArithmeticException"],
    answer: 1,
    brief: "浮動小数点の0除算はInfinityまたはNaN。例外は起きない。",
    detail: "整数型同士の0除算はArithmeticException（/ by zero）だが、浮動小数点の0除算は例外にならず、正の数/0=Infinity、負の数/0=-Infinity、0.0/0.0=NaN となる。IEEE 754準拠の挙動。"
  },
  {
    id: 36, chapter: 2,
    question: "次のコードの出力はどれか。\n\nSystem.out.println(10 % 3);",
    choices: ["3", "1", "3.33", "0"],
    answer: 1,
    brief: "%は剰余演算子。10÷3=3あまり1。",
    detail: "%は剰余を返す演算子。10÷3=3あまり1なので結果は1。負数の場合は被除数の符号に従う（-10%3は-1）。浮動小数点にも使える（10.5%3=1.5）。"
  },
  {
    id: 37, chapter: 2,
    question: "次の比較演算子の使用例でコンパイルエラーになるものはどれか。",
    choices: [
      "int a = 1; if (a == 1) {}",
      "String s = \"a\"; if (s == \"a\") {}",
      "int a = 1; if (a = 1) {}",
      "boolean b = true; if (b == true) {}"
    ],
    answer: 2,
    brief: "ifの条件にint代入式は使えない（booleanでなければNG）。",
    detail: "Javaではif文の条件はboolean型でなければならない。a=1はintを代入する式でintを返すためエラー。一方 b=true ならbooleanなのでOK（バグを生みやすいが構文は有効）。なお s==\"a\" は参照比較なので等しく見えても結果はfalseになる可能性がある点に注意（コンパイルは通る）。"
  },
  {
    id: 38, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint i = 'A';\nSystem.out.println(i);",
    choices: ["A", "65", "0", "コンパイルエラー"],
    answer: 1,
    brief: "'A' のUnicode値は65。charからintへの暗黙変換が起こる。",
    detail: "char型はintに暗黙的に変換可能。'A'のUTF-16コード値（=ASCII値）は65。int型の変数に代入したので数値として出力される。逆方向（int→char）は明示的キャストが必要。"
  },
  {
    id: 39, chapter: 2,
    question: "次の論理演算の結果はどれか。\n\nboolean r = true && false || true;\nSystem.out.println(r);",
    choices: ["true", "false", "コンパイルエラー", "実行時エラー"],
    answer: 0,
    brief: "&&は||より優先度が高い。(true && false) || true = true。",
    detail: "&&は||より演算子優先度が高いので、true && false が先に評価され false。次に false || true で true。結果はtrue。短絡評価で&&は左がfalseなら右を評価しない、||は左がtrueなら右を評価しない。"
  },
  {
    id: 40, chapter: 2,
    question: "次の変数宣言でコンパイルが通るものはどれか。",
    choices: [
      "int x = 3.14;",
      "float f = 3.14;",
      "double d = 3.14;",
      "long L = 3.14;"
    ],
    answer: 2,
    brief: "浮動小数点リテラルのデフォルトはdouble。float変数にはFを付ける必要がある。",
    detail: "3.14は既定でdouble型。intやlong（整数型）には暗黙的に変換できない。float型変数への代入も縮小変換なのでfloat f = 3.14f; と書く必要がある。doubleはそのままdouble d = 3.14;で代入可能。"
  },
  {
    id: 41, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint a = 5;\nint b = 10;\nSystem.out.println(a + b + \"=sum\");",
    choices: ["5+10=sum", "15=sum", "ab=sum", "a+b=sum"],
    answer: 1,
    brief: "+は左から評価。int+intは加算、+Stringで連結。",
    detail: "+演算子は左結合。a+bがまずintの加算で15になり、その後 15+\"=sum\" は文字列連結で \"15=sum\"。「String + 数値 + 数値」のように左から始まるとすべて文字列連結になるので順序に注意。"
  },
  {
    id: 42, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint x = 1;\nint y = x++ + ++x;\nSystem.out.println(y);",
    choices: ["2", "3", "4", "5"],
    answer: 2,
    brief: "x++ は1を返しxは2に、++xでxは3になり3を返す。1+3=4。",
    detail: "x++（後置）は現在値1を返した後にxを2にする。次の++x（前置）でxを3にしてから3を返す。よってy = 1 + 3 = 4。副作用のある式は可読性が悪いので実務では避ける。"
  },
  {
    id: 43, chapter: 2,
    question: "次のコードの出力はどれか。\n\ndouble d = 0.1 + 0.2;\nSystem.out.println(d == 0.3);",
    choices: ["true", "false", "コンパイルエラー", "実行時エラー"],
    answer: 1,
    brief: "浮動小数点は誤差があり 0.1+0.2 は厳密に 0.3 にならない。",
    detail: "IEEE 754の2進浮動小数点では0.1も0.2も正確に表現できない。0.1+0.2は0.30000000000000004となり、0.3（これも厳密には0.3ではない別の近似値）とは異なる。金額計算などにはBigDecimalを使うのが定石。"
  },
  {
    id: 44, chapter: 2,
    question: "次のうちローカル変数として正しく初期化されていない宣言はどれか。",
    choices: [
      "int a = 0;",
      "int a;",
      "int[] arr = new int[3];",
      "String s = null;"
    ],
    answer: 1,
    brief: "ローカル変数は初期化されないと使用時にコンパイルエラー。",
    detail: "ローカル変数は既定値がなく、初期化せずに読み取るとコンパイルエラー。int a; と宣言だけならエラーにならないが、その後読み取り使用するとエラーになる。フィールド変数は既定値（int=0, boolean=false, 参照=null）で自動初期化される。"
  },
  {
    id: 45, chapter: 2,
    question: "次のキャスト式の結果はどれか。\n\nint i = (int)3.9;\nSystem.out.println(i);",
    choices: ["3", "4", "3.9", "0"],
    answer: 0,
    brief: "double→intへのキャストは小数部を切り捨て（truncate）。",
    detail: "浮動小数点から整数型への明示的キャストは小数部を切り捨てる（四捨五入ではない）。3.9も-3.9も整数部は3/-3になる。四捨五入したい場合はMath.round()を使う。"
  },
  {
    id: 46, chapter: 2,
    question: "次のコードの結果はどれか。\n\nbyte a = 10;\nbyte b = 20;\nbyte c = a + b;",
    choices: [
      "正常コンパイル、c=30",
      "コンパイルエラー（int→byteの明示的キャストが必要）",
      "オーバーフローで実行時エラー",
      "c=0 になる"
    ],
    answer: 1,
    brief: "byte+byte はintに昇格する。byteに代入するには明示的キャストが必要。",
    detail: "byte/short同士の算術演算はintに自動昇格する。結果のintをbyteに代入するには (byte)(a+b) の明示的キャストが必要。これがないと「incompatible types: possible lossy conversion from int to byte」エラー。"
  },
  {
    id: 47, chapter: 2,
    question: "final修飾子を付けた変数の特徴として正しいものはどれか。",
    choices: [
      "値を何度でも変更できる",
      "一度代入したら再代入できない（定数）",
      "nullに戻すことができる",
      "staticと同じ意味"
    ],
    answer: 1,
    brief: "finalは再代入禁止。実質的な定数。",
    detail: "final変数は一度値を代入すると再代入できない。プリミティブ型なら値の変更不可、参照型なら参照先の再代入不可（オブジェクトの中身の変更は可能）。final int MAX = 100; のようにクラス定数は通常 static final で使う。"
  },
  {
    id: 48, chapter: 2,
    question: "次のコードの出力はどれか。\n\nint x = 10;\nint y = 20;\nSystem.out.println(x > y ? \"x\" : y > x ? \"y\" : \"=\");",
    choices: ["x", "y", "=", "コンパイルエラー"],
    answer: 1,
    brief: "三項演算子はネスト可能。x>y=false → y>x=true → \"y\" を返す。",
    detail: "三項演算子 condition?a:b は右結合。x>y?\"x\":(y>x?\"y\":\"=\") と解釈される。10>20はfalseなので後半を評価、20>10はtrueなので\"y\"が出力。"
  },
  {
    id: 49, chapter: 2,
    question: "Stringの比較でよくあるバグについて正しい記述はどれか。",
    choices: [
      "== と equals は常に同じ結果",
      "== は参照比較、equalsは内容比較（通常はequalsを使う）",
      "== は内容比較、equalsは参照比較",
      "Stringには==もequalsも使えない"
    ],
    answer: 1,
    brief: "Stringの内容比較には必ずequalsを使う。==は参照比較。",
    detail: "Javaの == は参照型に使うと「参照が同じか（同じオブジェクトか）」を比較する。Stringの内容を比較するには equals() を使う。リテラル同士は文字列プール（インターン）で同じ参照になることが多くたまたま==でもtrueになるが、これに依存するのはNG。"
  },
  {
    id: 50, chapter: 2,
    question: "var を使った型推論（Java 10以降）について正しい記述はどれか。",
    choices: [
      "ローカル変数でのみ使える",
      "フィールド変数で使える",
      "メソッド引数で使える",
      "戻り値の型として使える"
    ],
    answer: 0,
    brief: "varはローカル変数の型推論でのみ使用可能。",
    detail: "Java 10で導入されたvar はローカル変数型推論（LVTI）専用。フィールド・メソッド引数・戻り値には使えない。初期化式から型が推論されるため、var x = 10; は int x = 10; と同じ。var x; のように初期化なしはエラー。"
  },

  // ==================== 第3章: 制御構造 (25問) ====================
  {
    id: 51, chapter: 3,
    question: "次のコードの出力はどれか。\n\nint x = 5;\nif (x > 0)\n    if (x > 10)\n        System.out.println(\"A\");\n    else\n        System.out.println(\"B\");",
    choices: ["A", "B", "何も出力されない", "コンパイルエラー"],
    answer: 1,
    brief: "elseは最も近いifに結合する（ダングリング・else）。",
    detail: "elseは最も近い未結合のifに結びつく。このコードは if(x>0){ if(x>10) A; else B; } と同じ意味。x=5なので外側のifはtrue、内側のifはfalseでelse側が実行され B が出力。"
  },
  {
    id: 52, chapter: 3,
    question: "次のswitch文の出力はどれか。\n\nint day = 2;\nswitch (day) {\n    case 1: System.out.print(\"Mon\");\n    case 2: System.out.print(\"Tue\");\n    case 3: System.out.print(\"Wed\");\n    default: System.out.print(\"?\");\n}",
    choices: ["Tue", "TueWed?", "Wed", "?"],
    answer: 1,
    brief: "breakがないのでフォールスルー（下のcaseに落ちていく）。",
    detail: "switchはマッチしたcaseから実行開始し、breakがない限り下のcaseも実行される（フォールスルー）。day=2ならcase 2から始まり、Tue→Wed→?と全部出力。意図しないフォールスルーはバグの元なので基本はbreakを書く。"
  },
  {
    id: 53, chapter: 3,
    question: "switch文のcase式に使えない型はどれか（Java 11基準）。",
    choices: ["int", "String", "double", "enum"],
    answer: 2,
    brief: "switchは byte/short/int/char/String/enum のみ。doubleは不可。",
    detail: "Javaのswitch式で使えるのは byte, short, int, char（およびラッパー）、String（Java 7以降）、enum。doubleやfloat、longは使えない。case式はコンパイル時定数でなければならない。"
  },
  {
    id: 54, chapter: 3,
    question: "次のforループの実行回数はどれか。\n\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}",
    choices: ["4回", "5回", "6回", "無限ループ"],
    answer: 1,
    brief: "iは0,1,2,3,4の5回出力される。",
    detail: "for文は「初期化; 継続条件; 更新」の構造。i=0から始まり、i<5の間実行、毎回iを+1。i=0,1,2,3,4の5回実行され、i=5になるとi<5がfalseで終了。"
  },
  {
    id: 55, chapter: 3,
    question: "次のコードの出力はどれか。\n\nint i = 0;\nwhile (i < 3) {\n    System.out.print(i);\n    i++;\n}",
    choices: ["012", "0123", "123", "12"],
    answer: 0,
    brief: "i=0,1,2の順に出力される。i=3で条件がfalse。",
    detail: "while文は条件を先に評価し、trueの間実行する。i=0,1,2で各回出力し、i=3でi<3がfalseになり終了。結果は012。do-whileは条件を後で評価するので最低1回実行する点が異なる。"
  },
  {
    id: 56, chapter: 3,
    question: "do-while文とwhile文の違いはどれか。",
    choices: [
      "do-whileは条件をチェックしてから実行するのでループしないこともある",
      "do-whileは最初に1回は必ず実行される",
      "do-whileは条件が逆になる",
      "違いはない"
    ],
    answer: 1,
    brief: "do-whileは条件判定前に最低1回実行。",
    detail: "while(cond){} は条件を先に判定するので最初からfalseなら0回実行。do{}while(cond); は処理を実行してから条件判定なので、最低1回は実行される。入力バリデーションループに向く。"
  },
  {
    id: 57, chapter: 3,
    question: "次のコードの結果はどれか。\n\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) break;\n    System.out.print(i);\n}",
    choices: ["012", "01", "0123", "01234"],
    answer: 1,
    brief: "breakは最も内側のループを抜ける。i=2で抜けるので 01 が出力。",
    detail: "breakは最も内側のループ（またはswitch）から抜ける。i=0でprint→i=1でprint→i=2でbreak。結果は01。一方continueはループの次のイテレーションにスキップする。"
  },
  {
    id: 58, chapter: 3,
    question: "次のコードの結果はどれか。\n\nfor (int i = 0; i < 5; i++) {\n    if (i == 2) continue;\n    System.out.print(i);\n}",
    choices: ["01234", "0134", "012", "0123"],
    answer: 1,
    brief: "continueはその回をスキップ。i=2だけ出力されない。",
    detail: "continueは現在のイテレーションをスキップして次のイテレーションに進む。i=2のときprintがスキップされるので 0,1,3,4 が出力。ループ自体は継続する点がbreakと異なる。"
  },
  {
    id: 59, chapter: 3,
    question: "拡張for文（for-each）で配列要素を変更しようとした場合の挙動として正しいものはどれか。\n\nint[] arr = {1, 2, 3};\nfor (int n : arr) {\n    n = n * 2;\n}",
    choices: [
      "配列要素が2倍になる",
      "配列要素は変化しない（nはコピー）",
      "コンパイルエラー",
      "実行時例外"
    ],
    answer: 1,
    brief: "for-eachのループ変数は要素のコピー。元配列は変わらない。",
    detail: "for-eachで受け取る変数は要素の値のコピー（プリミティブ）または参照のコピー（オブジェクト）。プリミティブの場合、nへの代入は元の配列には反映されない。要素を書き換えるにはインデックス付きforを使う。"
  },
  {
    id: 60, chapter: 3,
    question: "次のラベル付きbreakの挙動として正しいものはどれか。\n\nouter:\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (j == 1) break outer;\n        System.out.println(i + \",\" + j);\n    }\n}",
    choices: [
      "i=0,j=0 のみ出力",
      "i=0,1,2 の各j=0が出力",
      "i=0,j=0 → i=1,j=0 → i=2,j=0 の3回",
      "無限ループ"
    ],
    answer: 0,
    brief: "break outer でouterラベルのループを抜ける。i=0,j=0のみ。",
    detail: "ラベル付きbreakは指定ラベルのループから抜ける。i=0,j=0でprint。j=1でbreak outerが実行され外側のforも抜ける。結果として出力は1回だけ。"
  },
  {
    id: 61, chapter: 3,
    question: "次のコードの出力はどれか。\n\nString s = \"B\";\nswitch (s) {\n    case \"A\": System.out.print(\"a\"); break;\n    case \"B\": System.out.print(\"b\"); break;\n    case \"C\": System.out.print(\"c\"); break;\n}",
    choices: ["a", "b", "c", "コンパイルエラー"],
    answer: 1,
    brief: "Java 7以降StringもswitchでOK。 \"B\" のケースで b が出力。",
    detail: "Java 7以降、switchの式としてStringが使える。内部的には文字列のハッシュ値で比較される（実装詳細）。比較はequals()に基づく（==ではない）。nullを渡すとNullPointerExceptionになるので注意。"
  },
  {
    id: 62, chapter: 3,
    question: "次のforループの結果はどれか。\n\nfor (int i = 0, j = 10; i < j; i++, j--) {\n    System.out.print(i + \",\" + j + \" \");\n}",
    choices: [
      "0,10 1,9 2,8 3,7 4,6 ",
      "0,10 1,9 2,8 3,7 ",
      "無限ループ",
      "コンパイルエラー"
    ],
    answer: 0,
    brief: "i++とj--を交互に進め、i<jで終了。5回実行される。",
    detail: "for文の初期化部と更新部はカンマ区切りで複数式を書ける。i:0→1→2→3→4、j:10→9→8→7→6 と進み、i=5,j=5でi<jがfalseで終了。5回分が出力される。"
  },
  {
    id: 63, chapter: 3,
    question: "無限ループの書き方として正しいものはどれか。",
    choices: [
      "for (;;) { }",
      "while (true) { }",
      "do { } while (true);",
      "すべて正しい"
    ],
    answer: 3,
    brief: "すべて無限ループ。抜けるにはbreakやreturn。",
    detail: "for(;;){} は条件式省略で常にtrue扱いの無限ループ。while(true){} と do{}while(true); も同様。いずれもbreak/return/例外でしか抜けられない。while()の条件を省略するとコンパイルエラーになる点に注意。"
  },
  {
    id: 64, chapter: 3,
    question: "次のコードの出力はどれか。\n\nint x = 0;\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        x++;\n    }\n}\nSystem.out.println(x);",
    choices: ["3", "6", "9", "27"],
    answer: 2,
    brief: "3×3=9回x++が実行される。",
    detail: "二重ループで外側3回×内側3回=9回。x++がそのたびに実行されるので最終的にx=9。ループの積が総実行回数になる基本形。"
  },
  {
    id: 65, chapter: 3,
    question: "switch文でbreakを書かない場合の現象を何と呼ぶか。",
    choices: ["スキップ", "フォールスルー", "ジャンプ", "スイッチアウト"],
    answer: 1,
    brief: "breakがなく次のcaseに落ちていく現象をフォールスルーと呼ぶ。",
    detail: "breakを省略するとマッチしたcaseから下のcase全部が順番に実行される。これをフォールスルー（fall through）と呼ぶ。意図的に使う場面（case 1: case 2: のようにまとめる）もあるが、通常は書き忘れがバグになりやすい。"
  },
  {
    id: 66, chapter: 3,
    question: "次のコードの結果はどれか。\n\nint i = 5;\nif (i > 0)\n    if (i > 10)\n        System.out.println(\"big\");\nelse\n    System.out.println(\"small\");",
    choices: ["big", "small", "何も出力されない", "コンパイルエラー"],
    answer: 1,
    brief: "インデントに関わらずelseは最も近いifに結合する。",
    detail: "Javaはインデントを見ない。elseは最も近い未結合ifに結びつくので、else は「if(i>10)」の方に結合。外側のif(i>0)はtrueで中に入り、i>10はfalseなのでelse節が実行されsmallが出力。"
  },
  {
    id: 67, chapter: 3,
    question: "次のコードで3回 Hello が出力されるものはどれか。",
    choices: [
      "for (int i = 0; i < 3; i--) { System.out.println(\"Hello\"); }",
      "for (int i = 3; i > 0; i--) { System.out.println(\"Hello\"); }",
      "for (int i = 0; i <= 3; i++) { System.out.println(\"Hello\"); }",
      "for (int i = 1; i < 3; i++) { System.out.println(\"Hello\"); }"
    ],
    answer: 1,
    brief: "i=3,2,1で3回実行される選択肢B。",
    detail: "A:i--で無限ループ。B:i=3,2,1で3回実行。C:i=0,1,2,3で4回実行。D:i=1,2で2回実行。3回出力されるのはB。"
  },
  {
    id: 68, chapter: 3,
    question: "次のコードの出力はどれか。\n\nint n = 10;\nif (n % 2 == 0 && n > 5) {\n    System.out.print(\"A\");\n} else if (n % 2 == 0) {\n    System.out.print(\"B\");\n} else {\n    System.out.print(\"C\");\n}",
    choices: ["A", "B", "C", "AB"],
    answer: 0,
    brief: "n=10は偶数かつ>5なのでAが実行される。else ifは後続は評価しない。",
    detail: "if-else ifは最初にマッチした条件のブロックだけを実行する。n=10は偶数（n%2==0:true）かつn>5（true）なので最初のブロックでAが出力され、以降のelse節は評価されない。"
  },
  {
    id: 69, chapter: 3,
    question: "次のコードの結果はどれか。\n\nint i = 0;\ndo {\n    System.out.print(i);\n    i++;\n} while (i < 0);",
    choices: ["0", "何も出力されない", "無限ループ", "コンパイルエラー"],
    answer: 0,
    brief: "do-whileは最低1回実行。条件がfalseなので1回で終了。",
    detail: "do-whileは処理後に条件判定する。最初にprint(0)されてiが1に、その後 1<0 はfalseでループ終了。while(i<0)だけなら0回実行だが、do-whileは最低1回走る。"
  },
  {
    id: 70, chapter: 3,
    question: "次のコードの出力はどれか。\n\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        if (i == j) continue;\n        System.out.print(i + \",\" + j + \" \");\n    }\n}",
    choices: [
      "1,1 1,2 1,3 2,1 2,2 2,3 3,1 3,2 3,3 ",
      "1,2 1,3 2,1 2,3 3,1 3,2 ",
      "1,1 2,2 3,3 ",
      "何も出力されない"
    ],
    answer: 1,
    brief: "i==jの時continueで対角要素をスキップ。",
    detail: "i==jの時（(1,1),(2,2),(3,3)）はcontinueで出力がスキップされる。残り6組 (1,2)(1,3)(2,1)(2,3)(3,1)(3,2) が出力される。"
  },
  {
    id: 71, chapter: 3,
    question: "switch文のdefaultの位置について正しい記述はどれか。",
    choices: [
      "必ず最後に書く必要がある",
      "最初か最後にしか書けない",
      "どの位置にも書けるが慣習的に最後",
      "省略できない"
    ],
    answer: 2,
    brief: "defaultはどの位置でもOKだが慣習的に最後。省略も可能。",
    detail: "default節はswitchのどこに書いてもよい（先頭・中間・末尾）。ただし読みやすさの観点から最後に書くのが一般的。マッチするcaseがなければdefaultが実行される（存在すれば）。省略は可能で、その場合何も実行されない。"
  },
  {
    id: 72, chapter: 3,
    question: "次のコードをコンパイルしたときどうなるか。\n\nint x = 5;\nif (x == 5);\n    System.out.println(\"Five\");",
    choices: [
      "Five が出力される",
      "何も出力されない",
      "コンパイルエラー",
      "実行時エラー"
    ],
    answer: 0,
    brief: "if (x==5); は空文。Fiveは常に出力される。",
    detail: "if文の後のセミコロン ; は空文（何もしない）として解釈される。つまりif(x==5){} と同じ。その次のprintlnはif文の外なので条件に関係なく実行される。意図せぬバグになりやすいので注意。"
  },
  {
    id: 73, chapter: 3,
    question: "次のコードの結果はどれか。\n\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) sum += i;\n}\nSystem.out.println(sum);",
    choices: ["25", "30", "55", "45"],
    answer: 1,
    brief: "1〜10の偶数（2,4,6,8,10）の合計は30。",
    detail: "1〜10のうちi%2==0で偶数を抽出し合計。2+4+6+8+10=30。奇数の合計25（1+3+5+7+9）や全体の合計55（1+…+10）と混同しないよう注意。"
  },
  {
    id: 74, chapter: 3,
    question: "次のコードの出力はどれか。\n\nint[] arr = {10, 20, 30};\nint total = 0;\nfor (int n : arr) {\n    total += n;\n}\nSystem.out.println(total);",
    choices: ["10", "60", "30", "0"],
    answer: 1,
    brief: "拡張for文で配列全要素を合計。10+20+30=60。",
    detail: "拡張for文（for-each）は配列やIterableの要素を順に取り出す。10+20+30=60。インデックスが不要で配列全走査に向いている。ただし要素の書き換えや特定のindexへのアクセスには通常のforを使う。"
  },
  {
    id: 75, chapter: 3,
    question: "Java 14で導入されたswitch式（矢印構文）の特徴として正しいものはどれか。",
    choices: [
      "case -> 処理; の形式で、breakが不要",
      "従来のcase : よりフォールスルーが発生しやすい",
      "値を返せない",
      "従来のswitch文と完全に同じ"
    ],
    answer: 0,
    brief: "case X -> 処理 の形式でbreak不要。値を返せる。",
    detail: "Java 14で正式導入されたswitch式は case X -> expr; の矢印構文を使い、フォールスルーなしでbreakが不要。値を返せるので int x = switch(day){...}; のように式として使える。Silver試験では従来構文の理解が中心。"
  },

  // ==================== 第4章: 配列・文字列・コレクション (25問) ====================
  {
    id: 76, chapter: 4,
    question: "次の配列宣言・初期化で有効なものはどれか。",
    choices: [
      "int[] arr = {1, 2, 3};",
      "int arr[] = new int[]{1, 2, 3};",
      "int[] arr = new int[3];",
      "すべて有効"
    ],
    answer: 3,
    brief: "すべて有効な配列宣言。",
    detail: "int[] arr、int arr[] のどちらの宣言スタイルも有効。{}による初期化は宣言と同時の場合のみ使える。new int[3] は長さ3で全要素が既定値0。new int[]{1,2,3} は無名配列式で後からでも使える。"
  },
  {
    id: 77, chapter: 4,
    question: "次のコードの結果はどれか。\n\nint[] arr = new int[3];\nSystem.out.println(arr[0]);",
    choices: ["null", "0", "未定義", "実行時例外"],
    answer: 1,
    brief: "プリミティブ配列の要素は既定値で初期化される。intは0。",
    detail: "new T[n] で配列を生成すると要素は既定値で初期化される。intなら0、doubleなら0.0、booleanならfalse、参照型ならnull。ローカル変数は自動初期化されないが、配列の要素は必ず初期化される点が異なる。"
  },
  {
    id: 78, chapter: 4,
    question: "次のコードの結果はどれか。\n\nint[] arr = {1, 2, 3};\nSystem.out.println(arr[3]);",
    choices: ["0", "3", "null", "ArrayIndexOutOfBoundsException"],
    answer: 3,
    brief: "配列の範囲外アクセスはArrayIndexOutOfBoundsException。",
    detail: "Javaの配列は0始まり。長さ3の配列の有効インデックスは0,1,2で、arr[3]は範囲外。実行時にArrayIndexOutOfBoundsExceptionが発生する。コンパイルは通る点に注意（実行時検査）。"
  },
  {
    id: 79, chapter: 4,
    question: "次のコードの出力はどれか。\n\nint[][] a = {{1,2,3},{4,5,6}};\nSystem.out.println(a[1][2]);",
    choices: ["2", "3", "5", "6"],
    answer: 3,
    brief: "a[1]は{4,5,6}、a[1][2]はその中の3番目で6。",
    detail: "2次元配列はJavaでは配列の配列。a[1]は第2行{4,5,6}で、a[1][2]はその中のindex 2（3番目）の要素6。なおJavaの配列は各行の長さが異なってもよい（ジャグ配列）。"
  },
  {
    id: 80, chapter: 4,
    question: "Stringに関する次の記述のうち正しいものはどれか。",
    choices: [
      "Stringはプリミティブ型",
      "Stringはミュータブル（変更可能）",
      "Stringはイミュータブル（変更不可）",
      "Stringはキャストで変更できる"
    ],
    answer: 2,
    brief: "Stringはイミュータブル。メソッドは新しいStringを返す。",
    detail: "Stringはイミュータブル（immutable）で、一度作られた文字列は変更できない。concatやreplaceなどのメソッドは新しいStringを返すだけで元の文字列は変わらない。頻繁に変更するならStringBuilderを使う。"
  },
  {
    id: 81, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s = \"Hello\";\ns.concat(\" World\");\nSystem.out.println(s);",
    choices: ["Hello World", "Hello", "World", "コンパイルエラー"],
    answer: 1,
    brief: "concatは新しいStringを返すだけ。元のsは変わらない。",
    detail: "Stringはイミュータブルなのでconcatなどは新しいStringを返すだけで元のStringを変えない。s = s.concat(\" World\"); と代入しなければsは\"Hello\"のまま。StringBuilderなら元のオブジェクトが変更される。"
  },
  {
    id: 82, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s1 = \"Java\";\nString s2 = \"Java\";\nSystem.out.println(s1 == s2);",
    choices: ["true", "false", "コンパイルエラー", "実行時例外"],
    answer: 0,
    brief: "文字列リテラルは文字列プールで同一の参照になる。",
    detail: "Javaコンパイラは同じ文字列リテラルを文字列プールで共有するため、s1とs2は同じオブジェクトを指す。よって==もtrue。ただしnew String(\"Java\")で作ると新しいオブジェクトになり==はfalseになる。内容比較は常にequalsを使うべき。"
  },
  {
    id: 83, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s1 = \"Java\";\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));",
    choices: [
      "true / true",
      "false / true",
      "true / false",
      "false / false"
    ],
    answer: 1,
    brief: "new Stringは別オブジェクト。==はfalse、equalsはtrue。",
    detail: "new String() は明示的に新しいオブジェクトを生成するので、リテラルs1とは別の参照になる。==は参照比較なのでfalse。一方equalsは内容比較で同じ\"Java\"なのでtrue。"
  },
  {
    id: 84, chapter: 4,
    question: "次のStringメソッドでlength（長さ）を返すのはどれか。",
    choices: ["s.size()", "s.length()", "s.length", "s.count()"],
    answer: 1,
    brief: "Stringは length() メソッドで長さを取得。",
    detail: "Stringはlength()メソッドで文字数（正確にはcharの数）を返す。配列は length プロパティ（()不要）で長さ取得。コレクション（List等）は size()。混同しやすいので注意。"
  },
  {
    id: 85, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s = \"Hello\";\nSystem.out.println(s.substring(1, 3));",
    choices: ["el", "ell", "He", "Hel"],
    answer: 0,
    brief: "substring(1,3)はindex 1以上3未満（el）を返す。",
    detail: "substring(beginIndex, endIndex)はbeginIndex以上endIndex未満の部分文字列を返す（半開区間）。\"Hello\"でindex1=e, index2=l, index3=l（含まず）なので\"el\"。substring(1)ならindex 1以降すべて。"
  },
  {
    id: 86, chapter: 4,
    question: "StringBuilderとStringの違いとして正しいものはどれか。",
    choices: [
      "Stringはミュータブル、StringBuilderはイミュータブル",
      "Stringはイミュータブル、StringBuilderはミュータブル",
      "どちらも同じ",
      "StringBuilderは配列"
    ],
    answer: 1,
    brief: "Stringはイミュータブル、StringBuilderはミュータブル。",
    detail: "Stringは変更不可（毎回新オブジェクト生成）なのでループ内で文字列連結するとメモリ効率が悪い。StringBuilderは可変で同じオブジェクトに追記していく。ただしスレッドセーフではない（スレッドセーフが必要ならStringBuffer）。"
  },
  {
    id: 87, chapter: 4,
    question: "次のコードの出力はどれか。\n\nStringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");\nSystem.out.println(sb);",
    choices: ["Hello", "Hello World", "World", "コンパイルエラー"],
    answer: 1,
    brief: "appendは同じオブジェクトに追記。Hello World になる。",
    detail: "StringBuilderはミュータブルなのでappendは元のオブジェクトを変更する。toString()相当の挙動でSystem.out.printlnが\"Hello World\"を出力。appendは自分自身を返すのでメソッドチェーンも可能。"
  },
  {
    id: 88, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s = \"A,B,C,D\";\nString[] arr = s.split(\",\");\nSystem.out.println(arr.length);",
    choices: ["3", "4", "5", "1"],
    answer: 1,
    brief: "A,B,C,Dを\",\"でsplitすると4要素になる。",
    detail: "split(regex)は正規表現で文字列を分割する。\"A,B,C,D\"を\",\"で分割すると [A, B, C, D] の4要素の配列が返る。セパレータ自体は含まれない。split(regex, limit)で最大分割数を指定可能。"
  },
  {
    id: 89, chapter: 4,
    question: "ArrayListを使うために必要なimport文はどれか。",
    choices: [
      "import java.util.ArrayList;",
      "import java.lang.ArrayList;",
      "import java.collection.ArrayList;",
      "import不要"
    ],
    answer: 0,
    brief: "ArrayListはjava.utilパッケージ。",
    detail: "ArrayListはjava.utilパッケージに属するので import java.util.ArrayList; が必要。java.lang以外のクラスは必ず明示的import。List, Map, HashMapなどもjava.util。"
  },
  {
    id: 90, chapter: 4,
    question: "次のコードの出力はどれか。\n\nList<String> list = new ArrayList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.add(\"C\");\nSystem.out.println(list.get(1));",
    choices: ["A", "B", "C", "ArrayIndexOutOfBoundsException"],
    answer: 1,
    brief: "listも0始まりのインデックス。index 1 は \"B\"。",
    detail: "ArrayListは0始まりでget(index)で取得。index 1 は2番目の要素\"B\"。範囲外アクセスはIndexOutOfBoundsException（配列のArrayIndex〜とは別クラス）になる。size()で要素数を取得。"
  },
  {
    id: 91, chapter: 4,
    question: "次のコードの結果はどれか。\n\nString s = \"HELLO\";\nString t = s.toLowerCase();\nSystem.out.println(s + \" \" + t);",
    choices: [
      "hello hello",
      "HELLO HELLO",
      "HELLO hello",
      "hello HELLO"
    ],
    answer: 2,
    brief: "toLowerCaseは新しいStringを返す。元のsは変わらない。",
    detail: "Stringはイミュータブルなのでs.toLowerCase()は新しいString（\"hello\"）を返すだけでsは\"HELLO\"のまま。tは\"hello\"なので出力は \"HELLO hello\"。"
  },
  {
    id: 92, chapter: 4,
    question: "次のコードの出力はどれか。\n\nint[] arr = {5, 3, 8, 1, 2};\njava.util.Arrays.sort(arr);\nSystem.out.println(arr[0] + \",\" + arr[4]);",
    choices: ["5,2", "1,8", "8,1", "5,1"],
    answer: 1,
    brief: "Arrays.sortで昇順ソート。arr[0]=1, arr[4]=8。",
    detail: "Arrays.sortはプリミティブ配列を昇順ソートする（破壊的）。{5,3,8,1,2}→{1,2,3,5,8}となり、最小arr[0]=1, 最大arr[4]=8。オブジェクト配列にはComparatorを渡せる。"
  },
  {
    id: 93, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s = \"Java Silver\";\nSystem.out.println(s.indexOf(\"S\"));",
    choices: ["-1", "4", "5", "6"],
    answer: 2,
    brief: "indexOfは最初にマッチした位置のindexを返す。Sはindex 5。",
    detail: "indexOfは引数が見つかった最初のindexを返す（0始まり）。\"Java Silver\"の 'S' はJ=0,a=1,v=2,a=3,空白=4,S=5 なので5。見つからない場合は-1を返す。"
  },
  {
    id: 94, chapter: 4,
    question: "次のコードの結果はどれか。\n\nString s = null;\nSystem.out.println(s.length());",
    choices: ["0", "null", "NullPointerException", "コンパイルエラー"],
    answer: 2,
    brief: "nullにメソッド呼び出しはNullPointerException。",
    detail: "nullの参照変数にメソッドを呼ぶとNullPointerException（NPE）が発生。Java 14以降のヘルプフルNPEメッセージでは「because s is null」のように変数名まで教えてくれる。nullチェックや Objects.requireNonNull で対処。"
  },
  {
    id: 95, chapter: 4,
    question: "List<Integer> と List<int> について正しい記述はどれか。",
    choices: [
      "List<int> は正しい構文",
      "List<int> は不可。ジェネリクスに使えるのは参照型のみでInteger（ラッパー）を使う",
      "List<int>はList<Integer>と同じ",
      "どちらも不可"
    ],
    answer: 1,
    brief: "ジェネリクスには参照型のみ。intならラッパーのIntegerを使う。",
    detail: "Javaのジェネリクスはプリミティブ型を型パラメータにできない。int→Integer、double→Double、char→Characterなどラッパークラスを使う。Java 5以降のオートボクシング/アンボクシングで自動変換される。"
  },
  {
    id: 96, chapter: 4,
    question: "次のコードの出力はどれか。\n\nList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nlist.remove(1);\nSystem.out.println(list);",
    choices: ["[1]", "[2]", "[1, 2]", "[]"],
    answer: 0,
    brief: "remove(int index)でindex 1を削除。残るのは[1]。",
    detail: "List.remove(int)はインデックス指定削除、List.remove(Object)はオブジェクト指定削除。list.remove(1)はインデックス1（2番目の要素2）を削除するので[1]が残る。Integerを消したいならremove(Integer.valueOf(1))。"
  },
  {
    id: 97, chapter: 4,
    question: "配列の長さを取得する方法として正しいものはどれか。",
    choices: ["arr.length()", "arr.length", "arr.size()", "arr.size"],
    answer: 1,
    brief: "配列は length プロパティ（()なし）。",
    detail: "配列の長さは length（括弧なしのフィールド）でアクセス。Stringは length()（メソッド）、コレクションは size()。arr.length() は構文エラー、arr.size() も配列にはない。"
  },
  {
    id: 98, chapter: 4,
    question: "次のコードの出力はどれか。\n\nString s = \"abcde\";\nSystem.out.println(s.charAt(2));",
    choices: ["'a'", "'b'", "'c'", "'d'"],
    answer: 2,
    brief: "charAt(2)はindex 2（3番目）を返す。'c'。",
    detail: "charAt(index)は指定indexの文字（char）を返す。\"abcde\"のindex 2 は 'c'。範囲外はStringIndexOutOfBoundsException。"
  },
  {
    id: 99, chapter: 4,
    question: "次の比較の結果はどれか。\n\nString a = \"hello\";\nString b = \"Hello\";\nSystem.out.println(a.equalsIgnoreCase(b));",
    choices: ["true", "false", "NullPointerException", "コンパイルエラー"],
    answer: 0,
    brief: "equalsIgnoreCaseは大文字小文字を無視して比較。",
    detail: "equalsIgnoreCase は大文字小文字を区別しない比較メソッド。\"hello\"と\"Hello\"は等しいと判定されtrue。equalsは大文字小文字を区別するのでfalseになる。"
  },
  {
    id: 100, chapter: 4,
    question: "次のコードの結果はどれか。\n\nString s = \"Hello\";\nString r = s.replace('l', 'L');\nSystem.out.println(r);",
    choices: ["Hello", "HeLLo", "HELLO", "HelLo"],
    answer: 1,
    brief: "replaceは該当文字すべてを置換。2つのlがLに。",
    detail: "replace(char, char)はマッチする全ての文字を置換した新しいStringを返す。\"Hello\"の2つの'l'が'L'に置換されて\"HeLLo\"。正規表現版はreplaceAll。Stringはイミュータブルなので元のsは変わらない。"
  },

  // ==================== 第5章: クラスとメソッド (25問) ====================
  {
    id: 101, chapter: 5,
    question: "クラスのアクセス修飾子として書けないものはどれか。",
    choices: ["public", "protected", "private", "どれも書ける"],
    answer: 1,
    brief: "トップレベルクラスにはpublicまたはデフォルトのみ。protected/privateは不可。",
    detail: "トップレベル（外側の）クラスにはpublicかパッケージプライベート（修飾子なし）のみ。protectedやprivateは使えない。一方ネストクラス（内部クラス）ならpublic/protected/private/デフォルトすべて可。"
  },
  {
    id: 102, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass Box {\n    int x;\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Box b = new Box();\n        System.out.println(b.x);\n    }\n}",
    choices: ["0", "null", "未定義", "コンパイルエラー"],
    answer: 0,
    brief: "フィールドは既定値で初期化される。intは0。",
    detail: "インスタンスフィールドは宣言時に初期化しなくても既定値（int:0, double:0.0, boolean:false, 参照型:null）で自動初期化される。ローカル変数と違いエラーにはならない。"
  },
  {
    id: 103, chapter: 5,
    question: "次のクラスに関する記述で正しいものはどれか。\n\nclass A {\n    A() { System.out.println(\"A\"); }\n}",
    choices: [
      "コンストラクタがない",
      "コンストラクタは引数なしのA()一つ",
      "コンストラクタは戻り値voidを持つ",
      "コンパイルエラー"
    ],
    answer: 1,
    brief: "A()が明示的コンストラクタ。コンストラクタに戻り値はない。",
    detail: "コンストラクタはクラス名と同じ名前のメソッドで、戻り値型を持たない（voidも書かない）。明示的に書かない場合はコンパイラがデフォルトコンストラクタ（引数なし）を自動生成するが、1つでも書いたらデフォルトは生成されない。"
  },
  {
    id: 104, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        new Counter(); new Counter(); new Counter();\n        System.out.println(Counter.count);\n    }\n}",
    choices: ["0", "1", "3", "コンパイルエラー"],
    answer: 2,
    brief: "staticフィールドは全インスタンス共通。3回インクリメントされて3。",
    detail: "staticフィールド（クラス変数）はクラス全体で1つしか存在せず、全インスタンスで共有される。3回newでコンストラクタが3回実行されcountが3になる。インスタンスフィールドなら各オブジェクトで独立。"
  },
  {
    id: 105, chapter: 5,
    question: "オーバーロードの条件として正しくないものはどれか。",
    choices: [
      "メソッド名が同じ",
      "引数の型または数が異なる",
      "戻り値の型が異なれば引数が同じでもよい",
      "同じクラス内で定義される（継承関係でもよい）"
    ],
    answer: 2,
    brief: "戻り値の型だけが違ってもオーバーロードとは認められない。",
    detail: "オーバーロードは「同名で引数（数・型・順序）が異なる」メソッドを複数定義すること。戻り値の型が異なるだけでは区別できないのでコンパイルエラー。アクセス修飾子も違っていいが、違いのキーは引数リスト。"
  },
  {
    id: 106, chapter: 5,
    question: "次のメソッドのオーバーロードとして成立するものはどれか。\n\nvoid m(int x) {}",
    choices: [
      "void m(int y) {}",
      "int m(int x) { return 0; }",
      "void m(int x, int y) {}",
      "すべて成立"
    ],
    answer: 2,
    brief: "引数の数か型が違う必要がある。void m(int,int)はOK。",
    detail: "A:引数名のみ違い→同一シグネチャでコンパイルエラー。B:戻り値のみ違い→エラー。C:引数数が違う→オーバーロード成立。オーバーロードの識別は「メソッド名+引数リスト」で行われる。"
  },
  {
    id: 107, chapter: 5,
    question: "thisキーワードに関する正しい記述はどれか。",
    choices: [
      "staticメソッド内でも使える",
      "現在のオブジェクトを指す（インスタンスメソッド内）",
      "親クラスを指す",
      "クラス自体を指す"
    ],
    answer: 1,
    brief: "thisは現在のインスタンス自身を指す。staticでは使えない。",
    detail: "thisはインスタンスメソッドやコンストラクタ内で「現在のオブジェクト」を指す。staticメソッドはインスタンスに紐付かないのでthisは使えない。this()は同クラスの別コンストラクタ呼び出し。親クラス参照はsuper。"
  },
  {
    id: 108, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass A {\n    int x = 10;\n    A(int x) { this.x = x; }\n}\n\n// main: A a = new A(20); System.out.println(a.x);",
    choices: ["10", "20", "0", "コンパイルエラー"],
    answer: 1,
    brief: "this.x = x でフィールドに引数が代入される。xは20。",
    detail: "コンストラクタの引数名xはフィールド名xと同じなのでシャドウされる。this.xと書くことで明示的にフィールドを参照できる。結果、フィールドxに引数20が代入されa.xは20。"
  },
  {
    id: 109, chapter: 5,
    question: "カプセル化の原則として正しいものはどれか。",
    choices: [
      "フィールドはpublicにしてgetter/setterをprivateにする",
      "フィールドはprivateにしてgetter/setterをpublicにする",
      "すべてpublicにする",
      "すべてprivateにする"
    ],
    answer: 1,
    brief: "フィールドはprivate、アクセサ（getter/setter）はpublic。",
    detail: "カプセル化はデータ（フィールド）を隠蔽し、publicなメソッド（アクセサ）経由でアクセスさせる。これによりバリデーションや内部表現の変更に柔軟に対応できる。フィールドをpublicにすると他クラスから直接書き換えられて保守性が下がる。"
  },
  {
    id: 110, chapter: 5,
    question: "staticメソッドに関する正しい記述はどれか。",
    choices: [
      "インスタンスを生成しないと呼び出せない",
      "クラス名で直接呼び出せる（インスタンス不要）",
      "thisを使える",
      "インスタンスフィールドに直接アクセスできる"
    ],
    answer: 1,
    brief: "staticはクラスメソッド。ClassName.method() で呼び出す。",
    detail: "staticメソッドはクラスに紐付くのでインスタンス不要で ClassName.method() の形で呼び出せる。インスタンスフィールド/メソッドには直接アクセスできない（インスタンスを経由する必要がある）。thisも使えない。"
  },
  {
    id: 111, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass Point {\n    int x, y;\n    Point() { this(0, 0); }\n    Point(int x, int y) { this.x = x; this.y = y; }\n}\n\n// main: Point p = new Point(); System.out.println(p.x + \",\" + p.y);",
    choices: ["0,0", "null,null", "実行時例外", "コンパイルエラー"],
    answer: 0,
    brief: "this(0,0)でもう一つのコンストラクタを呼ぶ。x=0,y=0。",
    detail: "this(引数)はコンストラクタ内で同クラスの別コンストラクタを呼ぶ。Point()→Point(0,0)と連鎖しx=0,y=0になる。this()はコンストラクタの最初の文でなければならない。super()との併用はできない。"
  },
  {
    id: 112, chapter: 5,
    question: "次のコードのコンパイル結果はどれか。\n\nclass A {\n    int x;\n    A(int x) { this.x = x; }\n}\n\n// A a = new A();",
    choices: [
      "a.x = 0 が作られる",
      "コンパイルエラー（引数なしコンストラクタがない）",
      "null例外",
      "デフォルトコンストラクタが自動補完される"
    ],
    answer: 1,
    brief: "明示コンストラクタを書くとデフォルトは生成されない。",
    detail: "コンストラクタを1つでも明示的に書くと、コンパイラはデフォルトコンストラクタを自動生成しない。new A() は引数なしコンストラクタを探すが存在しないのでエラー。必要なら A() {} を自分で書く。"
  },
  {
    id: 113, chapter: 5,
    question: "可変長引数（varargs）を正しく使っているメソッド定義はどれか。",
    choices: [
      "void m(int... nums)",
      "void m(int[]... nums)",
      "void m(int nums...)",
      "void m(int nums[])"
    ],
    answer: 0,
    brief: "可変長引数は 型... 名前 の形式。",
    detail: "可変長引数（varargs）はメソッドの最後の引数で「型... 名前」の形。内部的には配列として扱われ、0個以上の引数を渡せる。 m(1,2,3) や m(new int[]{1,2,3}) のように呼び出す。1メソッドに1つだけ、最後に1個のみ。"
  },
  {
    id: 114, chapter: 5,
    question: "次のメソッド呼び出しの挙動で正しいのはどれか。\n\nvoid add(int x) { x += 10; }\n\n// main: int a = 5; add(a); System.out.println(a);",
    choices: ["5", "15", "10", "コンパイルエラー"],
    answer: 0,
    brief: "プリミティブは値渡し。呼び出し元のaは変わらない。",
    detail: "Javaのメソッド引数は常に値渡し（pass by value）。プリミティブの場合は値がコピーされるので呼び出し元のaは変わらない。参照型の場合は参照がコピーされるので、参照先のオブジェクト内容は変更可能だが、参照自体の変更は呼び出し元に影響しない。"
  },
  {
    id: 115, chapter: 5,
    question: "次のコードの出力はどれか。\n\nvoid modify(int[] arr) { arr[0] = 99; }\n\n// main: int[] a = {1,2,3}; modify(a); System.out.println(a[0]);",
    choices: ["1", "99", "0", "コンパイルエラー"],
    answer: 1,
    brief: "配列は参照型。参照先の中身が変更される。",
    detail: "配列は参照型なのでメソッドに渡すと参照がコピーされる。参照先は同じ配列オブジェクトなのでarr[0]の変更は元の配列にも反映される。a[0]は99になる。"
  },
  {
    id: 116, chapter: 5,
    question: "アクセス修飾子のアクセス範囲が広い順に並べたものはどれか。",
    choices: [
      "public > protected > default(パッケージ) > private",
      "private > default > protected > public",
      "public > private > protected > default",
      "default > public > protected > private"
    ],
    answer: 0,
    brief: "public > protected > default > private の順。",
    detail: "public:どこからでも、protected:同パッケージ+サブクラス、default（修飾子なし）:同パッケージのみ、private:同クラスのみ。protectedは異なるパッケージでもサブクラスからアクセス可能という点がdefaultより広い。"
  },
  {
    id: 117, chapter: 5,
    question: "次のコードの結果はどれか。\n\nclass A {\n    private int x;\n    public int getX() { return x; }\n}\n\nclass Test {\n    // main: A a = new A(); a.x = 10;\n}",
    choices: [
      "a.xに10が代入される",
      "コンパイルエラー（privateアクセス不可）",
      "getX()が10を返す",
      "実行時エラー"
    ],
    answer: 1,
    brief: "privateフィールドに外部クラスからアクセスするとコンパイルエラー。",
    detail: "privateフィールドはそのクラス内からしかアクセスできない。Testクラスからa.xへの直接アクセスは「has private access」でコンパイルエラー。外部からは getX()/setX() を介する必要がある。"
  },
  {
    id: 118, chapter: 5,
    question: "finalメソッドについて正しい記述はどれか。",
    choices: [
      "サブクラスで再定義（オーバーライド）できない",
      "インスタンス化できない",
      "呼び出せない",
      "staticしか付けられない"
    ],
    answer: 0,
    brief: "finalメソッドはオーバーライド禁止。",
    detail: "finalメソッドはサブクラスでオーバーライドできない。「この実装を変えるな」という意思表示で、性能最適化やセキュリティ上の理由で使う。finalクラスは継承自体が禁止、final変数は再代入禁止。"
  },
  {
    id: 119, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass C {\n    int x;\n    static int count;\n    C() { count++; x = count; }\n}\n\n// C c1 = new C(); C c2 = new C(); C c3 = new C();\n// System.out.println(c1.x + \",\" + c2.x + \",\" + c3.x);",
    choices: ["1,2,3", "3,3,3", "0,0,0", "1,1,1"],
    answer: 0,
    brief: "staticのcountは1,2,3と増え、各インスタンスのxにその時点の値が入る。",
    detail: "staticフィールドcountは全インスタンスで共有。new するたびにcountが1→2→3と増え、各コンストラクタ実行時のcount値がそのインスタンスのxに代入される。c1.x=1, c2.x=2, c3.x=3。"
  },
  {
    id: 120, chapter: 5,
    question: "staticメソッドとインスタンスメソッドの呼び出し方の違いで正しいものはどれか。",
    choices: [
      "staticは必ずnewでインスタンス化してから呼ぶ",
      "staticは ClassName.method() または instance.method() で呼べるが前者が推奨",
      "インスタンスメソッドはnewなしで呼べる",
      "どちらも同じ"
    ],
    answer: 1,
    brief: "staticはクラス名.メソッド()が推奨。インスタンス経由も文法上可能。",
    detail: "staticメソッドは ClassName.method() が正式。インスタンス経由 instance.method() でも呼べるが「staticメソッドをインスタンス経由で呼んでいる」という警告が出ることが多く非推奨。インスタンスメソッドはnew後のオブジェクト経由のみ。"
  },
  {
    id: 121, chapter: 5,
    question: "次のコードの出力はどれか。\n\nclass Util {\n    static int add(int a, int b) { return a + b; }\n    static int add(int a, int b, int c) { return a + b + c; }\n}\n\n// System.out.println(Util.add(1, 2));",
    choices: ["3", "6", "コンパイルエラー", "実行時例外"],
    answer: 0,
    brief: "引数2つのオーバーロードが呼ばれる。1+2=3。",
    detail: "同名メソッドが引数数でオーバーロードされている。Util.add(1,2)は引数2つのadd(int,int)にマッチし1+2=3を返す。3つならadd(int,int,int)が呼ばれる。"
  },
  {
    id: 122, chapter: 5,
    question: "コンストラクタで呼べないものはどれか。",
    choices: [
      "this(args)（同クラス別コンストラクタ）",
      "super(args)（親クラスコンストラクタ）",
      "this(args)とsuper(args)の両方を同じコンストラクタで",
      "オーバーロードされたメソッド"
    ],
    answer: 2,
    brief: "this()とsuper()はどちらもコンストラクタ1文目の縛り。併用不可。",
    detail: "this(args)もsuper(args)もコンストラクタの最初の文でなければならない。よって併用できない（どちらか1つだけ）。書かない場合は暗黙的にsuper()（親の引数なしコンストラクタ）が呼ばれる。"
  },
  {
    id: 123, chapter: 5,
    question: "次のコードで x の既定値はどれか。\n\nclass A {\n    boolean x;\n    int y;\n    String z;\n}",
    choices: [
      "x=false, y=0, z=null",
      "x=true, y=0, z=\"\"",
      "x=null, y=null, z=null",
      "初期化されないのでエラー"
    ],
    answer: 0,
    brief: "インスタンスフィールドの既定値はboolean=false, int=0, 参照=null。",
    detail: "フィールドは明示的初期化しない場合、型の既定値で初期化される。boolean=false, 整数型=0, 浮動小数=0.0, char='\\u0000', 参照型=null。ローカル変数は既定値なしで使用時エラー。"
  },
  {
    id: 124, chapter: 5,
    question: "次のコードのコンパイル結果はどれか。\n\nclass A {\n    static int x;\n    void setX(int x) { A.x = x; }\n    int getX() { return x; }\n}",
    choices: [
      "正常コンパイル",
      "staticフィールドにインスタンスからアクセス不可でエラー",
      "setXがinstanceメソッドだからエラー",
      "getXがinstanceメソッドだからエラー"
    ],
    answer: 0,
    brief: "インスタンスメソッドからstaticフィールドへのアクセスは可能。",
    detail: "インスタンスメソッドからstaticフィールドへのアクセスは可能（A.xのようにクラス名経由も、this経由ではなく直接名前でも可）。逆にstaticメソッドからインスタンスフィールドへの直接アクセスは不可。"
  },
  {
    id: 125, chapter: 5,
    question: "次のコードの出力はどれか。\n\nvoid test(int... nums) { System.out.println(nums.length); }\n\n// test(); test(1, 2); test(new int[]{1,2,3});",
    choices: [
      "0 2 3",
      "0 2 1（配列が1要素扱い）",
      "すべて0",
      "コンパイルエラー"
    ],
    answer: 0,
    brief: "varargsは配列として受け取る。引数0個→length 0、2個→2、配列そのまま→3。",
    detail: "int... nums は内部的にint[]として扱われる。test()はlength 0、test(1,2)はlength 2（コンパイラが配列を作る）、test(new int[]{1,2,3})は配列そのものを渡すのでlength 3。"
  },

  // ==================== 第6章: 継承・ポリモーフィズム・例外・ラムダ (25問) ====================
  {
    id: 126, chapter: 6,
    question: "extendsキーワードの使い方で正しいものはどれか。",
    choices: [
      "class Dog extends Animal { }",
      "class Dog implements Animal { }",
      "class Dog : Animal { }",
      "class Dog inherits Animal { }"
    ],
    answer: 0,
    brief: "クラスの継承はextends。1つの親のみ（単一継承）。",
    detail: "クラス間の継承は extends を使う（C#の : やPythonの()とは違う）。Javaは単一継承なので extends は1つの親クラスのみ。一方、インターフェースの実装 implements や、インターフェース間の extends は複数指定可能。"
  },
  {
    id: 127, chapter: 6,
    question: "次のコードの出力はどれか。\n\nclass Animal { void cry() { System.out.println(\"generic\"); } }\nclass Dog extends Animal { void cry() { System.out.println(\"bark\"); } }\n\n// Animal a = new Dog(); a.cry();",
    choices: ["generic", "bark", "コンパイルエラー", "実行時エラー"],
    answer: 1,
    brief: "ポリモーフィズムで実際の型（Dog）のメソッドが呼ばれる。",
    detail: "変数の型がAnimalでも実際のオブジェクト型がDogなら、動的ディスパッチで Dog.cry() が呼ばれる。これがポリモーフィズムの本質。フィールドはこの挙動にならず変数型でアクセスされる点に注意。"
  },
  {
    id: 128, chapter: 6,
    question: "オーバーライドの条件として誤っているものはどれか。",
    choices: [
      "同じメソッド名・同じ引数リスト",
      "戻り値の型は同じか共変（サブクラス型）",
      "アクセス修飾子はより広くても同じでもよい",
      "親クラスメソッドより狭いアクセス修飾子でもよい"
    ],
    answer: 3,
    brief: "オーバーライド時、アクセス修飾子を狭くはできない。",
    detail: "オーバーライドは「同名・同引数リスト・戻り値は同じか共変」が条件。アクセス修飾子は親と同じか広く（public→publicはOK、protected→publicもOK）は可能だが、狭く（public→private）は不可でコンパイルエラー。"
  },
  {
    id: 129, chapter: 6,
    question: "インターフェースに関する正しい記述はどれか（Java 11基準）。",
    choices: [
      "インターフェースにフィールド（定数以外）を宣言できる",
      "インターフェースはdefaultメソッドで実装を持てる",
      "インターフェースはインスタンス化できる",
      "インターフェースは1つしかextendsできない"
    ],
    answer: 1,
    brief: "Java 8からdefaultメソッドで実装を持てる。",
    detail: "Java 8以降、インターフェースは default メソッドでデフォルト実装を持てる。static メソッドも可。private メソッド（内部利用）はJava 9以降。フィールドは暗黙的にpublic static final（定数）のみ。インターフェースは複数extends可能（implementsとは違う）。"
  },
  {
    id: 130, chapter: 6,
    question: "抽象クラスとインターフェースの違いについて正しい記述はどれか。",
    choices: [
      "抽象クラスはインスタンス化できる、インターフェースはできない",
      "抽象クラスは多重継承できる、インターフェースはできない",
      "抽象クラスは状態（フィールド）を持てる、インターフェースは定数のみ",
      "抽象クラスは実装メソッドを持てない"
    ],
    answer: 2,
    brief: "抽象クラスはフィールドを持てる、インターフェースは定数のみ。",
    detail: "抽象クラス:インスタンスフィールドOK、コンストラクタOK、単一継承。インターフェース:フィールドはpublic static finalの定数のみ、コンストラクタなし、複数実装可能。抽象メソッドはどちらも持てる。どちらもインスタンス化はできない。"
  },
  {
    id: 131, chapter: 6,
    question: "次のコードの出力はどれか。\n\nclass A { int x = 1; }\nclass B extends A { int x = 2; }\n\n// A a = new B(); System.out.println(a.x);",
    choices: ["1", "2", "コンパイルエラー", "実行時エラー"],
    answer: 0,
    brief: "フィールドは静的ディスパッチ。変数型（A）のxが参照される。",
    detail: "フィールドはメソッドと違いオーバーライドされず、変数型に基づいてアクセスされる。aの型はAなのでA.xの1が出力される。メソッドは動的ディスパッチで実際の型のもの（B）が呼ばれる点と対照的。"
  },
  {
    id: 132, chapter: 6,
    question: "次のコードの結果はどれか。\n\nclass A { A() { System.out.print(\"A\"); } }\nclass B extends A { B() { System.out.print(\"B\"); } }\n\n// new B();",
    choices: ["A", "B", "AB", "BA"],
    answer: 2,
    brief: "親のコンストラクタが先に呼ばれる（暗黙super()）。ABの順。",
    detail: "サブクラスのコンストラクタは最初に暗黙的にsuper()（親クラスの引数なしコンストラクタ）を呼ぶ。よってA()→B()の順で実行されABが出力。親に引数なしコンストラクタがない場合は明示的にsuper(args)を書く必要がある。"
  },
  {
    id: 133, chapter: 6,
    question: "abstractメソッドに関する正しい記述はどれか。",
    choices: [
      "実装を持てる",
      "実装を持てない。サブクラスでオーバーライドする必要がある",
      "必ずprivate",
      "staticでなければならない"
    ],
    answer: 1,
    brief: "abstractメソッドは宣言のみで実装なし。サブクラスが実装する。",
    detail: "abstract メソッドは実装を持てない（;で終わる）。abstractメソッドを持つクラスはabstract宣言が必要。非abstractなサブクラスは全てのabstractメソッドを実装する必要がある。abstractとprivate/static/finalは併用不可（いずれもオーバーライドを阻害するため）。"
  },
  {
    id: 134, chapter: 6,
    question: "instanceof演算子の使い方として正しいものはどれか。\n\nObject o = \"hello\";",
    choices: [
      "if (o instanceof String)",
      "if (o is String)",
      "if (o.typeof == String)",
      "if (o == String.class)"
    ],
    answer: 0,
    brief: "型判定は instanceof。null に対してはfalseを返す。",
    detail: "instanceof はオブジェクトが指定型（またはそのサブタイプ）のインスタンスかを判定する演算子。nullに対しては常にfalse。Java 16からパターンマッチングが導入され if (o instanceof String s) のように変数束縛も可能。"
  },
  {
    id: 135, chapter: 6,
    question: "次の例外処理コードの出力はどれか。\n\ntry {\n    int[] a = {1};\n    System.out.println(a[5]);\n} catch (Exception e) {\n    System.out.println(\"E\");\n} finally {\n    System.out.println(\"F\");\n}",
    choices: ["E", "F", "EF", "FE"],
    answer: 2,
    brief: "例外発生→catchでE→finallyでF。",
    detail: "a[5]でArrayIndexOutOfBoundsExceptionが発生。Exceptionはそのスーパータイプなのでcatchに入りEを出力。finallyは例外の有無に関わらず実行されFを出力。順序はE→F。"
  },
  {
    id: 136, chapter: 6,
    question: "チェック例外（checked exception）と非チェック例外（unchecked）の違いはどれか。",
    choices: [
      "チェック例外はコンパイル時にcatchまたはthrows宣言が強制される",
      "非チェック例外はcompile時にcatchが強制される",
      "どちらもcatch強制",
      "どちらもcatch任意"
    ],
    answer: 0,
    brief: "チェック例外（IOException等）はcatchかthrows宣言が必須。",
    detail: "チェック例外（IOException, SQLException等）はコンパイラがcatchかthrows宣言を強制する。非チェック例外（RuntimeException系: NullPointerException, IllegalArgumentException等）とError系は強制されない。Exceptionを継承しRuntimeExceptionを継承しないものがチェック例外。"
  },
  {
    id: 137, chapter: 6,
    question: "次のコードのコンパイル結果はどれか。\n\nvoid readFile() {\n    java.io.FileReader fr = new java.io.FileReader(\"a.txt\");\n}",
    choices: [
      "正常コンパイル",
      "FileNotFoundException（チェック例外）がハンドルされておらずエラー",
      "ランタイムエラー",
      "警告のみ"
    ],
    answer: 1,
    brief: "FileReaderのコンストラクタはFileNotFoundExceptionを投げる。catchかthrowsが必要。",
    detail: "FileReader(String)のコンストラクタはチェック例外FileNotFoundExceptionをthrowする。呼び出し側でtry-catchするか、メソッドにthrows FileNotFoundExceptionを宣言しないとコンパイルエラー。"
  },
  {
    id: 138, chapter: 6,
    question: "次のコードの出力はどれか。\n\ntry {\n    throw new RuntimeException(\"X\");\n} catch (RuntimeException e) {\n    System.out.print(\"C:\" + e.getMessage());\n} finally {\n    System.out.print(\" F\");\n}",
    choices: ["C:X F", "F C:X", "C:X", "F"],
    answer: 0,
    brief: "catchでC:X、finallyでFの順に出力される。",
    detail: "throwで例外を投げ、catchでキャッチしてメッセージを出力。その後finallyでFが出力される。println/printの違いだけでなく順序に注意。getMessage()はthrow時に渡した文字列を返す。"
  },
  {
    id: 139, chapter: 6,
    question: "try-with-resourcesで自動的にcloseされる条件はどれか。",
    choices: [
      "リソースがObjectを実装している",
      "リソースがAutoCloseableを実装している",
      "リソースがFileを継承している",
      "リソースがprivateである"
    ],
    answer: 1,
    brief: "try-with-resourcesはAutoCloseableを実装するリソースに使える。",
    detail: "try-with-resources文 try (Resource r = ...) {} の()内で宣言できるのはAutoCloseable（またはそのサブインターフェースCloseable）を実装したリソースのみ。try終了時に自動的にclose()が呼ばれるのでfinallyでの明示的closeが不要。"
  },
  {
    id: 140, chapter: 6,
    question: "マルチcatch（|）に関する正しい使い方はどれか。",
    choices: [
      "catch (IOException || SQLException e)",
      "catch (IOException | SQLException e)",
      "catch (IOException & SQLException e)",
      "catch (IOException, SQLException e)"
    ],
    answer: 1,
    brief: "マルチcatchは単一のパイプ | で区切る。",
    detail: "Java 7以降、複数の例外型を1つのcatchで処理できる（マルチキャッチ）。構文は catch (A | B e) で、| は1本。論理ORの || とは違う。併記する例外に継承関係があるとコンパイルエラー。"
  },
  {
    id: 141, chapter: 6,
    question: "ラムダ式が使えるのはどんなインターフェースか。",
    choices: [
      "メソッドを1つだけ持つインターフェース（関数型インターフェース）",
      "メソッドが0個のインターフェース",
      "すべてのインターフェース",
      "抽象クラスのみ"
    ],
    answer: 0,
    brief: "抽象メソッドが1つだけの関数型インターフェース。",
    detail: "ラムダ式は関数型インターフェース（Functional Interface: 抽象メソッドが1個のみのインターフェース）のインスタンスを簡潔に作る構文。@FunctionalInterfaceアノテーションを付けると意図を明示でき違反時はエラーになる。defaultやstaticは抽象メソッド数に含まない。"
  },
  {
    id: 142, chapter: 6,
    question: "次のラムダ式として正しい構文はどれか。",
    choices: [
      "(x, y) -> x + y",
      "(x, y) => x + y",
      "lambda (x, y) { return x + y; }",
      "function(x, y) { x + y }"
    ],
    answer: 0,
    brief: "Javaのラムダは (引数) -> 本体。矢印は->。",
    detail: "Javaのラムダ式は (引数) -> 式 または (引数) -> { 文; return 値; } の形式。C#やJavaScriptの => とは違い -> （ハイフン+不等号）を使う。引数1つなら括弧省略可（x -> x*2）。"
  },
  {
    id: 143, chapter: 6,
    question: "次のコードの出力はどれか。\n\njava.util.function.Function<Integer, Integer> f = x -> x * x;\nSystem.out.println(f.apply(4));",
    choices: ["4", "8", "16", "コンパイルエラー"],
    answer: 2,
    brief: "Function.apply(4)で4*4=16を返す。",
    detail: "java.util.function.Function<T,R>は apply(T)→R を持つ関数型インターフェース。ラムダ x -> x*x でFunctionインスタンスを作り、apply(4)を呼ぶと4*4=16が返る。他にもConsumer, Supplier, Predicateなどがある。"
  },
  {
    id: 144, chapter: 6,
    question: "次のコードの出力はどれか。\n\nclass A { void m() { System.out.print(\"A\"); } }\nclass B extends A { void m() { System.out.print(\"B\"); super.m(); } }\n\n// new B().m();",
    choices: ["A", "B", "BA", "AB"],
    answer: 2,
    brief: "B.mでBを出力後super.m()でAを出力。BA。",
    detail: "new B().m()はBのmを呼ぶ。Bのmは最初にBを出力してからsuper.m()で親クラスAのmを呼びAを出力。結果はBA。superはオーバーライドを避けて親の実装を呼びたいときに使う。"
  },
  {
    id: 145, chapter: 6,
    question: "final クラスに関する正しい記述はどれか。",
    choices: [
      "継承できない（extendsできない）",
      "インスタンス化できない",
      "フィールドを持てない",
      "メソッドを持てない"
    ],
    answer: 0,
    brief: "finalクラスは継承禁止。StringもfinalクラスなのでStringを継承するクラスは書けない。",
    detail: "finalクラスは継承（extends）できない。代表例にString, Integer, Mathクラスなど。設計上拡張されたくない（不変性を保ちたい等）クラスに付ける。"
  },
  {
    id: 146, chapter: 6,
    question: "インターフェースにおけるstaticメソッドについて正しい記述はどれか（Java 8以降）。",
    choices: [
      "書けない",
      "書けるが呼び出せない",
      "書けて、インターフェース名.メソッド名で呼び出せる",
      "サブクラスが継承する"
    ],
    answer: 2,
    brief: "Java 8以降、インターフェースにstaticメソッドが書ける。呼び出しは InterfaceName.method()。",
    detail: "Java 8からインターフェースにstaticメソッドが書ける。呼び出しはInterfaceName.method()のみ（実装クラスからは継承されない）。ユーティリティ的メソッド（例: Stream.of()）をインターフェースに集約できるようになった。"
  },
  {
    id: 147, chapter: 6,
    question: "次のコードのコンパイル結果はどれか。\n\ninterface I { void m(); }\nclass C implements I {}",
    choices: [
      "正常コンパイル",
      "Cがm()を実装していないためコンパイルエラー",
      "ランタイム時に例外",
      "mが自動生成される"
    ],
    answer: 1,
    brief: "非abstractクラスはインターフェースの全抽象メソッドを実装する必要がある。",
    detail: "非abstractなクラスがinterfaceをimplementsする場合、抽象メソッドをすべて実装する必要がある。実装しないならclassもabstractにするか、メソッドを実装する必要がある。エラー「C is not abstract and does not override abstract method m()」。"
  },
  {
    id: 148, chapter: 6,
    question: "throwとthrowsの違いとして正しいものはどれか。",
    choices: [
      "throwは例外を投げる文、throwsはメソッドが投げる可能性がある例外の宣言",
      "どちらも同じ",
      "throwはメソッド宣言、throwsは文",
      "throwは戻り値、throwsは例外"
    ],
    answer: 0,
    brief: "throwは「今」投げる。throwsは「投げる可能性がある」宣言。",
    detail: "throwはメソッド内で例外を発生させる文（throw new RuntimeException();）。throwsはメソッド宣言で「このメソッドはこの例外を投げる可能性がある」とシグネチャに書くキーワード（void m() throws IOException）。チェック例外では呼び出し側の対処を強制する。"
  },
  {
    id: 149, chapter: 6,
    question: "次のラムダ式と等価な匿名クラスはどれか。\n\nRunnable r = () -> System.out.println(\"Hi\");",
    choices: [
      "Runnable r = new Runnable() { public void run() { System.out.println(\"Hi\"); } };",
      "Runnable r = Runnable.create(\"Hi\");",
      "Runnable r = \"Hi\";",
      "Runnable r = System.out::println;"
    ],
    answer: 0,
    brief: "ラムダは関数型インターフェースの匿名クラスの短縮形。",
    detail: "ラムダ式は関数型インターフェース（抽象メソッド1個のインターフェース）の匿名クラス実装を簡潔に書いたもの。Runnableのrun()メソッドの実装を () -> {} で表現する。Dではメソッド参照。"
  },
  {
    id: 150, chapter: 6,
    question: "Exceptionクラスの階層で正しいものはどれか。",
    choices: [
      "Throwable ← Error, Exception ← RuntimeException",
      "Object ← Error ← Exception",
      "Exception ← Throwable",
      "RuntimeException ← Exception"
    ],
    answer: 0,
    brief: "Throwable直下にErrorとExceptionがあり、Exception直下にRuntimeExceptionがある。",
    detail: "java.lang.Throwableが最上位。その下にError（OutOfMemoryError等、回復不能）とException。Exceptionの下にRuntimeException（非チェック例外: NullPointerException等）とその他（チェック例外: IOException等）。throw できるのはThrowableのサブクラスのみ。"
  }
];
