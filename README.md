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
+ gulp-pleeease
+ gulp-notify
+ gulp-autoprefixer
+ gulp-sourcemaps
+ gulp-merge-media-queries
+ gulp-minify-css
+ gulp-uglify
+ gulp-concat
+ gulp-minify-html

### プラグインのインストール

```
npm install --save-dev gulp browser-sync gulp-plumber gulp-sass gulp-notify gulp-autoprefixer gulp-sourcemaps gulp-merge-media-queries gulp-minify-css gulp-uglify gulp-minify-html gulp-concat
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
  │		│ 	│   ├ module/
  │		│ 	│   └ script.js
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
