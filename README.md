# gbfTransKor

마스터 버전 다운로드: https://github.com/sidewinderk/gbfTransKor/archive/master.zip

번역 데이터 업데이트용 시트(공개): https://docs.google.com/spreadsheets/d/1LQiu94RhA5gRlcOja0oMrtRKfql14yCvJZlpa25xvi0/edit?usp=sharing


## 사용법 (일반 사용자)

### 크롬확장으로 실행하기
#### 크롬확장 설치방법
 1. 이 repository 를 zip으로 다운받기 (우측 상단 Clone or download, 녹색버튼 에서 Download ZIP)
 2. 적당한 곳에서 압축 풀기
 3. **크롬 브라우저** 메뉴에서 `More Tools -> Extensions` (chrome://extensions/ 로 바로가도 됨)
 4. 우측 상단의 관리자모드(Developer mode)를 켠 뒤 `Load unpacked`를 클릭하고 압축을 푼 폴더를 선택

#### 크롬확장 메뉴 설명
설치 이후 우측 상단 크롬확장 리스트에 번역헬퍼가 추가된 것을 확인할 수 있음.

클릭하여 번역에 기여할 수 있는 툴을 볼 수 있지만, 일반 사용시에는 옵션을 클릭하여 옵션 페이지로 이동.

Use Extraction mode 와 Set Verbose output 의 체크를 해제 하고, Translate the text 에만 체크를 해둠.

그리고 아래의 Use Online DB 클릭 한 뒤 Save 버튼을 누르면 일반 사용자는 바로 사용할 수 있음.

### 자바스크립트로 바로 실행하기
아래 라인의 자바스크립트를 원하는 브라우저에서 실행.

이 경우, 모바일에서도 실행가능 (alook 브라우저 등의 유저 스크립트를 불러올 수 있는 브라우저를 활용)

아이폰 alook 브라우저에서 설정하는 과정 유튜브링크: https://youtu.be/nRDuj0a0y1Q
~~~
(function() {
  const script = document.createElement('script');
  script.src = 'https://sidewinderk.github.io/gbfTransKor/gbfTrans.js';
  document.head.appendChild(script);
})();
~~~

## 기여방법 (번역자용)

원문 추출 방법 유튜브 링크: https://youtu.be/g2pUGXt628E

 1. 먼저 크롬확장을 설치해야함. (위의 설치방법 참조)
 2. 설치 이후, 크롬 우상단의 확장 목록에서 메뉴를 열 수 있음.
 3. 이 크롬확장 메뉴에서 `Option Page`를 클릭하여 옵션 페이지로 이동
 4. 옵션 페이지에서 `Use Extraction mode`를 체크한 뒤 `Save`
 5. 이제부터 게임 내에서 방문하는 페이지에 있는 텍스트를 자동으로 저장하게됨.
 6. 크롬확장 메뉴에서 Get Text, Get Name, Get Misc. 를 각각 클릭하여 아래에 있는 텍스트 창에서 수집한 텍스트를 얻을 수 있음.
 7. 텍스트 창 위의 Copy text로 내용을 복사 할 수 있음.
 8. GetText를 한 뒤 DownText 버튼을 눌러 바로 csv파일을 다운로드 할 수 있음.
 * (용어 설명) text: 인게임 시나리오 name: 인게임 시나리오에서 표시되는 이름 misc. 그 외의 인 게임 내 모든 텍스트
 
위의 방법으로 얻는 텍스트는 csv 파일로 처럼 ,(쉼표)로 구분되어져있음. 좌측은 원어,우측은 한국어(번역)

~~~
jp,kr
サンプルテキスト,
所持数<span class="txt-possessed-summon">	*** / ***</span>,
~~~
간단히, 좌측의 내용에 대한 번역을 우측에 적으면 됨. 
~~~
jp,kr
サンプルテキスト,샘플 텍스트
所持数<span class="txt-possessed-summon">	*** / ***</span>,소지수<span class="txt-possessed-summon">	*** / ***</span>
~~~
완료하면 위와 같은 형태가 됨.

번역 과정 및 DB 업데이트 과정 유트브 영상 링크: https://youtu.be/Wxxb0DTpwug

작업하면서 변경된 텍스트를 바로 확인하고싶다면, 옵션에서 Use Local DB 를 클릭한뒤, 크롬확장의 압축이 풀려있는 디렉토리에서 data 폴더에 있는 각 db 파일에 번역이 완료된 텍스트를 아래에 붙여넣고 저장한뒤 웹페이지를 새로고침하면 바로 확인할 수 있음.

작업량이 많은 경우 csv로 엑셀/개인 구글드라이브 시트 등에서 작업하고, 구글 스프레드 시트 메뉴중, 파일-> 가져오기 -> 업로드-> csv파일선택 -> 가져오기 위치에서 새 시트 삽입 선택 -> 데이터가져오기 클릭하여 새 시트로 가져온 뒤, 시트명을 규칙에 맞게 변경.
