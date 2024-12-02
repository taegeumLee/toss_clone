# 토스증권 클론 프로젝트

토스증권의 실시간 주식 정보 조회 기능을 클론한 프로젝트입니다.

## 주요 기능

- 실시간 주식 정보 조회 (국내/해외)
- 실시간 차트 시각화
- 사용자 인증 (회원가입/로그인)
- 반응형 UI/UX

## 기술 스택

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- ApexCharts

### Backend

- Next.js API Routes
- Prisma
- SQLite

### 인증

- 쿠키 기반 인증

## 시작하기

1. 저장소 클론

2. 의존성 설치

3. 환경 변수 설정
   `.env.local` 파일을 생성하고 다음 내용을 추가:

```
DATABASE_URL="file:./dev.db"
POLYGON_API_KEY="your_polygon_api_key"
```

4. 데이터베이스 마이그레이션

```bash
npx prisma migrate dev
```

5. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # 인증 관련 라우트
│   ├── (tabBar)/          # 메인 탭바 라우트
│   └── api/               # API 라우트
├── components/            # 재사용 가능한 컴포넌트
├── constants/             # 상수 값
├── hooks/                 # 커스텀 훅
├── lib/                   # 유틸리티 함수
├── prisma/               # Prisma 스키마 및 마이그레이션
├── public/               # 정적 파일
└── types/                # TypeScript 타입 정의
```

## 주요 기능 설명

### 실시간 주식 정보

- Polygon.io API를 활용한 실시간 주식 데이터 조회
- 국내/해외 주식 정보 분리 조회 가능
- 실시간 차트 시각화

### 사용자 인증

- 이메일 기반 회원가입/로그인
- 쿠키 기반 인증 상태 관리
- 미들웨어를 통한 보호된 라우트 관리

### UI/UX

- Framer Motion을 활용한 부드러운 애니메이션
- Tailwind CSS를 활용한 반응형 디자인
- 다크 모드 지원

## 라이선스

MIT License
