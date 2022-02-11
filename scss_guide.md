# SCSS GUIDE

# **개요**

Scss란 CSS의 전처리기로써 보통 CSS Preprocessor라고 부릅니다.

CSS가 동작하기전에 사용하는 기능으로, 웹에서는 분명 CSS가 동작하지만 우리는 CSS의 불편함을 이런 확장 기능으로 상쇄할 수 있습니다.

CSS 전처리기에는 [LESS](https://lesscss.org/), [Stylus](https://stylus-lang.com/), [PostCSS](https://postcss.org/) 등 여러가지가 있으나, 웹 업계에서 많이 사용하는 실질적인 표준(de-facto Standard)은 Sass라 생각하며,

Sass코드를 사용하는 두 가지 방법 중 CSS와 동일하게 중괄호를 사용하는 **SCSS** 기술 방식을 사용하도록 하겠습니다.

# **목차**

- [장점 및 필요성](#장점-및-필요성)
- [구문 & 서식](#구문-&-서식)
- [네이밍 컨벤션](#네이밍-컨벤션)
- [설계](#설계)
- [반응형 디자인과 분기점](#반응형-디자인과-분기점)
    - [브레이크포인트 네이밍](#브레이크포인트-네이밍)
    - [브레이크포인트 매니저](#브레이크포인트-매니저)
    - [미디어 쿼리 사용법](#미디어-쿼리-사용법)
- [변수](#변수)
    - [스코프](#스코프)
    - [여러 개의 변수 혹은 맵](#여러-개의-변수-혹은-맵)
- [Extend](#Extend)
    - [Extend 및 미디어 쿼리](#Extend-및-미디어-쿼리)
- [Mixsins](#Mixsins)
    - [전달인자 없는 믹스인](#전달인자-없는-믹스인)
    - [전달인자 리스트](#전달인자-리스트)
    - [믹스인과 벤더 프리픽스](#믹스인과-벤더-프리픽스)
- [조건문](#조건문)
- [반복문](#반복문)
    - [Each](#Each)
    - [For](#For)
    - [While](#While)
- [경고와 오류](#경고와-오류)
    - [경고](#경고)
    - [오류](#오류)
- [Tool](#Tool)

## **장점 및 필요성**

- 필요성
    - 프로젝트가 복잡할수록, 어느 구획이 어떤 스타일을 정의하는지 주석을 잘 달아놓는다고 해도 전체 시트의 구조를 한눈에 파악하는 것은 매우 어렵습니다.
- 장점
    - CSS를 쪼개 관리할 수 있습니다.
    - 반복할 필요가 줄어듭니다.
    - 셀렉터를 중첩할 수 있습니다.
    - CSS를 보다 쉽게 작성할 수 있습니다.
    - 다른 개발자들이 내가 작성한 CSS를 보다 쉽게 이해할 수 있습니다.
    - CSS로는 구현 불가능한 변수 또는 함수를 사용할 수 있습니다.
- 단점
    - 전처리기를 위한 도구가 필요, 다시 컴파일하는 시간이 느릴 수 있습니다.
    - 노드 버전을 바꿀 때 자주 다시 컴파일 해야합니다.

단점에 비해 장점이 가져오는 혜택은 엄청납니다.

## **구문 & 서식**

- 탭 대신 스페이스 두 칸 (2) 들여쓰기
- 이상적인 행의 너비는 80글자
- 적절하게 쓰인 여러 행의 CSS 규칙
- 공백의 의미 있는 사용

```scss
// bad
.foo {
    display: block; overflow: hidden;

    padding: 0 1em;
}

// good
.foo {
  display: block;
  overflow: hidden;
  padding: 0 1em;
}
```

- **인코딩 :** `@charset 'utf-8';`
- **따옴표 :** Scss에서 **문자열은 언제나 작은따옴표(**`'`)로 감싸져야 합니다**.**
    - 색 이름은 따옴표가 없으면 색으로 취급되는데, 이는 심각한 문제로 이어질 수 있다.
    - 대부분의 구문 강조기는 따옴표 없는 문자열을 지원하지 못할 것이다.
    - 전반적인 가독성에 도움이 된다.

```scss
// bad
$direction: left;

// good
$direction: 'left';
```

## **네이밍 컨벤션**

- 회사내 스타일가이드를 따른다.

## **설계**

- CSS 프로젝트 설계의 구조를 일관되고 의미 있게 유지하는 것은 매우 어렵습니다.
- CSS전처리기를 사용함으로써 얻는 주된 장점 중 하나는 성능에 영향을 주지 않고 코드베이스를 여러파일로 분리할 수 있게 된다는 것입니다.
- Scss에서는 코드를 찾아내기 쉽도록 의미있는 폴더로 분리하여 나누세요.
- **컴퍼넌트**
    - 단 한 가지 일만 한다.
    - 재사용이 가능하고 프로젝트 전체에 걸쳐 재사용 된다.
    - 독립적이다.
    - 예를 들면, 검색 폼은 컴퍼넌트로 취급되어야 합니다. 그것은 다른 위치, 다른 페이지에서, 다양한 상황에서 재사용이 가능해야 합니다. DOM에서의 위치(footer, sidebar, main content…)에 의존해서는 안 됩니다.
        
        대부분의 인터페이스는 작은 컴퍼넌트로 생각할 수 있으며 이러한 인식을 고수할 것을 강력히 추천합니다. 이는 전체 프로젝트에 필요한 CSS의 양을 줄일 뿐만 아니라 모든 것이 혼란스러운 난장판보다 유지를 더 쉽게 만들기도 합니다.
        
- **컴퍼넌트 구조**
    - 컴퍼넌트 스스로의 스타일
    - 컴퍼넌트의 변수, 모디파이어 그리고/또는 상태의 스타일
    - 필요한 경우 컴퍼넌트 후손(즉, 자식)의 스타일
    
    ```scss
    *// 버튼 관련 변수*
    $button-color: $secondary-color;
    
    *// … 버튼 관련 include*
    *// - 믹스인*
    *// - 플레이스홀더*
    *// - 함수*
    
    */**
     * 버튼
     */*
    .button {
     @include vertical-rhythm;
     display: block;
     padding: 1rem;
     color: $button-color;
     *// … 등.*
    
     */**
     * 큰 화면의 인라인 버튼
     */*
     @include respond-to('medium') {
     display: inline-block;
     }
    }
    
    */**
     * 버튼 내의 아이콘
     */*
    .button > svg {
     fill: currentcolor;
     *// … 등.*
    }
    
    */**
     * 인라인 버튼
     */*
    .button--inline {
     display: inline-block;
    }
    ```
    
- **패턴**

기존 css를 불러오는 방식은 link 또는 css내 import를 통해 가져오는데 scss는 파일명에 _(언더스코어)를 붙이면 컴파일시 병합되어 단일파일로 호출할 수 있습니다.

- 아래와 같이 이상적인 구조를 통해 보일러 플레이트 구현

```
1sass/
2|
3|– abstracts/
4|   |– _variables.scss    # Sass 변수
5|   |– _functions.scss    # Sass 함수
6|   |– _mixins.scss       # Sass 믹스인
7|   |– _placeholders.scss # Sass 플레이스홀더
8|
9|– base/
10|   |– _reset.scss       # 리셋/정규화
11|   |– _typography.scss  # 타이포그래피 규칙
12|   …                    # 기타.
13|
14|– components/
15|   |– _buttons.scss     # 버튼
16|   |– _carousel.scss    # 캐러셀
17|   |– _cover.scss       # 커버
18|   |– _dropdown.scss    # 드롭다운
19|   …                    # 기타.
20|
21|– layout/
22|   |– _navigation.scss  # 네비게이션
23|   |– _grid.scss        # 그리드 시스템
24|   |– _header.scss      # 헤더
25|   |– _footer.scss      # 푸터
26|   |– _sidebar.scss     # 사이드바
27|   |– _forms.scss       # 폼
28|   …                    # 기타.
29|
30|– pages/
31|   |– _home.scss        # 홈 한정 스타일
32|   |– _contact.scss     # 연락처 한정 스타일
33|   …                    # 기타.
34|
35|– themes/
36|   |– _theme.scss       # 디폴트 테마
37|   |– _admin.scss       # 관리자 테마
38|   …                    # 기타.
39|
40|– vendors/
41|   |– _bootstrap.scss   # Bootstrap
42|   |– _jquery-ui.scss   # jQuery UI
43|   …                    # 기타.
44|
45`– main.scss             # 메인 Sass 파일

```

- BASE 폴더
- `base/` 폴더는 프로젝트의 보일러플레이트 코드라고 부를 만한 것을 담습니다. 거기에선, 리셋 파일, 타이포그래피 규칙, 그리고 아마도 자주 사용되는 HTML 요소에 대한 표준 스타일을 정의하는 스타일시트(전 `_base.scss`라고 부릅니다)를 찾을 수 있을 것입니다.
    - `_base.scss`
    - `_reset.scss`
    - `_typography.scss`
- LAYOUT 폴더
- `layout/` 폴더에는 사이트나 어플리케이션의 레이아웃에 기여하는 모든 것들이 들어갑니다. 이 폴더는 사이트의 주요 부분(header, footer, navigation, sidebar…), 그리드 시스템 혹은 모든 폼의 스타일을 위한 스타일시트를 가질 수도 있습니다.
    - `_grid.scss`
    - `_header.scss`
    - `_footer.scss`
    - `_sidebar.scss`
    - `_forms.scss`
    - `_navigation.scss`
- COMPONENTS 폴더
- `components/` 폴더에는 더 작은 컴퍼넌트들이 들어갑니다. `layout/`이 (전반적인 뼈대를 정의하는) 거시적인 폴더임에 반해, `components/`는 위젯에 초점을 둡니다. 이 폴더는 슬라이더, 로더, 위젯, 그리고 기본적으로 이들과 비슷한 것을 비롯해 온갖 구체적인 모듈들을 담습니다. 전체 사이트/어플리케이션이 주로 작은 모듈들로 구성되어야 하므로 `components`에는 대개 많은 파일들이 있습니다.
    - `_media.scss`
    - `_carousel.scss`
    - `_thumbnails.scss`
- PAGES 폴더
- 만약 페이지에 한정된 스타일이 있다면, 그것은 `pages/` 폴더 속, 페이지 이름을 딴 파일에 넣는 것이 좋습니다. 예를 들면, 홈페이지에만 한정된 스타일이 있어 `pages/` 폴더 속 `_home.scss` 파일이 필요해지는 것은 드문 일이 아닙니다.
    - `_home.scss`
    - `_contact.scss`
- THEMES 폴더
- 큰 사이트와 어플리케이션에서 여러 다른 테마들을 갖는 것은 흔히 있는 일입니다. 물론 테마를 다루는 다른 방법들도 있지만, 개인적으로는 `themes/` 폴더에 전부 모아두는 것을 좋아합니다.
    - `_theme.scss`
    - `_admin.scss`
- ABSTRACTS 폴더
- `abstracts/` 폴더는 프로젝트에서 사용되는 모든 Sass 도구와 헬퍼를 모읍니다. 모든 전역 변수, 함수, 믹스인, 플레이스홀더는 여기로 들어가야 합니다.
    
    이 폴더에 대한 경험적 법칙은 그 자체만으로는 컴파일되었을 때 한 줄의 CSS도 산출하지 않아야 한다는 것입니다. 이것은 그저 Sass 헬퍼일 뿐입니다.
    
    - `_variables.scss`
    - `_mixins.scss`
    - `_functions.scss`
    - `_placeholders.scss`
- VENDORS 폴더
- 그리고 마지막으로 잊지 말아야 할 것으로, 대부분의 프로젝트는 Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered 등의 외부 라이브러리와 프레임워크에서 나오는 모든 CSS 파일을 담고 있는 `vendors/` 폴더를 가집니다.
    - `_normalize.scss`
    - `_bootstrap.scss`
    - `_jquery-ui.scss`
    - `_select2.scss`

## **반응형 디자인과 분기점**

### **브레이크포인트 네이밍**

- 미디어 쿼리가 특정 기기에 의존해서는 안 된다고 말해도 과언은 아닐 거라 생각합니다. 예를 들면, 아이패드나 블랙베리 폰을 특정해서 겨냥하는 것은 분명 나쁜 생각입니다. 디자인이 깨지고 다음 미디어 쿼리가 넘겨받기 전까지, 미디어 쿼리는 다양한 스크린 크기를 처리해야 합니다.
    
    같은 이유로, 브레이크포인트는 기기의 이름이 아니라 보다 보편적인 것을 따라서 이름 지어져야 합니다. 특히 몇몇 폰은 이제 태블릿보다 크고, 몇몇 태블릿은 일부 작은 스크린의 컴퓨터보다 크기 때문입니다.
    

```scss
// bad
$breakpoints: (
  'tablet': (min-width: 800px),
  'computer': (min-width: 1000px),
  'tv': (min-width: 1200px),
);

// good
$breakpoints: (
  'medium': (min-width: 800px),
  'large': (min-width: 1000px),
  'huge': (min-width: 1200px),
);
```

### **브레이크포인트 매니저**

- 일단 원하는 방식으로 브레이크포인트의 이름을 짓고 나면, 실제 미디어쿼리에서 사용할 방법이 필요합니다.

```scss
/// 반응형 매니저
/// @access public
/// @param {String} $breakpoint - 브레이크포인트
/// @requires $breakpoints
@mixin respond-to($breakpoint) {
  $raw-query: map-get($breakpoints, $breakpoint);

  @if $raw-query {
    $query: if(
      type-of($raw-query) == 'string',
      unquote($raw-query),
      inspect($raw-query)
    );

    @media #{$query} {
      @content;
    }
  } @else {
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.';
  }
}
```

### **미디어 쿼리 사용법**

```scss
.foo {
  color: red;

  @include respond-to('medium') {
    color: blue;
  }
}
```

위의 코드는 다음의 css를 만들어 냅니다.

```scss
.foo {
  color: red;
}

@media (min-width: 800px) {
  .foo {
    color: blue;
  }
}
```

## **변수**

- 값이 적어도 두 번 반복된다.
- 값이 적어도 한 번은 수정될 가능성이 크다.
- 값의 실현은 모두 변수와 관련되어 있다.

### **스코프**

```scss
// 루트 수준에 전역 변수를 초기화합니다.
$variable: 'initial value';

// 전역 변수를 덮어쓰게 하는 믹스인을 만듭니다.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
// 전역 변수를 가리는 지역 변수를 만듭니다.
  $variable: 'local value';

// 믹스인 인클루드: 전역 변수를 덮어씁니다.
  @include global-variable-overriding;

// 변수의 값을 출력합니다.
// 전역 변수를 가리기 때문에, **지역** 변수의 값이 출력됩니다.
  content: $variable;
}

// 변수 가림이 없는 다른 선택자에서 변수를 출력합니다.
// 예상대로, **전역** 변수의 값이 출력됩니다.
.other-local-scope::before {
  content: $variable;
}
```

### **여러 개의 변수 혹은 맵**

```scss
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

## **Extend**

- 선택자에는 제약이 있다(예: `.foo > .bar`의 `.bar`에는 부모 `.foo`가 있어야 한다)
- 이러한 제약 조건은 확장하는 선택자로 전달된다(예: `.baz { @extend .bar; }`는 `.foo > .bar, .foo > .baz`를 생성한다)
- 확장된 선택자의 선언은 확장하는 선택자와 공유된다.
- 스타일을 상속할 때, 확장하는 `.class` 또는 `%placeholder` 선택자가 확장된 선택자의 일종인 경우에만 `@extend`를 사용하십시오. 예를 들어, `.error`는 `.warning`의 일종이기 때문에, `.error`는 `@extend .warning`을 할 수 있습니다.

```scss
%button {
  display: inline-block;
// … 버튼 스타일

// 관계: %modal의 자식인 %button
  %modal > & {
    display: block;
  }
}

.button {
  @extend %button;
}

// good
.modal {
  @extend %modal;
}

// bad
.modal {
  @extend %modal;

  > .button {
    @extend %button;
  }
}
```

- 실제 선택자가 아닌, 주로 `%placeholders`에 확장을 사용하세요.
- 클래스를 확장할 때, [복잡한 선택자](https://www.w3.org/TR/selectors-4/#syntax)가 아닌 다른 클래스로만 클래스를 확장하세요.
- 직접적으로 `%placeholder`를 확장하는 것은 가능한 한 적게 하세요.
- 일반 조상 선택자 (예 : `.foo .bar`) 또는 일반 형제 선택자 (예 : `.foo ~ .bar`)를 확장하지 마세요.

### **Extend 및 미디어 쿼리**

```scss
%foo {
  content: 'foo';
}

// bad
@media print {
  .bar {
// 작동하지 않습니다. 더 나쁜 경우: 충돌합니다.
    @extend %foo;
  }
}

// good
@media print {
  .bar {
    @at-root (without: media) {
      @extend %foo;
    }
  }
}

// good
%foo {
  content: 'foo';

  &-print {
    @media print {
      content: 'foo print';
    }
  }
}

@media print {
  .bar {
    @extend %foo-print;
  }
}
```

- 선택자 내에서 관계를 유지하기 위해서만 `@extend`를 사용하는 것이 좋습니다. 두 개의 선택자가 특징적으로 유사하다면, 그것은 `@extend`의 완벽한 사용 예입니다. 관련이 없지만, 일부 규칙을 공유할 때는 `@mixin`이 더 적합 할 수 있습니다

## **Mixsins**

- 어떤 이유로 항상 같이 모습을 보이는 CSS 속성들의 그룹을 발견하게 되면, 그것들을 믹스인에 넣을 수 있습니다.

ex) clearfix mixins

```scss
/// 내부 float을 해제하는 헬퍼
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

- 다른 타당한 예로는 요소의 크기를 조절하는 믹스인이 있으며, `width`와 `height`를 동시에 정의합니다. 이는 코드 입력을 간단하게 만들 뿐만 아니라 쉽게 읽을 수 있도록 해 줍니다.

```scss
/// 요소 크기를 설정하는 헬퍼
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

### **전달인자 없는 믹스인**

- 매개 변수가 필요하지 않거나 충분한 기본값이 있으므로 반드시 전달인자를 줄 필요는 없습니다.
    
    이럴 때는 호출할 때 괄호를 안전하게 생략할 수 있습니다.
    

```scss
// good
.foo {
  @include center;
}

// bad
.foo {
  @include center();
}
```

### **전달인자 리스트**

- 믹스인에 들어가는 전달인자의 개수를 알 수 없을 때는, 리스트 대신 항상 `arglist`를 사용하세요. `arglist`는 임의의 수의 전달인자를 믹스인이나 함수에 전달할 때 암묵적으로 사용되는 Sass의 여덟 번째 데이터 유형이라고 생각할 수 있으며, `...`이 그 특징입니다.

```scss
@mixin shadows($shadows...) {
// type-of($shadows) == 'arglist'
// …
}
```

- Sass는 사실 믹스인과 함수 선언에 재주가 있어서, 리스트나 맵을 함수/믹스인에 전달인자 리스트로 전달해 일련의 전달인자로 읽히도록 할 수 있습니다.

```scss
@mixin dummy($a, $b, $c) {
// …
}

// good
@include dummy(true, 42, 'kittens');

// good but bad
$params: (true, 42, 'kittens');
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3));

// good
$params: (true, 42, 'kittens');
@include dummy($params...);

// good
$params: (
  'c': 'kittens',
  'a': true,
  'b': 42,
);
@include dummy($params...);
```

### **믹스인과 벤더 프리픽스**

```scss
// bad
@mixin transform($value) {
  -webkit-transform: $value;
  -moz-transform: $value;
  transform: $value;
}

/// 벤더 프리픽스를 산출하는 믹스인 헬퍼
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - 프리픽스가 붙지 않은 CSS 속성
/// @param {*} $value - 가공되지 않은 CSS 값
/// @param {List} $prefixes - 산출할 프리픽스 리스트
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }

  #{$property}: $value;
}

.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

## **조건문**

- 필요한 경우가 아니라면 괄호 없이
- `@if` 앞에는 빈 새 줄 하나
- 여는 중괄호(`{`) 뒤에는 줄 바꿈
- `@else` 문은 이전의 닫는 중괄호(`}`)와 같은 줄에
- 다음 줄이 닫는 중괄호(`}`)가 아닌 한 마지막 닫는 중괄호(`}`) 뒤에는 빈 새 줄 하나
- 거짓 값을 테스트할 때는, `false`나 `null` 대신 언제나 `not` 키워드를 사용하세요.

```scss
// good
@if not index($list, $item) {
// …
}

// bad
@if index($list, $item) == null {
// …
}

// good
@if $value == 42 {
// …
}

// bad
@if 42 == $value {
// …
}
```

- 어떤 조건에 따라 다른 결과를 반환하는 함수 안에서 조건문을 사용할 때는, 반드시 함수가 조건문 블록 밖에서도 `@return`문을 갖도록 만드세요.

```scss
// good
@function dummy($condition) {
  @if $condition {
    @return true;
  }

  @return false;
}

// bad
@function dummy($condition) {
  @if $condition {
    @return true;
  } @else {
    @return false;
  }
}
```

## **반복문**

### **Each**

- `@each` 반복문은 분명 Sass가 제공하는 세 가지 반복문들 중에서 가장 많이 사용됩니다. 이 반복문은 리스트나 맵을 순환할 수 있는 깔끔한 API를 제공합니다.

```scss
@each $theme in $themes {
  .section-#{$theme} {
    background-color: map-get($colors, $theme);
  }
}
```

- 맵에서 반복할 때, 일관성을 강제하기 위해 언제나 `$key`와 `$value`를 변수 이름으로 사용하세요.

```scss
@each $key, $value in $map {
  .section-#{$key} {
    background-color: $value;
  }
}
```

- 또한 가독성을 위해 이 가이드라인을 준수하세요:
    - `@each` 앞에 빈 새 줄;
    - 다음 줄이 닫는 중괄호(`}`)가 아닌 한 닫는 중괄호(`}`) 뒤에 빈 새 줄.

### **For**

- `@for` 반복문은 CSS의 `:nth-*` 가상 클래스와 결합되었을 때 유용할 수 있습니다. 이 시나리오를 제외하고는, 무언가에 반복문을 *사용해야만 한다면* `@each` 반복문을 선택하세요.

```scss
@for $i from 1 through 10 {
  .foo:nth-of-type(#{$i}) {
    border-color: hsl($i * 36, 50%, 50%);
  }
}
```

- 일반적인 관례를 따라 항상 `$i`를 변수 이름으로 사용하고, 정말로 좋은 이유가 있는 게 아니라면 `to` 키워드를 사용하지 마세요: 언제나 `through`를 사용하세요. 많은 개발자들이 Sass가 이 조합을 제공한다는 사실조차 모릅니다; 사용 시 혼란을 초래할 수 있습니다.
    
    또한 가독성을 위해 이 가이드라인을 준수하세요:
    
    - `@for` 앞에 빈 새 줄;
    - 다음 줄이 닫는 중괄호(`}`)가 아닌 한 닫는 중괄호(`}`) 뒤에 빈 새 줄.

### **While**

- `@while` 반복문은 실제 Sass 프로젝트에서 전혀 용도가 없습니다. 특히 내부에서 반복문을 중단시킬 방법이 없기 때문입니다. **사용하지 마세요**.

## **경고와 오류**

- `@debug`
- `@warn`
- `@error`

`@debug`는 SassScript 디버그를 위해 의도된 것이므로 제쳐두겠습니다.

### **경고**

[Sass-MQ](https://github.com/sass-mq/sass-mq)의 `px` 값을 `em`으로 변환하려 시도하는 이 함수를 예로 들겠습니다.

```scss
@function mq-px2em($px, $base-font-size: $mq-base-font-size) {
  @if unitless($px) {
    @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.';
    @return mq-px2em($px + 0px);
  } @else if unit($px) == em {
    @return $px;
  }
   @return ($px / $base-font-size) * 1em;
}
```

- 만약 값에 단위가 없으면 이 함수는 그 값이 픽셀로 표현되어야 하는 것으로 추정합니다. 
이 시점에서, 추정은 위험할 수 있으며 따라서 사용자는 소프트웨어가 예기치 않은 것으로 간주될 수 있는 행동을 했다는 경고를 받아야 합니다.

### **오류**

```scss
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @if not map-has-key($z-indexes, $layer) {
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.';
  }

  @return map-get($z-indexes, $layer);
}
```

## **Tool**

- [Compass](http://compass-style.org/)
- [그리드 시스템](https://medium.com/fluosoup/sass%EB%A1%9C-12%EB%8B%A8-%EA%B7%B8%EB%A6%AC%EB%93%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B2%95-d2c7cf54c36)
- [SCSS-Lint](https://github.com/sds/scss-lint)