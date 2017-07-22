npm run build:doc
cd demo
git init
git add -A
git commit -m 'update demo'
git push -f git@github.com:MoeFE/vue-aplayer.git master:gh-pages
