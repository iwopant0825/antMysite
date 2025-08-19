# ChaHoRim Portfolio 3D (R3F) - Starter

이 프로젝트는 Vite + React 기반의 3D 포트폴리오(자기소개서) 웹의 초기 세팅입니다. R3F(react-three-fiber), Drei, Styled-Components 등을 포함합니다.

## 포함 라이브러리
- React 19 + Vite 7
- three, @react-three/fiber, @react-three/drei, @react-three/postprocessing
- @react-spring/three, styled-components, react-spinners, react-router-dom

## 자산 연결
- `public/Logo.svg` 파비콘
- `public/font/` Pretendard 폰트(`index.css`에서 @font-face로 연결)

## 개발
```bash
npm i
npm run dev
```

## 빌드
```bash
npm run build && npm run preview
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
