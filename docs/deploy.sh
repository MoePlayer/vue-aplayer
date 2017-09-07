rm -rf _book
rm -rf ../demo/docs
cp ../README.md README.md
gitbook build
mv _book ../demo/docs
cd ../demo
git init
git add -A
git commit -m 'update book'
git push -f git@github.com:MoeFE/vue-aplayer.git master:gh-pages
