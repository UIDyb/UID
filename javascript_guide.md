# Javascript coding guide


# 개요

개발자들이 모든 javascript source에서 관리하기 쉽게 개발자 간 자연스럽고 일관성 있게 통일된 규약을 정의해 놓은 일반적인 규칙들입니다.

이 문서는 계속 업데이트 되며, 더 나은 아이디어가 있으면 수정해주세요.

# **목차**

- [들여쓰기](#들여쓰기)
- [문장의 종료](#문장의-종료)
- [명명 규칙](#명명-규칙)
- [전역 변수](#전역-변수)
- [주석](#주석)
- [공백](#공백)
- [변수](#변수)
- [호이스팅(Hoisting)](#호이스팅Hoisting)
- [데이터형 확인(Types)](#데이터형-확인Types)
- [Objects](#Objects)
- [Arrays](#Arrays)
- [Strings](#Strings)
- [Functions](#Functions)
- [Properties](#Properties)
- [Commas](#Commas)
- [Blocks](#Blocks)
- [Events](#Events)
- [Constructors](#Constructors)
- [jQuery](#jQuery)

## **들여쓰기**

- 탭 대신 스페이스사용을 추천함(2칸) : [ESLint - indent](https://eslint.org/docs/rules/indent)
- 절대 스페이스와 탭을 섞어 쓰지 마세요.
- 프로젝트를 시작할 때, 코드를 작성하기 전에 먼저 스페이스와 탭 중의 하나를 선택하여야 합니다. 이것이 **규칙** 입니다.
- 에디터가 들여쓰기 설정을 지원한다면, 저는 "show invisibles" 설정을 켜고 작업합니다. 이렇게 했을 때의 장점은 다음과 같습니다.
    - 일관성을 강제할 수 있어요.
    - 줄 끝의 공백 문자를 제거하기 좋아요.
    - 빈 줄 공백 문자를 제거하기 좋아요.
    - 커밋하고 비교(diff)할 때 읽기 편해요.

```jsx
// bad
function() {
∙∙∙∙var name;
}

// bad
function() {
∙var name;
}

// good
function() {
∙∙var name;
}
```

- 메소드 체인이 길어지는 경우 적절히 들여쓰기(indentation) 하십시오.

```jsx
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
    .attr('width',  (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
var leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .class('led', true)
    .attr('width',  (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);
```

## 문**장의 종료**

- 한 줄에 하나의 문장만 허용하며, 문장 종료 시에는 반드시 세미콜론(;)을 사용합니다. : [ESLint - semi](https://eslint.org/docs/rules/semi)
- 자바스크립트는 이를 문법으로 강제하지 않지만, 종종 생각지 못한 오류를 만들고 디버깅을 어렵게 합니다.

```jsx
// bad
let luke = {}
let leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')

// good
let luke = {};
let leia = {};
[luke, leia].forEach((jedi) => {
  jedi.father = 'vader';
});
```

- 수평 정렬은 권장되지 않음 (금지는 아님)

```jsx
// bad
{
  tiny:   42,
  longer: 435,
};

// good
{
  tiny: 42,
  longer: 435,
};
```

## **명명 규칙**

- 변수와 함수의 이름을 정하는 것도 **코딩 컨벤션**의 일부이며, 대표적인 표기법으로 카멜 케이스, 파스칼 표기법, 헝가리안 표기법, 스네이크 표기법이 있습니다. 
각각 장단점이 있으며 사용하는 언어에 따라 권장사항이 다릅니다.
- 카멜 케이스를 사용을 권장합니다. : [ESLint - 카멜 케이스](https://eslint.org/docs/rules/camelcase)
- **[예약어](https://es5.github.io/#x7.6.1)**를 사용을 금지합니다.

```jsx
// Bad
let class;
let enum;
let extends;
let super;
let const;
let export;
let import;
```

- 상수는 영문 대문자 스네이크 표기법을 사용합니다.

```jsx
SYMBOLIC_CONSTANTS;
```

- 생성자는 대문자 카멜 케이스를 사용합니다.

```jsx
class ConstructorName {
  ...
};
```

- 변수, 함수에는 카멜 케이스를 사용합니다.

```jsx
// 숫자, 문자, 불린
let dog;
let variableName;

// 배열 - 배열은 복수형 이름을 사용
const dogs = [];

// 정규표현식 - 정규표현식은 'r'로 시작
const rDesc = /.*/;

// 함수
function getPropertyName() {
  ...
}

// 이벤트 핸들러 - 이벤트 핸들러는 'on'으로 시작
const onClick = () => {};
const onKeyDown = () => {};

// 불린 반환 함수 - 반환 값이 불린인 함수는 'is'로 시작
let isAvailable = false;
```

- (지역 변수 or private 변수)는 '_'(언더스코어)로 시작합니다.

```jsx
let _privateVariableName;
let _privateFunctionName;

// 객체일 경우
const customObjectName = {};
customObjectName.propertyName;
customObjectName._privatePropertyName;
_privateCustomObjectName;
_privateCustomObjectName._privatePropertyName;
```

- URL, HTML 같은 범용적인 대문자 약어는 대문자 그대로 사용합니다.

```jsx
parseHTML
parseXML
```

- 한문자 이름은 피하십시오. 이름에서 의도를 읽을 수 있도록 하십시오.

```jsx
// bad
function q() {
// ...stuff...
}

// good
function query() {
// ..stuff..
}
```

- Object, 함수, 그리고 인스턴스로는 카멜 케이스를 사용하십시오.

```jsx
// bad
var OBJEcttsssss = {};
var this_is_my_object = {};
var this-is-my-object = {};
function c() {};
var u = new user({
  name: 'Bob Parr'
});

// good
var thisIsMyObject = {};
function thisIsMyFunction() {};
var user = new User({
  name: 'Bob Parr'
});
```

- Class와 생성자에는 파스칼케이스를 사용하십시오.

```jsx
// bad
function user(options) {
  this.name = options.name;
}

var bad = new user({
  name: 'nope'
});

// good
function User(options) {
  this.name = options.name;
}

var good = new User({
  name: 'yup'
});
```

- private 속성 이름은 밑줄 _ 을 사용하십시오.

```jsx
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';

// good
this._firstName = 'Panda';
```

- this의 참조를 저장할 때 _this 를 사용하십시오.

```jsx
// bad
function() {
  var self = this;
  return function() {
    console.log(self);
  };
}

// bad
function() {
  var that = this;
  return function() {
    console.log(that);
  };
}

// good
function() {
  var _this = this;
  return function() {
    console.log(_this);
  };
}
```

- 함수에 이름을 붙여주십시오. 이것은 stack traces를 추적하기 쉽게 하기 때문입니다.

```jsx
// bad
var log = function(msg) {
  console.log(msg);
};

// good
var log = function log(msg) {
  console.log(msg);
};
```

## **전역 변수**

- 전역 변수를 사용하지 않습니다.
- 자바스크립트는 전역 변수에 기반을 둡니다. 즉, 모든 컴파일 단위는 하나의 공용 전역 객체(`window`)에 로딩 됩니다. 
전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생 시킬 수 있습니다.

```jsx
// Bad
myglobal = "hello";
```

- 암묵적 전역 변수를 사용하지 않습니다.

```jsx
// Bad
function sum(x, y) {
  result = x + y;
  return result;
}

// Bad
function foo() {
  let a = b = 0;// let a = (b = 0);와 같다. b가 암묵적 전역이 된다.
}
// Good
function sum(x, y) {
  let result = x + y;
  return result;
}

// Good
function foo() {
  let a, b;
  a = b = 0;
}
```

## **주석**

- 주석은 설명하려는 구문에 맞춰 들여씁니다.

```jsx
// Bad
function someFunction() {
  ...

// statement에 관한 주석
  statements
}

// Good
function someFunction() {
  ...

// statement에 관한 주석
  statements
}
```

- 문장 끝에 주석을 작성할 경우, 한 줄 주석을 사용하며 공백을 추가합니다.

```jsx
// Bad
var someValue = data1;//주석 표시 전후 공백

// Bad
var someValue = data1;/* 여러 줄 주석 */

// Good
var someValue = data1;// 주석 표시 전후 공백
```

- 한 줄 주석에는`//`를 사용하십시오. 코멘트를 추가하고 싶은 코드의 상단에 작성하십시오. 또한 주석 앞에 빈 줄을 넣어주십시오.

```jsx
// bad
var active = true;// is current tab

// good
// is current tab
var active = true;

// bad
function getType() {
  console.log('fetching type...');
// set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

// set the default type to 'no type'
  var type = this._type || 'no type';

  return type;
}
```

- 여러 줄 주석을 작성할 때는 *의 들여쓰기를 맞춥니다. 주석의 첫 줄과 마지막 줄은 비워둡니다.

```jsx
// Bad - '*' 표시의 정렬
/*
* 주석내용
*/

// Bad - 주석의 첫 줄에는 기술하지 않는다
...
/* var foo = '';
 * var bar = '';
 * var quux;
 */

// Good - '*' 표시의 정렬을 맞춘다
/*
 * 주석내용
 */

```

- 복수행의 코멘트는 `/** ... */` 를 사용해 주십시오. 그 안에는 설명과 모든 매개 변수와 반환 값에 대한 형식과 값을 설명합니다.

```jsx
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param <String> tag
// @return <Element> element
function make(tag) {

// ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 *@param <String> tag
 *@return <Element> element
 */
function make(tag) {

// ...stuff...

  return element;
}
```

- 코드 블럭 주석 처리를 위해서는 한 줄 주석을 사용합니다.

```jsx
// Bad - 여러 줄 주석을 사용
...
/*
 * var foo = '';
 * var bar = '';
 * var quux;
 */

// Good - 한 줄 주석 사용
...
// var foo = '';
// var bar = '';
// var quux;
```

- 문제를 지적하고 재고를 촉구하거나 문제에 대한 해결책을 제시하는 등 의견의 앞에 `FIXME` 나 `TODO` 를 붙이는 것으로 다른 개발자의 빠른 이해를 도울 수 있습니다. 
이러한 어떤 액션을 동반한다는 의미에서 일반 코멘트와는 다릅니다. 
액션은 `FIXME - 해결책이 필요` 또는 `TODO - 구현이 필요` 입니다.
- 문제에 대한 코멘트로 `// FIXME :`를 사용하십시오.

```jsx
function Calculator() {

// FIXME: 전역 변수를 사용해서는 안됩니다.
  total = 0;
  return this;
}
```

- 문제 해결책에 대한 코멘트로 `// TODO :`를 사용하십시오.

```jsx
function Calculator() {

// TODO: total은 옵션 매개 변수로 설정되어야 함.
  this.total = 0;
  return this;
}
```

## **공백**

- 키워드, 연산자와 다른 코드 사이에 공백이 있어야 합니다.
- 중괄호({})의 앞에 공백을 하나 넣어주십시오.

```jsx
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog'
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog'
});
```

- 파일의 마지막에는 빈 줄을 하나 넣어주십시오.

```jsx
// bad
(function(global) {
// ...stuff...
})(this);
// good
(function(global) {
// ...stuff...
})(this);
```

- 빼곡한 연산자와 키워드가 있는 코드는 읽기 어렵습니다.

```jsx
// Bad
var value;
if(typeof str==='string') {
  value=(a+b);
}

// Good
var value;
if (typeof str === 'string') {
  value = (a + b);
}
```

- 시작 괄호 바로 다음과 끝 괄호 바로 이전에 공백이 있으면 안됩니다.

```jsx
// Bad - 괄호 안에 공백
if ( typeof str === 'string' )

// Bad - 괄호 안 공백
var arr = [ 1, 2, 3, 4 ];

// Good
if (typeof str === 'string') {
  ...
}

// Good
var arr = [1, 2, 3, 4];
```

- 콤마 다음에 값이 올 경우 공백이 있어야 합니다.
- 콤마로 구분된 아이템 간에 간격을 두면 가독성이 향상됩니다.

```jsx
// Bad - 콤마 뒤 공백
var arr = [1,2,3,4];

// Good
var arr = [1, 2, 3, 4];
```

## **변수**

- 변수를 선언 할 때는 항상 `var`를 사용하십시오. 그렇지 않으면 전역 변수로 선언됩니다. 
전역 네임 스페이스를 오염시키지 않도록 Captain Planet도 경고하고 있습니다.

```jsx
// bad
superPower = new SuperPower();

// good
var superPower = new SuperPower();
```

- 값이 변하지 않는 변수는 ****`const`를, 값이 변하는 변수는 `let`을 사용하여 선언한다. `var`는 가급적 사용하지 않도록 합니다. : [ESLint - no-var](https://eslint.org/docs/rules/no-var)
- `const`를 우선하여 선언하면 "이 변수는 결코 재 할당되지 않습니다"라고 알려줌으로써 코드를 읽기 쉽게 하여 유지보수에 도움이 되며, 
`let`은 블록 범위로 할당되기 때문에 다른 많은 프로그래밍 언어에서와 같은 규칙으로 적용되어 실수를 피하는데 도움이 됩니다.
- `const`를 `let` 보다 위에 선언합니다.
- 코드가 정리되어 가독성이 좋아집니다.

```jsx
// Bad - 그룹화 없음
let foo;
let i = 0;
const len = this._array.length;
let bar;

// Good
const len = this._array.length;
const len2 = this._array2.length;
let i = 0;
let j = 0;
let foo, bar;
```

- `const`와 `let`은 사용 시점에 선언 및 할당을 합니다.
- `const`와 `let`으로 선언한 변수는 블록 스코프이므로 호이스팅(hoisting) 되지 않습니다.

```jsx
// Bad - 블록 스코프 밖에서 변수 선언
function foo() {
  const len = this._array.length;
  let i = 0;
  let j = 0;
  let len2, item;

  for (; i < len; i += 1) {
      ...
  }

  len2 = this._array2.length;
  for (j = 0, len2 = this._array2.length; j < len2; j += 1) {
      item = this._array2[j];
      ...
  }
}

// Good
function foo() {
  const len = this._array.length;
  for (let i = 0; i < len; i += 1) {
      ...
  }

// 사용 시점에 선언 및 할당
  const len2 = this._array2.length;
  for (let j = 0; j < len2; j += 1) {
      const item = this._array2[j];
      ...
  }
}
```

- `var` 사용 시 반드시 함수 스코프의 시작 지점에서 선언합니다.
- 자바스크립트는 블록 구문을 사용하기는 하지만, 블록 유효 범위를 제공하지는 않습니다. 
즉, 블록 내에서 선언되기만 하면 선언된 위치에 상관없이 블록 내 어느 곳 에서 든 사용이 가능합니다. 
자바스크립트가 컴파일 될 때 내부적으로 호이스팅이 발생하기 때문인데, 
이로 인해 가독성이 떨어지고 오류를 찾기 어려워집니다. : [ESLint -vars-on-top](https://eslint.org/docs/rules/vars-on-top), [ESLint - no-inner-declarations](https://eslint.org/docs/rules/no-inner-declarations)

```jsx
// Bad - 스코프의 시작 지점이 아닌 곳에 변수 선언
function foo() {
  ...
  var bar = '';
  var quux = '';
}

// Good
function foo() {
  var bar = '';
  var quux = '';
  ...
}
```

- ES5 환경에서 변수는 ****`var` 키워드와 함께 선언되어야 하며 선언과 동시에 할당되어야 합니다.
- 여러 변수를 선언하려면 하나의 `var`를 사용하여 변수마다 줄 바꿈 하여 선언하십시오.

```jsx
// bad
var items = getItems();
var goSportsTeam = true;
var dragonball = 'z';

// good
var items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';
```

- `var` 사용 시 블록 스코프 안에서 변수를 선언하지 않습니다.
- `var`로 선언한 변수는 함수 스코프입니다. for문이나 if문 블록 내에서 변수를 선언하면 블록 스코프가 적용된다고 착각하여 의도치 않은 실수를 할 수 있습니다.

```jsx
// Bad
var length = 100;
for (var i = 0; i < length; i += 1) {
  ...
}

// Good
var length = 100;
var i;
for (i = 0; i < length; i += 1) {
  ...
}

// Good
var i = 0;
var length = 100;
for (; i < length; i += 1) {
  ...
}
```

- `var`의 선언 시점과 사용 시점이 크게 떨어져 가독성이 낮아지는 경우에는 선언과 할당을 분리를 허용합니다.
- 선언부와 사용시점이 크게 떨어져 가독성이 낮아지는 경우에는 선언과 할당을 분리할 수 있습니다. 
할당은 사용 시점에 수행하며, 이 경우에도 선언은 반드시 스코프의 시작 지점에서 수행합니다.

```jsx
// Bad
function foo() {
  var i = 0;
  var len = this._array.length;

  for (; i < len; i += 1) {
    ...
  }

// statement 내에서의 var 사용 제한
  for (var j = 0, len2 = this._array2.length; j < len2; j += 1) {
// statement 내에서의 var 사용 제한
    var item = this._array2[j];
    ...
  }
}

// Good - 선언과 할당을 분리
function foo() {
  var i;
  var j;
  var len;
  var len2;
  var item;

  i = 0;
  len = this._array.length;
  for (; i < len; i += 1) {
    item = this._array[i];
    ...
  }

// 선언은 진입부에서 하고, 할당은 사용 시점에 수행
  j = 0;
  len2 = this._array2.length;
  for (; j < len2; j += 1) {
    item = this._array2[j];
    ...
  }
}
```

- 변수의 할당은 스코프의 시작 부분에서 해주십시오. 이것은 변수 선언과 Hoisting 관련 문제를 해결합니다.

```jsx
// bad
function() {
  test();
  console.log('doing stuff..');

//..other stuff..

  var name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// good
function() {
  var name = getName();

  test();
  console.log('doing stuff..');

//..other stuff..

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad
function() {
  var name = getName();

  if (!arguments.length) {
    return false;
  }

  return true;
}

// good
function() {
  if (!arguments.length) {
    return false;
  }

  var name = getName();

  return true;
}
```

- 함수 중간에 예외처리가 있을때, 예외 처리 이후에 사용되는 ****`var`변수는 경우 선언만 진입부에서 하고 할당은 사용 시점에 수행합니다.
- 이러한 경우에도 선언부와 사용시점이 크게 떨어져 가독성이 낮아지는 경우이므로 변수를 사용시점에 할당합니다.

```jsx
// Bad
function foo(isValid) {
  var i = 0;
  var len = this._array.length;

  if (!isValid) {
    return false;
  }

  for (; i < len; i += 1) {
    ...
  }
}

// Good
function foo(isValid) {
  var i, len;

  if (!isValid) {
    return false;
  }

// 선언은 진입부에서 하고, 할당은 사용 시점에 수행
  i = 0;
  len = this._array.length;
  for (; i < len; i += 1) {
    ...
  }
}
```

- 선언과 할당의 분리를 허용하는 경우 선언만 하는 변수는 ****`var`를 한 번만 사용하는 방식을 허용합니다.
- 하나의 `var`로 여러줄에 걸쳐 변수를 선언할 경우 코드가 쉽게 지저분해질 수 있으므로 한 줄로 선언합니다.

```jsx
// Bad - 불필요하게 개행
var foo,
  bar,
  quux;

// Good - 선언만 하는 변수, 한 줄로 연결
var foo, bar, quux;

// Good
var foo;
var bar;
var quux;
```

- 선언과 동시에 할당을 하는 변수 먼저 선언합니다.
- 선언과 할당을 함께하는 변수와 선언만 하는 변수가 함께 사용될 때, 선언과 동시에 할당을 하는 변수를 그룹화하여 먼저 선언하는 것이 가독성에 좋습니다.

```jsx
// Bad
var foo;
var bar;
var qux;
var i = 0;
var j = 0;
var len = this._array.length;
var len2 = this._array2.length;
var item;

// Bad
var i = 0, length = ary.length, j, k;

// Good
var i = 0;
var j = 0;
var len = this._array.length;
var len2 = this._array2.length;
var foo, bar, quux, item;
```

- 정의되지 않은 변수를 마지막으로 선언하십시오. 이것은 나중에 이미 할당된 변수 중 하나를 지정해야 하는 경우에 유용합니다.

```jsx
// bad
var i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
var i, items = getItems(),
    dragonball,
    goSportsTeam = true,
    len;

// good
var items = getItems(),
    goSportsTeam = true,
    dragonball,
    length,
    i;
```

## **호이스팅(Hoisting)**

- 해당 스코프의 시작 부분에 **호이스팅**된 변수 선언은 할당되지 않습니다.

```jsx
// (notDefined가 전역 변수에 존재하지 않는다고 가정했을 경우)
// 이것은 동작하지 않습니다.
function example() {
  console.log(notDefined);// => throws a ReferenceError
}

// 그 변수를 참조하는 코드 후에 그 변수를 선언 한 경우
// 변수가 Hoist된 상태에서 작동합니다.
// Note : `true`라는 값 자체는 Hoist되지 않습니다.
function example() {
  console.log(declaredButNotAssigned);// => undefined
  var declaredButNotAssigned = true;
}

// 인터 프린터는 변수 선언을 스코프의 시작 부분에 Hoist합니다.
// 위의 예는 다음과 같이 다시 작성할 수 있습니다.
function example() {
  var declaredButNotAssigned;
  console.log(declaredButNotAssigned);// => undefined
  declaredButNotAssigned = true;
}
```

- 익명 함수의 경우 함수가 할당되기 전에 변수가 **호이스팅** 될 수 있습니다.

```jsx
function example() {
  console.log(anonymous);// => undefined

  anonymous();// => TypeError anonymous is not a function

  var anonymous = function() {
    console.log('anonymous function expression');
  };
}
```

- 명명 된 함수의 경우도 마찬가지로 변수가 **호이스팅** 될 수 있습니다. 함수 이름과 함수 본체는 **호이스팅** 되지 않습니다.

```jsx
function example() {
  console.log(named);// => undefined

  named();// => TypeError named is not a function

  superPower();// => ReferenceError superPower is not defined

  var named = function superPower() {
    console.log('Flying');
  };
}

// 함수이름과 변수이름이 같은 경우에도 같은 일이 일어납니다.
function example() {
  console.log(named);// => undefined

  named();// => TypeError named is not a function

  var named = function named() {
    console.log('named');
  }
}
```

- 함수 선언은 함수이름과 함수본문이 Hoist됩니다.

```jsx
function example() {
  superPower();// => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

- 더 자세한 정보는 [Ben Cherry](http://www.adequatelygood.com/)의 [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting)를 참조하십시오.

## **데이터형 확인(Types)**

- 미리 약속된 데이터형 확인법을 사용합니다.
- 미리 약속한 판별법으로 코드를 예측하기 쉽도록 합니다.

```jsx
// 문자열
typeof variable === 'string'
tui.util.isString(variable)

// 숫자
typeof variable === 'number'
tui.util.isNumber(variable)

// 불린
typeof variable === 'boolean'
tui.util.isBoolean(variable)

// 객체
typeof variable === 'object'
tui.util.isObject(variable)

// 배열
Array.isArray(arrayObject)
tui.util.isArray(variable)

// 널 Null
variable === null
tui.util.isNull(variable)

// 미할당 Undefined
typeof variable === 'undefined'
variable === undefined
tui.util.isUndefined(variable)

// 엘리먼트 노드
element.nodeType === 1
tui.util.isHTMLNode(element)
```

- **Primitives**: primitive type은 그 값을 직접 조작합니다.
    - `string`
    - `number`
    - `boolean`
    - `null`
    - `undefined`

```jsx
var foo = 1,
    bar = foo;

bar = 9;

console.log(foo, bar);// => 1, 9
```

- **Complex**: 참조형(Complex)은 참조를 통해 값을 조작합니다.
    - `object`
    - `array`
    - `function`

```jsx
var foo = [1, 2],
    bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]);// => 9, 9
```

## **Objects**

- Object를 만들 때는 리터럴 구문을 사용하십시오.
- 리터럴 표기법은 생성자 함수보다 짧고 명확하며 실수를 줄일 수 있습니다.

```jsx
// bad
var item = new Object();

// good
var item = {};
```

- [예약어(reserved words)](http://es5.github.io/#x7.6.1)를 키로 사용하지 마십시오. 이것은 IE8에서 동작하지 않습니다. [More info](https://github.com/airbnb/javascript/issues/61)

```jsx
// bad
var superman = {
  default: { clark: 'kent' },
  private: true
};

// good
var superman = {
  defaults: { clark: 'kent' },
  hidden: true
};
```

- 예약어 대신 알기 쉬운 동의어(readable synonyms)를 사용하십시오.

```jsx
// bad
var superman = {
  class: 'alien'
};

// bad
var superman = {
  klass: 'alien'
};

// good
var superman = {
  type: 'alien'
};
```

## **Arrays**

- 배열을 만들 때 리터럴 구문을 사용하십시오.
- 리터럴 표기법은 생성자 함수보다 짧고 명확하며 실수를 줄일 수 있습니다.

```jsx
// bad
var items = new Array();

// good
var items = [];
```

- 길이를 알 수없는 경우는 Array#push를 사용하십시오.

```jsx
var someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

- 배열 복사 시 순환문을 사용하지 않습니다.
- 배열을 복사 할 필요가있는 경우 Array#slice를 사용하십시오.
- 복잡한 객체를 복사할 때 **전개 연산자**를 사용하면 좀 더 명확하게 정의할 수 있고 가독성이 좋아집니다. : [mdn – Spread Operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

```jsx
const len = items.length,
    itemsCopy = [],
    i;

// bad
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = items.slice();
```

- **ES5**의 환경에서는 `Array.prototype.slice`를 사용합니다.

```jsx
// Good
itemsCopy = items.slice();
```

- Array와 비슷한(Array-Like)한 Object를 Array에 변환하는 경우는 Array#slice를 사용하십시오.

```jsx
function trigger() {
  var args = Array.prototype.slice.call(arguments);
  ...
}
```

## **Strings**

- 문자열은 작은 따옴표`''`를 사용하십시오.

```jsx
// bad
var name = "Bob Parr";

// good
var name = 'Bob Parr';

// bad
var fullName = "Bob " + this.lastName;

// good
var fullName = 'Bob ' + this.lastName;
```

- 80 문자 이상의 문자열은 문자열 연결을 사용하여 여러 줄에 걸쳐 기술 할 필요가 있습니다.
- Note : 문자열 연결을 많이하면 성능에 영향을 줄 수 있습니다.

```jsx
// bad
var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

// bad
var errorMessage = 'This is a super long error that \
6was thrown because of Batman. \
7When you stop to think about \
8how Batman had anything to do \
9with this, you would get nowhere \
10fast.';

// good
var errorMessage = 'This is a super long error that ' +
  'was thrown because of Batman.' +
  'When you stop to think about ' +
  'how Batman had anything to do ' +
  'with this, you would get nowhere ' +
  'fast.';
```

- 프로그램에서 문자열을 생성 할 필요가 있는 경우 (특히 IE는) 문자열 연결 대신 Array#join을 사용하십시오.

```jsx
var items,
    messages,
    length,
    i;

messages = [{
    state: 'success',
    message: 'This one worked.'
},{
    state: 'success',
    message: 'This one worked as well.'
},{
    state: 'error',
    message: 'This one did not work.'
}];

length = messages.length;

// bad
function inbox(messages) {
  items = '<ul>';

  for (i = 0; i < length; i++) {
    items += '<li>' + messages[i].message + '</li>';
  }

  return items + '</ul>';
}

// good
function inbox(messages) {
  items = [];

  for (i = 0; i < length; i++) {
    items[i] = messages[i].message;
  }

  return '<ul><li>' + items.join('</li><li>') + '</li></ul>';
}
```

## **Functions**

- 함수식(Function expressions)

```jsx
// 익명함수식(anonymous function expression)
var anonymous = function() {
  return true;
};

// 명명된 함수식(named function expression)
var named = function named() {
  return true;
};

// 즉시실행 함수식(immediately-invoked function expression (IIFE))
(function() {
  console.log('Welcome to the Internet. Please follow me.');
})();
```

- (if 및 while 등) 블록 내에서 변수에 함수를 할당하는 대신 함수를 선언하지 마십시오. 
브라우저는 허용하지만 (마치 'bad news bears'처럼) 모두 다른 방식으로 해석됩니다.
- **Note:** ECMA-262에서는`block`은 statements의 목록에 정의되어 있습니다 만, 함수 선언은 statements가 없습니다. 
[이 문제는 ECMA-262의 설명을 참조하십시오.](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97)

```jsx
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
var test;
if (currentUser) {
  test = function test() {
    console.log('Yup.');
  };
}
```

- 매개 변수(parameter)에 `arguments`를 절대 지정하지 마십시오. 이것은 함수 범위로 전달 될`arguments`객체의 참조를 덮어 쓸 것입니다.

```jsx
// bad
function nope(name, options, arguments) {
// ...stuff...
}

// good
function yup(name, options, args) {
// ...stuff...
}
```

## **Properties**

- 속성에 액세스하려면 도트`.`를 사용하십시오.

```jsx
var luke = {
  jedi: true,
  age: 28
};

// bad
var isJedi = luke['jedi'];

// good
var isJedi = luke.jedi;
```

- 변수를 사용하여 속성에 접근하려면 대괄호`[]`을 사용하십시오.

```jsx
var luke = {
  jedi: true,
  age: 28
};

function getProp(prop) {
  return luke[prop];
}

var isJedi = getProp('jedi');
```

## **Commas**

- 선두의 comma는 **하지마십시오.**
- 말미의 불필요한 쉼표도 **하지 마십시오.** 
이것은 IE6/7과 quirksmode의 IE9에서 문제를 일으킬 수 있습니다. 
또한 ES3의 일부 구현에서 불필요한 쉼표가 있는 경우, 배열 길이를 추가합니다. 이것은 ES5에서 분명해졌습니다.([source](http://es5.github.io/#D)):

> 제 5 판에서는 말미의 불필요한 쉼표가 있는 ArrayInitialiser (배열 초기화 연산자)라도 배열에 길이를 추가하지 않는다는 사실을 명확히 하고 있습니다. 
이것은 제 3 판에서 의미적인 변경은 아닙니다만, 일부의 구현은 이전부터 이것을 오해하고 있었을지도 모릅니다.
> 

```jsx
// bad
var hero = {
  firstName: 'Kevin',
  lastName: 'Flynn',
};

var heroes = [
  'Batman',
  'Superman',
];

// good
var hero = {
  firstName: 'Kevin',
  lastName: 'Flynn'
};

var heroes = [
  'Batman',
  'Superman'
];
```

## **Blocks**

- 한 줄짜리 블록일 경우라도 {}를 생략하지 않으며 명확히 줄 바꿈 하여 사용합니다.
- 한 줄짜리 블록일 경우 {}를 생략할 수 있지만, 이는 코드 구조를 애매하게 만듭니다. 당장은 두 줄을 줄일 수 있겠지만 이후 오류 발생 확률이 높아 잠재된 위험 요소가 됩니다. : [ESLint - brace-style](http://eslint.org/docs/rules/brace-style) [ESLint - curly](http://eslint.org/docs/rules/curly)

```jsx
// Bad
if(condition) doSomething();

// Bad
if (condition) doSomething();
else doAnything();

// Bad
for(let prop in object) someIterativeFn();

// Bad
while(condition) iterating += 1;

// Good
if (condition) {
  ...
}

// Good
if (condition) {
  ...
} else {
  ...
}
```

- 복수행 블록은 중괄호 ({})를 사용하십시오.

```jsx
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function() { return false; }

// good
function() {
  return false;
}
```

- 키워드와 조건문 사이에 빈칸을 사용합니다.
- 키워드와 조건문 사이가 빼곡하면 코드를 읽기 어렵습니다. : [ESLint - keyword-spacing](http://eslint.org/docs/rules/keyword-spacing)

```jsx
// Bad
var i = 0;
for(;i<100;i+=1) {
  someIterativeFn();
}

// Good
var i = 0;
for(; i < 100; i+=1) {
  someIterativeFn();
}
```

- `do-while`문 사용 시 while문 끝에 세미콜론을 사용합니다.

```jsx
// Bad
do statement while(condition)

// Good
do {
  ...
} while (condition);
```

- switch-case 사용 시 첫 번째 case문을 제외하고 case문 사용 이전에 개행합니다.

```jsx
// Good
switch (value) {
  case 1:
    doSomething1();
    break;

  case 2:
    doSomething2();
    break;

  case 3:
    return true;

  default:
    throw new Error('This shouldn\'t happen.');
}
```

- switch-case 사용 시 각 구문은 `break`, `return`, `throw` 중 한 개로 끝나야 하며 default문이 없으면 `// no default` 표시를 해준다.
- 여러 케이스가 하나의 기능을 한다면 `break`를 생략해도 좋지만, 조금이라도 다른 기능을 포함한다면 `break`를 생략하지 말고 다른 방식으로 코드를 수정한다. : [ESLint - no-fallthrough](https://eslint.org/docs/rules/no-fallthrough)

```jsx
// Bad - 케이스 1 과 2 가 서로 다른 처리를 하지만 break가 생략됨
switch (value) {
  case 1:
    doSomething1();

  case 2:
    doSomething2();
    break;

  case 3:
    return true;

// no default
}

// Bad - default문이 없지만 아무런 표기가 없음
switch (value) {
  case 1:
    doSomething1();
    break;

  case 2:
    doSomething2();
    break;

  case 3:
    return true;
}

// Good - 여러 케이스가 하나의 처리를 할 때는 break생략 허용
switch (value) {
  case 1:
  case 2:
    doSomething();
    break;

  case 3:
    return true;

// no default
}
```

## **Events**

- (DOM 이벤트나 Backbone events와 같은 고유의) 이벤트 탑재체(payloads)의 값을 전달하는 경우 원시 값(raw value) 대신 해시 인수(hash)를 전달합니다. 이렇게하는 것으로 나중에 개발자가 이벤트와 관련된 모든 핸들러를 찾아 업데이트 하지 않고 이벤트 탑재체(payloads)에 값을 추가 할 수 있습니다. 예를 들어, 이것 대신 :

```jsx
// bad
$(this).trigger('listingUpdated', listing.id);

...

$(this).on('listingUpdated', function(e, listingId) {
// do something with listingId
});
```

이쪽을 선호합니다. :

```jsx
// good
$(this).trigger('listingUpdated', { listingId : listing.id });

...

$(this).on('listingUpdated', function(e, data) {
// do something with data.listingId
});
```

## **Constructors**

- 새 Object에서 프로토타입을 재정의하는 것이 아니라, 프로토타입 객체에 메서드를 추가해 주십시오. 
프로토타입을 재정의하면 상속이 불가능합니다. 
프로토타입을 리셋하는 것으로 베이스 클래스를 재정의 할 수 있습니다.

```jsx
function Jedi() {
  console.log('new jedi');
}

// bad
Jedi.prototype = {
  fight: function fight() {
    console.log('fighting');
  },

  block: function block() {
    console.log('blocking');
  }
};

// good
Jedi.prototype.fight = function fight() {
  console.log('fighting');
};

Jedi.prototype.block = function block() {
  console.log('blocking');
};
```

- 메소드의 반환 값으로 `this`를 반환함으로써 메소드 체인을 할 수 있습니다.

```jsx
// bad
Jedi.prototype.jump = function() {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function(height) {
  this.height = height;
};

var luke = new Jedi();
luke.jump();// => true
luke.setHeight(20)// => undefined

// good
Jedi.prototype.jump = function() {
  this.jumping = true;
  return this;
};

Jedi.prototype.setHeight = function(height) {
  this.height = height;
  return this;
};

var luke = new Jedi();

luke.jump()
  .setHeight(20);
```

- 독자적인 toString()을 만들 수도 있지만 올바르게 작동하는지, 부작용이 없는 것 만은 확인해 주십시오.

```jsx
function Jedi(options) {
  options || (options = {});
  this.name = options.name || 'no name';
}

Jedi.prototype.getName = function getName() {
  return this.name;
};

Jedi.prototype.toString = function toString() {
  return 'Jedi - ' + this.getName();
};
```

## **jQuery**

- jQuery Object의 변수 앞에는 `$`을 부여해 주십시오.

```jsx
// bad
var sidebar = $('.sidebar');

// good
var $sidebar = $('.sidebar');

```

- jQuery 쿼리결과를 캐시해주십시오.

```jsx
// bad
function setSidebar() {
  $('.sidebar').hide();

// ...stuff...

  $('.sidebar').css({
    'background-color': 'pink'
  });
}

// good
function setSidebar() {
  var $sidebar = $('.sidebar');
  $sidebar.hide();

// ...stuff...

  $sidebar.css({
    'background-color': 'pink'
  });
}
```

- DOM 검색은 Cascading `$('.sidebar ul')` 이나 parent > child `$('.sidebar > ul')` 를 사용해주십시오.
- jQuery Object 검색은 스코프가 붙은 `find`를 사용해주십시오.

```jsx
// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul');
```
