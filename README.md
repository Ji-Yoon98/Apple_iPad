# 🍎 Apple_iPad

### HTML, CSS, JavaScript로 만드는 애플 아이패드 반응형 웹사이트

👉🏻 **[사이트 바로가기](https://apple-ipad-pi.vercel.app/)**

# 🍎 사용기술 & 개발환경

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><br>
<img src="https://img.shields.io/badge/Visual Studio Code-0769AD?style=for-the-badge&logo=Visual Studio Code IDEA&logoColor=white">

<!-- mask-image 알아보고 적기 https://caniuse.com/?search=mask-image(참고) -->

# 🍎 화면구성 및 기능

### CSS 변수

--로 시작하는 변수를 선언해 값을 할당할 수 있음.

```css
html {
  --color-white: #FFF;
  --color-black: #000;
  --color-font: #1D1D1D;
  --color-font-darkgray: #6E6E6E;
  --color-font-middlegray: #b7b7b7;
  --color-font-lightgray: #F5F5F5;
  --color-link: #0071E3;
  --color-link-focus: #81B9F1;
  --color-border: #D2D2D2;
  --color-header: #3A3A3A;
  --color-section: #F5F5F5;
  --color-shadow: rgba(0, 0, 0, .4);
}
.example {
  background-color: var(--color-font);
}
```

### mask-image

CSS 마스킹은 이미지를 마스크 레이어로 사용할 수 있는 옵션을 제공.\
mask-image는 이미지 파일이나 그라디언트를 활용해 사용할 수 있음.\
구글 크롬에서 사용하려면 -webkit-이라는 접두어를 붙여서 사용해야 함.

[참고](https://caniuse.com/?search=mask-image)
