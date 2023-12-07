## MERN 스택 블로그 만들기

### 개요

🐤 MERN 스택으로 만든 개인 블로그입니다.  
👩‍🔧 이전에 만들었던 [리액트 블로그 프로젝트](https://github.com/imminpie/create-react-blog)가 아쉬움이 남아 다시 만들어 보았습니다.

### 사용 기술

[![My Skills](https://skillicons.dev/icons?i=mongodb,express,react,nodejs,tailwind)](https://skillicons.dev)

### 구현 기능

✅ 회원가입: 사용자들은 정보를 제공하고 프로필 사진을 업로드하여 계정을 만들 수 있습니다.  
✅ 로그인: 카카오 계정으로 로그인할 수 있습니다.  
✅ 사용자 인증: 보안 인증을 위해 JWT를 사용하여 보호된 경로에 접근이 보장됩니다.  
✅ 게시글 작성: 사용자들은 업로드한 사진을 포함한 게시물을 작성할 수 있습니다.  
✅ 사용자 프로필: 사용자 프로필을 설정할 수 있습니다.  
✅ 다크모드: 모든 화면에 다크모드가 적용됩니다.  
✅ 반응형 디자인: 다양한 화면 크기와 기기에 최적화되어 있습니다.

### 스크린샷

#### 메인화면

- 무한스크롤이 적용됩니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/f8fb1417-745e-41cd-a25e-1d7235b85ab4)

#### 회원가입 및 로그인

- 이메일은 중복될 수 없습니다.
- 카카오 계정으로 로그인할 수 있습니다.
- 유효성 검사가 적용됩니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/08f12be1-e482-4447-b65a-102c689b6b69)

![image](https://github.com/imminpie/create-react-blog/assets/147225251/9f38acdc-c3ea-47d6-b71b-328f4529700d)

#### 게시글 작성

- 제목, 내용, 태그를 작성합니다.
- 제목과 내용을 필수로 입력해야 합니다.
- 본인이 작성한 게시글만 수정하고 삭제할 수 있습니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/41abf0cb-2f6b-4b23-a482-872086f67eff)

![image](https://github.com/imminpie/create-react-blog/assets/147225251/cc7b1afd-be6a-49ff-8e6d-a02a38342841)

#### 검색

- 게시글 제목과 내용을 검색할 수 있습니다.
- 태그를 선택하면 검색결과로 이동합니다.
- 닉네임을 선택하면 해당 사용자가 작성한 글이 나타납니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/97f559d1-71b9-4fcf-a8c5-6e65a0218c01)

![image](https://github.com/imminpie/create-react-blog/assets/147225251/9b59b6eb-332e-42c0-822f-022583d8a829)

![image](https://github.com/imminpie/create-react-blog/assets/147225251/710125c4-ea75-4322-8981-f690cf5d157e)

#### 사용자 프로필

- 프로필 이미지, 닉네임, 한 줄 소개를 설정할 수 있습니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/731d5f4e-31a8-46ad-9682-ccde61e0c5d0)

#### 다크모드

- 모든 화면에 다크모드가 적용됩니다.

![image](https://github.com/imminpie/create-react-blog/assets/147225251/fdf3e01f-42ce-455d-9451-36504477d872)

![image](https://github.com/imminpie/create-react-blog/assets/147225251/ceca97e4-5012-483d-a395-8ea050026093)

### 설치 및 실행

⚠️ **중요** ⚠️

- 카카오 로그인을 사용하기 위해 REST API 및 Redirect URI 정보가 필요합니다.
- 자세한 정보는 [카카오 개발자 사이트](https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#kakao-login) 를 확인해 주세요.
- 이메일, 닉네임 정보를 가져오기 위해 [추가 항목 동의 받기](https://developers.kakao.com/docs/latest/ko/kakaologin/common#additional-consent)를 반드시 설정해 주세요.

1. **npm 패키지 설치**

   1. 백엔드 패키지 설치

   ```bash
   $ cd server
   $ npm install
   ```

   2. 프론트엔드 패키지 설치

   ```bash
   $ cd client
   $ npm install
   ```

2. **백엔드 .env 파일을 생성합니다.**

   ```bash
   $ cd server
   $ touch .env
   ```

   백엔드 .env 의 샘플 코드

   ```js
   PORT = 5000
   DB_URL = mongodb://127.0.0.1:27017/mern
   JWT_SECRET = JWT 비밀 키
   REST_API_KEY = 카카오 로그인 REST API 키
   REDIRECT_URI = 카카오 로그인 Redirect URI
   KAKAO_LOGIN_PASSWORD = 카카오 로그인을 사용한 사용자의 회원 비밀번호 설정
   ```

3. **프론트엔드 .env 파일을 생성합니다.**

   ```bash
   $ cd client
   $ touch .env
   ```

   프론트엔드 .env 의 샘플 코드

   ```js
   GENERATE_SOURCEMAP = false
   REACT_APP_REST_API_KEY = 카카오 로그인 REST API 키
   REACT_APP_REDIRECT_URI = 카카오 로그인 Redirect URI
   ```

4. **백엔드 실행**

   ```bash
    $ cd server
    $ nodemon app.js
   ```

5. **프론트엔드 실행**

   ```bash
    $ cd client
    $ npm start
   ```

6. **데이터베이스 실행**

   ```bash
    $ mongod
   ```

### 회고 🤔

MERN 스택을 활용해서 개인 블로그를 개발해보았습니다. 이번 프로젝트를 시작하게 된 계기는 이전에 만들었던 리액트 기반 블로그가 아쉬움이 남아 있었기 때문입니다. 더 나은 블로그를 만들고 싶었습니다.

이번에는 리액트를 서버와 연동해서 사용하기로 결정했고, 익숙한 스프링과 SQL 대신 JavaScript 기반의 Node.js와 NoSQL인 MongoDB를 선택했습니다. 새로운 언어를 배우고 싶었기 때문입니다.

일단 도전해봐야 어려운지 쉬운지를 알 수 있습니다. 직접 프로젝트를 진행하면서 새로운 언어를 익혀나갔습니다. 이렇게 MERN 스택을 활용한 블로그 개발 프로젝트를 시작하게 되었습니다.

이전보다 큰 발전을 이루었다고 느낍니다. 물론 아직도 미숙한 부분이 많습니다. 그렇지만 현재 할 수 있는 최선을 다했으니 후회는 없습니다. 앞으로 더 나은 개발자로 성장하고자 합니다.

### 링크

- MongoDB: https://www.mongodb.com/
- Mongoose: https://mongoosejs.com/
- Express: https://expressjs.com/ko/
- React: https://react.dev/
- React Query: https://tanstack.com/query/latest/
- Zustand: https://zustand-demo.pmnd.rs/
- Node: https://nodejs.org/en/download/
- Nodemon: https://github.com/remy/nodemon
- JsonWebToken: https://jwt.io/
- Formik: https://formik.org/docs/overview
- Dotenv: https://github.com/motdotla/dotenv
- Yup: https://github.com/jquense/yup
- Multer: https://github.com/expressjs/multer
- Tailwind CSS: https://tailwindcss.com/
- Headless UI: https://headlessui.com/
- Heroicons: https://heroicons.com/
- MDEditor: https://github.com/uiwjs/react-md-editor
- React-intersection-observer: https://github.com/thebuilder/react-intersection-observer
- TimeAgo: https://github.com/hustcc/timeago.js/tree/master
- Google Fonts: https://fonts.google.com/
