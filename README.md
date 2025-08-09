# 말랑이 AI 챗봇

이 프로젝트는 말랑이에 대한 정보를 제공하고, 사용자가 말랑 AI와 직접 대화할 수 있는 AI 챗봇 기능을 제공합니다.

## 주요 기능

*   **말랑이 AI와 대화하기**: 사용자는 AI 챗봇과 자연스러운 대화를 통해 말랑이에 대해 더 알아갈 수 있습니다.
*   **사용자 인증**: Supabase Auth를 통해 간편하게 소셜 로그인 및 이메일 기반의 회원가입/로그인 기능을 구현할 수 있습니다.
*   **다국어 지원**: i18n을 통해 한국어와 영어를 지원하며, 다른 언어 추가도 용이합니다.
*   **반응형 디자인**: Tailwind CSS를 사용하여 모바일, 태블릿, 데스크톱 등 다양한 디바이스에서 최적화된 화면을 제공합니다.

## 기술 스택

*   **프레임워크**: [Astro](https://astro.build/)
*   **UI 라이브러리**: [React](https://react.dev/)
*   **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
*   **백엔드 및 데이터베이스**: [Supabase](https://supabase.com/)
*   **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
*   **배포**: [Netlify](https://www.netlify.com/)

## 시작하기

프로젝트를 로컬 환경에서 실행하고 개발을 시작하려면 아래의 가이드를 따라주세요.

### 사전 준비

*   [Node.js](https://nodejs.org/) v18.14+
*   [Netlify 계정](https://netlify.com/)
*   [Supabase 계정](https://supabase.com/)
*   AI 공급자(예: OpenAI)의 API 키

### 설치 및 실행

1.  이 저장소를 복제(clone)합니다.
2.  `npm install` 명령어로 의존성을 설치합니다.
3.  Supabase 프로젝트를 생성하고, `supabase/migrations` 디렉토리의 SQL을 실행하여 데이터베이스를 설정합니다.
4.  `.env.example` 파일을 복사하여 `.env` 파일을 만들고, Supabase 프로젝트의 URL과 anon key, 그리고 AI 공급자의 API 키를 입력합니다.
5.  `npm run dev` 명령어로 개발 서버를 실행합니다.

## 만든이

이 프로젝트는 소프트웨어 엔지니어 Jules에 의해 만들어졌습니다. AI 기술을 활용하여 더 나은 사용자 경험을 제공하는 것에 관심이 많습니다.

---

기존의 기술적인 내용은 `USAGE.md` 파일로 옮겨서 필요시 참고할 수 있도록 하였습니다.
