# 롤링페이퍼 프로젝트

## 설명
자신만의 롤링페이퍼를 만들고  
사람들에게 링크를 전달해 편지를 받을 수 있는 웹서버
## 사용
`/backend/ssl` 경로에 SSL 인증서를 넣습니다

`/backend/.env` 파일 생성 후 아래 요소들을 채워넣습니다

```
SERVERPORT = SSL: 443, DEFAULT: 80
MONGOURL = "몽고디비 연결 URL"
HASHKEY = "PW 해시에 사용될 문자열"
JWTKEY = "(일반적으로 32글자) 문자열"
```

```sh
cd ./backend
npm intall
ts-node ./src/index
```

## SSL을 사용하지 않을 경우
아래와 같이 수정해주세요
> SERVERPORT: 80
```typescript
app.listen(process.env.SERVERPORT!, () => logger.info(`Server listen at port ${process.env.SERVERPORT!}`));
```

## TODO [#2024.1.17 ~]
- [x] 서버 포트를 .env 환경변수로 넣기
- [x] package.json에서 @types모듈은 devDependencies로 넣기
- [ ] user-controller > getPapers 함수 > result 값의 타입 명시
- [ ] `paper`, `gift`, `detail`의 구분을 명확히 하기 위해 Api 엔드포인트 수정 및 추가
- [ ] JWT 인증 부분을 미들웨어로 처리

## GET /
- /
- /profile
- /paper
- /register
- /login
- /detail
- /write
- /setting

## POST/GET /api
- /api/login  
  POST
  ```json
  { "id": "hello", "pw": "world" }
  ```
- /api/register  
  POST
  ```json
  { "id": "hello", "pw": "world", "nickname": "Kim"}
  ```
- /api/detail  
  GET query: `paperId`
- /api/gift  
  POST
  ```json
  { "userId": "myuserid", "nickname": "표시될 닉네임", "title": "안녕 친구야?", "content": "반가워!"}
  ```
  GET query: `userId`