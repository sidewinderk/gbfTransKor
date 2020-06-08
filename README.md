# gbfTransKor

마스터 버전 다운로드: https://github.com/sidewinderk/gbfTransKor/archive/master.zip

크롬확장스토어 버전: https://chrome.google.com/webstore/detail/lcadlhedpdcgnkmoaoipbmhdeacciipk/

Tamper Monkey 용 스크립트 링크: https://greasyfork.org/ko/scripts/403436-%EA%B7%B8%EB%B8%94%EB%B9%A4-%ED%95%9C%EA%B8%80-%ED%8C%A8%EC%B9%98-%EB%A7%81%ED%81%AC

번역 데이터 업데이트용 시트(공개): https://docs.google.com/spreadsheets/d/1LQiu94RhA5gRlcOja0oMrtRKfql14yCvJZlpa25xvi0/edit?usp=sharing

안드로이드 설치방법(키위 브라우저): https://youtu.be/7PkpmiuJZFA

아이폰 설치방법(Alook 브라우저): https://youtu.be/nRDuj0a0y1Q

PC버전 설치/설정방법: 아래 문서 참조.


## 사용법 (일반 사용자)

### 크롬확장으로 실행하기
#### 크롬확장 설치방법
 1. 이 repository 를 zip으로 다운받기 (우측 상단 Clone or download, 녹색버튼 에서 Download ZIP)
 2. 적당한 곳에서 압축 풀기
 3. **크롬 브라우저** 메뉴에서 `More Tools -> Extensions` (chrome://extensions/ 로 바로가도 됨)
 4. 우측 상단의 관리자모드(Developer mode)를 켠 뒤 `Load unpacked`를 클릭하고 압축을 푼 폴더를 선택

#### 크롬확장 메뉴 설명
설치 이후 우측 상단 크롬확장 리스트에 번역헬퍼가 추가된 것을 확인할 수 있음.

  * 번역 켜기를 누르고 새로고침을 하면 기본적으로 텍스트 번역 모드가 활성화됨. 
  * 추출모드는 번역에 기여하고 싶을 때 쓰는 기능.

##### 상세설정 #####
  * 번역관련 추가 설정
    * 이미지 번역: 체크 되어있으면 번역된 이미지에 대한 변환을 실행함. 메인UI등. 이게 찝찝하다 혹은 느려지는 거 같다고 생각하면 체크를 해제하면됨.
    * 전투화면에서도 번역: 전투시에 나오는 텍스트에 대한 번역 설정인데, 마찬가지로 체크박스가 해제 되면 전투시엔 번역기능이 안돌아가게됨. 찝찝하면 체크를 해제하면됨.
  * 번역 데이터베이스 설정
    * 일반적인 이용에서는 온라인 DB를 사용하면됨.
    * 로컬DB는 번역에 기여하고 싶을 때 사용하면됨
  * 폰트 설정
    * 기본 폰트가 나눔스퀘어B이고, 내 취향인 청소년체를 서브 옵션으로 넣어뒀음.
    * 만약 본인이 원하는 폰트가 따로 있으면(웹폰트) 아래의 양식대로 넣고 '유저폰트'를 누르면 적용될것.

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
orig,kr
サンプルテキスト,
所持数<span class="txt-possessed-summon">	*** / ***</span>,
~~~
간단히, 좌측의 내용에 대한 번역을 우측에 적으면 됨. 
~~~
orig,kr
サンプルテキスト,샘플 텍스트
所持数<span class="txt-possessed-summon">	*** / ***</span>,소지수<span class="txt-possessed-summon">	*** / ***</span>
~~~
완료하면 위와 같은 형태가 됨.

번역 과정 및 DB 업데이트 과정 유트브 영상 링크: https://youtu.be/Wxxb0DTpwug

작업하면서 변경된 텍스트를 바로 확인하고싶다면, 옵션에서 Use Local DB 를 클릭한뒤, 크롬확장의 압축이 풀려있는 디렉토리에서 data 폴더에 있는 각 db 파일에 번역이 완료된 텍스트를 아래에 붙여넣고 저장한뒤 웹페이지를 새로고침하면 바로 확인할 수 있음.

작업량이 많은 경우 csv로 엑셀/개인 구글드라이브 시트 등에서 작업하고, 구글 스프레드 시트 메뉴중, 파일-> 가져오기 -> 업로드-> csv파일선택 -> 가져오기 위치에서 새 시트 삽입 선택 -> 데이터가져오기 클릭하여 새 시트로 가져온 뒤, 시트명을 규칙에 맞게 변경.

#### 스토리 텍스트 추출 하는 법

1. 확장 프로그램 설치
2. 그랑블루 판타지 접속 - 스토리 재생
3. F12 누르기 - 새로고침 누르기
4. 이후 Skip 버튼 누르면서 스토리 끝내기 - 언어 설정 영어로 바꾸기
5. 똑같은 스토리 재생하기 - Skip 버튼 누르면서 스토리 끝내기
6. 확장 프로그램 누르기 - 추출 모드 누르기 - 스토리 텍스트 가져오기 버튼 누르기로 추출됐는지 확인
7. "Csv 파일로 다운로드" 버튼 누르기 - 구글 스프레드시트에 붙여넣기를 하거나 파일 업로드하기
8. Origin 칸의 내용을 Korean 칸에 복사&붙여넣기. 이제 Korean 칸에서 일본어 또는 영어로 써져있는 글자들을 한글로 번역하기.
9. 만약 번역자가 일본어판으로 번역을 완료했다면 Korean 칸을 전부 복사해서 밑에 똑같이 추출된 영어판의 Korean 부분에 붙여넣기.

#### 스토리 번역 적용하는 법
1. 확장 프로그램 설치
2. 그랑블루 판타지 접속 - 스토리 재생
3. 확장 프로그램에서 "번역 켜기" 누르기
3-1. 만약 번역 적용안되면 새로고침 누르기

#### CSV 파일 구조 & 용어 설명
Language, SceneCode, Type, Name, Origin, Korean

Language에는 English 또는 Japancess 값만 할당됨.
SceneCode에는 어떤 스토리를 재생하고있는지 구분하기위한 값이 들어있음.
Type에는 Synopsis(줄거리), Detail(캐릭터 대사), sel_txt(선택지 문장들) 문장 유형값이 들어감.
Name에는 캐릭터 명이 들어가는데 이건 번역해도 적용안됨. 번역자들의 문장 번역에 도움되게 할라고 넣어둠.
Origin 칸에는 원문 칸이들어감.
Korean 칸에는 번역문이 들어감.
