# 프로젝트 주문형 액자 gift-frame

## 앱소개

...

# TODOs..

- [ ] 템플릿 리파지터리 구성

# 프로젝트 구성 해야할 것

- [ ] 페이지 구조
- [ ] supabase 초기 데이터 통신

# 잡아야 하는 오류

# 개선을 해보자

## 기획

## 시스템

## 디자인

# 개발 지식

### tailwind theme 잡는 법

1. global 에서 색상 추가 hsl 코드로 추가한다

- vscode 확장자로 색상을 바로 볼 수 있기 때문
- original은 hsl 없이 표되 있다.

2. tailwind.config.js 에서 색상 코드 추가

- extend 구문의 색상을 추가할 수 있다.
- brand: 'var(--brand)', 기존과 다르게 hsl 없이 기입한다 (global.css 에서 이미 넣었기 때문)

3. 그리고 테스트

# 웹 배포 방법

1. $ npm run export -p web
2. dist 폴더를 시놀로지 docker/serve/ 폴더 안으로 모두 복사 덮어 쓰기
