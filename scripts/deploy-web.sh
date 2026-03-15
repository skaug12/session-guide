#!/bin/bash
# session-guide 웹 빌드 → GitHub Pages (gh-pages 브랜치) 배포
set -e

cd "$(dirname "$0")/.."
PROJECT_DIR=$(pwd)

echo "=== 웹 빌드 시작 ==="
npm run build:web

echo "=== gh-pages 배포 ==="
cd dist-web

# .nojekyll 추가 (GitHub Pages Jekyll 처리 방지)
touch .nojekyll

# git 초기화 및 push
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy handouts $(date '+%Y-%m-%d %H:%M')"
git remote add origin https://github.com/skaug12/session-guide.git 2>/dev/null || true
git push -f origin gh-pages

echo "=== 배포 완료 ==="
echo "https://skaug12.github.io/session-guide/"

# 정리
cd "$PROJECT_DIR"
rm -rf dist-web/.git
