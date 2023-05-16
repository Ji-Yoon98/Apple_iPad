import ipads from '../data/ipads.js';
import navigations from '../data/navigations.js';

// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  basketEl.classList.toggle('show');
});

basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
});

window.addEventListener('click', function () {
  basketEl.classList.remove('show');
});

// 검색
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]
const duration = .4 // 초(seconds) 단위, 시간을 변수에 저장해서 사용하면 쉽게 관리 용이

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', event => {
  event.stopPropagation() // 데스크탑 레이아웃에서 클릭 이벤트가 버블링되어, 모바일 레이아웃에서 searchTextFieldEl가 클릭된 상태로 변하는 것을 방지
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / headerMenuEls.length}s` // 순서 * 지연 시간 / 애니메이션할 요소 개수
  })
  // .reverse() 사용하지 않고 원래 순서대로 반복 처리.
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / searchDelayEls.length}s`
  })
  // 검색 인풋 요소가 나타난 후 동작
  setTimeout(() => {
    searchInputEl.focus()
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / headerMenuEls.length}s`
  })
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = `${index * duration / searchDelayEls.length}s`
  })
  searchDelayEls.reverse() // 나타날 때 원래의 순서대로 처리해야 하기 때문에 다시 뒤집어서 순서 돌려놓기!
  searchInputEl.value = '' // 입력값 초기화
}

function playScroll() {
  // documentElement is <html>
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

// header menu toggle[m]
const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if(headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// header search[m]
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', () => {
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click', () => {
  headerEl.classList.remove('searching--mobile')
})

window.addEventListener('resize', function () {
  if(window.innerWidth <= 740) {
    headerEl.classList.remove('searching')
    video.pause();
    pauseBtn.classList.add('hide')
    playBtn.classList.remove('hide')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// 네비게이션 메뉴 toggle[m]
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', () => {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu()
  } else {
    showNavMenu()
  }
})
navEl.addEventListener('click', event => {
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navEl.classList.add('menuing')
}

function hideNavMenu() {
  navEl.classList.remove('menuing')
}


// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if(!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})

// 비디오 재생
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
  video.pause();
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})

// '당신에게 맞는 iPed는?' 렌더링
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(ipad => {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(color => {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  // VS Code 확장 프로그램 - Comment tagged templates
  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})

// 푸터 내비게이션 맵 랜더링
const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(nav => {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(map => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`
  })

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll('footer .navigations .map')]
mapEls.forEach(el => {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', () => {
    el.classList.toggle('active')
  })
})
