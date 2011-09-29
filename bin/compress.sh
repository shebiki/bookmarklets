#!/bin/sh
mkdir -p compressed
for f in _includes/*.js; do
  NAME="$(basename $f .js)"
  java -jar tools/yuicompressor-2.4.6.jar --charset utf8 --type js \
    -o compressed/"$NAME.min.js" $f
done
