# gulp

## Node.jsのインストール
[Node.jsインストーラ](https://nodejs.org/ja/)

## gulpのインストール

```
npm install -g gulp
```

## プラグイン

+ gulp
+ babel-core
+ babel-loader
+ babel-polyfill
+ babel-preset-env
+ browser-sync
+ gulp-autoprefixer
+ gulp-merge-media-queries
+ gulp-notify
+ gulp-plumber
+ gulp-pug
+ gulp-sass
+ gulp-sourcemaps
+ webpack
+ webpack-stream


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
