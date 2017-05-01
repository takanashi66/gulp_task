# gulp

## Node.jsのインストール
[Node.jsインストーラ](https://nodejs.org/ja/)

## gulpのインストール

```
npm install -g gulp
```

## プラグイン

+ browser-sync
+ gulp-sass
+ gulp-plumber
+ gulp-notify
+ gulp-autoprefixer
+ gulp-sourcemaps
+ gulp-merge-media-queries
+ gulp-uglify
+ gulp-concat
+ gulp-pug
+ gulp-babel
+ babel-preset-es2015

### プラグインのインストール

```
npm install
```

### babelの準備

#### babel-cliをインストール(すでにインストールしている場合は不要)

```
npm install -g babel-cli
```


#### ES2015の設定

```
npm install babel-preset-es2015
```


## ディレクトリマップ

```
project/
	├ htdocs/
	│		├ common/
	│		│ 	├ sass/
  │		│ 	│   ├ base/
  │		│ 	│   ├ page/
  │		│ 	│   └ style.scss
	│		│ 	├ css/
	│		│ 	├ map/
	│		│ 	├ img/
	│		│ 	└ js/
  │		│ 	    ├ es/
  │		│ 	    └ script.js
	│		├ pug/
	│		└index.html
	│
	├ .git/
	├ node_modules/
	├ gulpfile.js
	└ package.json

```


## もしプラグインが壊れていた場合

```
npm rebuild [壊れてたプラグイン名]
```
