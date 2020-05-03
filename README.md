# gbfTransKor

## 사용법 (일반 사용자)

### 크롬확장으로 실행하기
#### 크롬확장 설치방법
 1. 이 repository 를 zip으로 다운받기 (우측 상단 Clone or download, 녹색버튼 에서 Download ZIP)
 2. 적당한 곳에서 압축 풀기
 3. **크롬 브라우저** 메뉴에서 `More Tools -> Extensions` (chrome://extensions/ 로 바로가도 됨)
 4. `Load unpacked`를 클릭하고 압축을 푼 폴더를 선택

### 자바스크립트로 바로 실행하기
아래 라인의 자바스크립트를 원하는 브라우저에서 실행.
이 경우, 모바일에서도 실행가능 (alook 브라우저 등의 유저 스크립트를 불러올 수 있는 브라우저를 활용)
~~~
(function() {
  const script = document.createElement('script');
  script.src = 'https://sidewinderk.github.io/gbfTransKor/gbfTrans.js';
  document.head.appendChild(script);
})();
~~~

## 기여방법 (번역자용)
 1. 먼저 크롬확장을 설치해야함. (위의 설치방법 참조)
 2. 설치 이후, 크롬 우상단의 확장 목록에서 메뉴를 열 수 있음.
 3. 이 크롬확장 메뉴에서 `Option Page`를 클릭하여 옵션 페이지로 이동
 4. 옵션 페이지에서 `Use Extraction mode`를 체크한 뒤 `Save`
 5. 이제부터 게임 내에서 방문하는 페이지에 있는 텍스트를 자동으로 저장하게됨.
 6. 크롬확장 메뉴에서 Get Text, Get Name, Get Misc. 를 각각 클릭하여 아래에 있는 텍스트 창에서 수집한 텍스트를 얻을 수 있음.
 7. 텍스트 창 위의 Copy text로 내용을 복사 할 수 있음.
 * (용어 설명) text: 인게임 시나리오 name: 인게임 시나리오에서 표시되는 이름 misc. 그 외의 인 게임 내 모든 텍스트
 
위의 방법으로 얻는 텍스트는 csv 파일 처럼 |(파이프)로 구분되어져있음. 좌측은 원어|우측은 한국어(번역)

~~~
jp|kr
サンプルテキスト|
所持数<span class="txt-possessed-summon">	*** / ***</span>|
~~~
간단히, 좌측의 내용에 대한 번역을 우측에 적으면 됨. 이 때 좌측의 빈칸(탭)이나 태그 등은 그대로 유지되어야하므로 좌측을 복사해서 우측에 붙여넣고, 원어만 한국어로 번역하는 방식으로 진행하는 것을 추천.
~~~
jp|kr
サンプルテキスト|샘플 텍스트
所持数<span class="txt-possessed-summon">	*** / ***</span>|소지수<span class="txt-possessed-summon">	*** / ***</span>
~~~
완료하면 위와 같은 형태가 됨.
