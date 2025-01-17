/**
 * Utilities static function
 */
 class Utils {
    /**
     * Get random number
     * 원이 랜덤으로 생성되도록 최소값과 최대값을 변수로 설정해줍니다.
     * @param {number} min - min number
     * @param {number} max - max number
     */
    // 변수를 이용하여 랜덤한 범위를 생성합니다.
    static getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     * Get rgb color if not params return random
     * @param {number} r - red
     * @param {number} g - green
     * @param {number} b - blue
     */
    static getRGBColor(r, g, b) {
      // 흰색을 설정하기 위해 지정해줍니다.
      const rr = r || this.getRandomNumber(0, 255);
      const rg = g || this.getRandomNumber(0, 255);
      const rb = b || this.getRandomNumber(0, 255);
      return 'rgb(' + rr + ', ' + rg + ', ' + rb + ')';
    }
    /**
     * Get hsl color if not params return random
     * @param {number} hue - from 0 to 360
     * @param {number} saturation - from 0 to 100
     * @param {number} lightness - from 0 to 100
     */
    // 채도, 색조, 명도를 설정해줍니다.
    static getHSLColor(hue, saturation, lightness) {
      const rHue = hue || this.getRandomNumber(0, 360);
      const rSaturation = saturation || this.getRandomNumber(0, 100);
      const rLightness = lightness || this.getRandomNumber(0, 100);
      // 각각 0~360 사이, 0~100 사이의 값 안에서 랜덤으로 값을 대입받아 반환받습니다.
      return 'hsl(' + rHue + ', ' + rSaturation + '%, ' + rLightness + '%)';
    }
    /**
     * Get gradient color
     * @param {ctx} ctx - context for canvas
     * @param {string} type - linear or radial
     * @param {number} r - red from 0 to 255
     * @param {number} g - green from 0 to 255
     * @param {number} b - blue from 0 to 255
     * @param {number} a - alpha from 0 to 1
     * @param {number} x - coordinate x
     * @param {number} y - coordinate y
     * @param {number} r - radius
     * @param {number} x - end coordinate x
     * @param {number} y - end coordinate y
     */
    // 각 그라디언트에 적합한 조합을 매개 변수로 삼아
    static getGradientColor(ctx, type, cr, cg, cb, ca, x, y, r, ex, ey) {
      let col, g;
      switch (type) {
        // type이 linear일 경우
        case 'linear':
          col = cr + "," + cg + "," + cb;
          g = ctx.createLinearGradient(x, y, ex, ey);
          g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
          g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
          g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
          return g;
          break;
        case 'radial':
          // type이 radial일 경우
          col = cr + "," + cg + "," + cb;
          g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
          g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
          g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
          return g;
          // 각각의 식으로 계산 후 탈출합니다.(반환)
          break;
          // 둘 다 아닐 경우,
        default:
          // mistaken params를 출력 후
          console.log('mistaken params');
          // 탈출합니다.(반환)
          break;
      } 
    }
    /**
     * Get multiple array
     * @param {number} yLength - length
     * @param {number} xLength - length
     */
    static getMultipleArray(yLength, xLength) {
      const multArr = new Array(yLength);
      for (let y = 0; y < yLength; y++) {
        multArr[y] = new Array(xLength);
        for (let x = 0; x < xLength; x++) {
          multArr[y][x] = 0;
        }
      }
      return multArr;
    }
  }
  
  /**
   * Vector
   * Referenced / O'Reilly Programming HTML5 Canvas
   */
  class Vector2d {
    /*
    * @constructor
    * @param {number} x - vector x
    * @param {number} y - vector y
    */
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    /*
    * Add vector or return new vector
    * @param {constructor} v - vector or null
    * @param {number} x - vector x
    * @param {number} y - vector y
    */
    add(v, x, y) {
      if (v instanceof Vector2d) {
        return new Vector2d(this.x + v.x, this.y + v.y);
      } else {
        this.x += x;
        this.y += y;
      }
    }
    
    /*
    * Subtract vector or return new vector
    * @param {constructor} v - vector or null
    * @param {number} x - vector x
    * @param {number} y - vector y
    */
    sub(v, x, y) {
      if (v instanceof Vector2d) {
        return new Vector2d(this.x - v.x, this.y - v.y);
      } else {
        this.x -= x;
        this.y -= y;
      }
    }
    
    /*
    * Multiple vector or return new vector
    * @param {constructor} v - vector or null
    * @param {number} num
    */
    mult(v, num) {
      if (v instanceof Vector2d) {
        return new Vector2d(this.x * v.x, this.y * v.x);
      } else {
        this.x *= num;
        this.y *= num;
      }
    }
    
    /*
    * Change vector from radian
    * @param {number} radian
    */
    fromAngle(radian) {
      this.x = Math.cos(radian);
      this.y = Math.sin(radian);
    }
  
    /*
    * Invert vector
    */
    negate() {
      this.x = -this.x;
      this.y = -this.y;
    }
    
    /*
    * Change vector from radian
    * @param {number} radian
    */
    rotate(radian) {
      const x = this.x;
      const y = this.y;
      const cosVal = Math.cos(radian);
      const sinVal = Math.sin(radian);
      this.x = x * cosVal - y * sinVal;
      this.y = x * sinVal + y * cosVal;
    }
  
    /*
    * Return vector length
    */
    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  
    /*
    * Return vector length squared
    */
    lengthSquared() {
      return this.x * this.x + this.y * this.y;
    }
  
    /*
    * Return making vector same direction and noamlize
    */
    normalize() {
      const len = Math.sqrt(this.x * this.x + this.y * this.y);
      if (len) {
        this.x /= len;
        this.y /= len;
      }
      return len;
    }
    
    /*
    * Return dot product of vectors
    * @param {constructor} v - vector
    */
    dotProduct(v) {
      return this.x * v.x + this.y * v.y;
    }
    
    edge(v) {
      return this.sub(v);
    }
    
    /*
    * Return vertical vector 
    */
    perpendicular() {
      const v = new Vector2d();
      v.x = this.y;
      v.y = 0 - this.x;
      return v;
    }
    
    /*
    * Return normalized vertical vector 
    */
    normal() {
      const p = this.perpendicular();
      return p.normalize();
    }
  
    /*
    * Display vector by string 
    */
    toString() {
      return '(' + this.x.toFixed(3) + ',' + this.y.toFixed(3) + ')';
    }
  }
  
  /**
   * Collide
   * Referenced / O'Reilly Programming HTML5 Canvas
   */
  class CollideWithCircle {
    /*
    * @constructor
    * @param {array} array - target array
    */
    constructor(array) {
      this.array = array;
    }
  
    /*
    * Check for collide
    */
    collide() {
      const v = new Vector2d(0, 0);
      let dist, obj1, obj2;
      for (let c = 0; c < this.array.length; c++) {
        obj1 = this.array[c];
        for (let i = c + 1; i < this.array.length; i++) {
          obj2 = this.array[i];
          v.x = obj2.x - obj1.x;
          v.y = obj2.y - obj1.y;
          dist = v.length();
          if (dist < obj1.radius + obj2.radius) {
            v.normalize();
            v.mult(null, obj1.radius + obj2.radius - dist);
            v.negate();
            obj1.x += v.x;
            obj1.y += v.y;
            this.bounce(obj1, obj2);
          }
        }
      }
    }
  
    /*
    * Change vector
    * @param {obj} obj1 - target object
    * @param {obj} obj2 - target object
    */
    bounce(obj1, obj2) {
      const colnAngle = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x);
      const length1 = obj1.v.length();
      const length2 = obj2.v.length();
      const dirAngle1 = Math.atan2(obj1.v.y, obj1.v.x);
      const dirAngle2 = Math.atan2(obj2.v.y, obj2.v.x);
      const newVX1 = length1 * Math.cos(dirAngle1 - colnAngle);
      const newVX2 = length2 * Math.cos(dirAngle2 - colnAngle);
      obj1.v.y = length1 * Math.sin(dirAngle1 - colnAngle);
      obj2.v.y = length2 * Math.sin(dirAngle2 - colnAngle);
      obj1.v.x = ((obj1.radius - obj2.radius) * newVX1 + (2 * obj2.radius) * newVX2) / (obj1.radius + obj2.radius);
      obj2.v.x = ((obj2.radius - obj1.radius) * newVX2 + (2 * obj1.radius) * newVX1) / (obj1.radius + obj2.radius);
      obj1.v.rotate(colnAngle);
      obj2.v.rotate(colnAngle);
    }
  }
  
  /**
   * Stop watch
   * Referenced / O'Reilly Programming HTML5 Canvas
   */
  class Stopwatch {
    /*
    * @constructor
    */
    constructor() {
      this.startTime = null;
      this.elapsedTime = null;
      this.running = null;
      this.elapsedTimeForCalc = null;
      this.fps = null;
      this.lastTime = null;
    }
    
    /*
    * Calculate times
    */
    calcTime() {
      const time = Date.now();
      this.elapsedTimeForCalc = time - this.lastTime;
      this.fps = 1000 / this.elapsedTimeForCalc;
      this.lastTime = time;
    }
  
    /*
    * Start stop watch
    */
    start() {
      this.startTime = Date.now();
      this.elapsedTime = null;
      this.running = true;
    }
  
    /*
    * Stop stop watch
    */
    stop() {
      this.elapsedTime = Date.now() - this.startTime;
      this.running = false;
    }
  
    /*
    * Get elapsed time
    */
    getElapsedTime() {
      if (this.running) {
        return Date.now() - this.startTime;
      } else {
        return this.elapsedTime;
      }
    }
  
    /*
    * Return running
    */
    isRunning() {
      return this.running;
    }
  
    /*
    * Reset elapsed time
    */
    reset() {
      this.elapsedTime = null;
    }
  }
  
  /**
   * Animation timer
   * Referenced / O'Reilly Programming HTML5 Canvas
   */
  class AnimationTimer {
    constructor(duration, timeWarp, option) {
      if (duration !== undefined) this.duration = duration;
      this.timeWarp = this.setTimeWarpFunction(timeWarp, option);
      this.stopwatch = new Stopwatch();
    }
    
    setTimeWarpFunction(timeWarp, option) {
      // timeWarp이 정의되지 않았거나 랜덤일 때
      if (timeWarp === undefined || timeWarp === 'Random') {
        // 배열로 각 timeWarp 대입
        const arr = [
          'EaseIn',
          'EaseOut',
          'EaseInOut',
          'Elastic',
          'Bounce',
          'Linear'
        ];
        timeWarp = arr[Utils.getRandomNumber(0, arr.length - 1)]; 
      }
      switch (timeWarp) {
        case 'EaseIn':
          //timeWarp이 EaseIn일 때
          return this.makeEaseIn(option);
        case 'EaseOut':
          //timeWarp이 EaseOut일 때
          return this.makeEaseOut(option);
        case 'EaseInOut':
          //timeWarp이 EaseInOut일 때
          return this.makeEaseInOut();
        case 'Elastic':
          //timeWarp이 Elastic일 때
          return this.makeElastic(option);
        case 'Bounce':
          //timeWarp이 Bounce일 때
          return this.makeBounce(option);
        case 'Linear':
          //timeWarp이 Linear일 때
          return this.makeLinear();
        default:
          //timeWarp이 그 무엇도 아닐 때
          return this.makeLinear();
      }
    }
    // 시작하게 하는 함수
    start() {
      this.stopwatch.start();
    }
    // 멈추게 하는 함수
    stop() {
      this.stopwatch.stop();
    }
  
    getElapsedTime() {
      const elapsedTime = this.stopwatch.getElapsedTime();
      const percentComplete = elapsedTime / this.duration;
      if (!this.stopwatch.running) return undefined;
      if (this.timeWarp === undefined) return elapsedTime;
      return [elapsedTime * (this.timeWarp(percentComplete) / percentComplete), this.timeWarp(percentComplete)];
    }
  
    // 작동 중일 때의 함수
    isRunning() {
      return this.stopwatch.running;
    }
    // 작동이 끝났을 때의 함수
    isOver() {
      return this.stopwatch.getElapsedTime() > this.duration;
    }
    
     makeEaseIn(strength) {
      const st = strength || 1;
      return (percentComplete) => {
        return Math.pow(percentComplete, st * 2);
      }
    }
  
     makeEaseOut(strength) {
      const st = strength || 1;
      return (percentComplete) => {
        return 1 - Math.pow(1 - percentComplete, st * 2);
      }
    } 
  
     makeEaseInOut() {
      return (percentComplete) => {
        return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
      }
    }
    
     makeElastic(passes) {
      const pas = passes || 4;
      return (percentComplete) => {
        return ((1 - Math.cos(percentComplete * Math.PI * pas)) * (1 - percentComplete)) + percentComplete;
      }
    }
    
     makeBounce(bounces) {
      const bo = bounces || 5;
      const fn = this.makeElastic(bo);
      return (percentComplete) => {
        percentComplete = fn(percentComplete);
        return percentComplete <= 1 ? percentComplete : 2 - percentComplete;
      }
    }
    
     makeLinear() {
      return (percentComplete) => {
        return percentComplete;
      }
    }
  }
  
  /**
   * Angle
   */
  class Angle {
    /*
    * @constructor
    * @param {number} angle
    */
    constructor(angle) {
      this.a = angle;
      this.radian = this.a * Math.PI / 180;
    }
    
    /*
    * Return angle
    */
    getAngle() {
      return this.a;
    }
    
    /*
    * Return radian
    */
    getRadian() {
      return this.radian;
    }
    
    /*
    * Increase angle
    */
    increaseAngle(num) {
      this.a += num;
    }
  }
  
  /**
   * Canvas
   */
  class Canvas {
    /*
    * @constructor
    * @param {bool} bool - true or false
    */
    constructor(bool) {
      // create canvas.
      // canvas를 생성한 뒤
      this.canvas = document.createElement("canvas");
      // if on screen.
      if (bool === true) {
        // canvas에 대한 기본 css를 설정합니다.
        this.canvas.style.position = 'relative';
        this.canvas.style.display = 'block';
        this.canvas.style.zIndex = '10';
        // this.canvas.style.backgroundColor = 'black';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        // section5에 해당 캔버스를 삽입합니다.
        document.getElementById("section5").appendChild(this.canvas);
      }
      this.ctx = this.canvas.getContext("2d");
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      // times
      this.times = null;
      // mouse infomation.
      this.mouseX = null;
      this.mouseY = null;
      this.mouseZ = null;
      // shape
      this.numberOfShapes = null;
      this.shapesArray = null;
    }
    
    init() {
      this.numberOfShapes = 200;
      this.shapesArray = [];
      this.times = new Stopwatch();
      for (let i = 0; i < this.numberOfShapes; i++) {
        const s = new Shape(this.ctx, this.width, this.height, i);
        this.shapesArray.push(s);
      }
    }
  
    render() {
      // times
      this.times.calcTime();
      // clear canvas
      this.ctx.clearRect(0, 0, this.width, this.height);
      // render
      for (let i = 0; i < this.shapesArray.length; i++) {
        this.shapesArray[i].render(Date.now());
      }
      // draw fps
      this.drawFPS();
      // itereation
      requestAnimationFrame(() => {
        this.render();
      });
    }
  
    drawFPS() {
      const ctx = this.ctx;
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText(this.times.fps.toFixed() + ' FPS', this.width, this.height);
      ctx.restore();
    }
    
    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      this.init();
    }
  }
  
  /**
   * Shape class.
   */
  class Shape {
    constructor(ctx, ww, wh, index) {
      this.ctx = ctx;
      this.ww = ww;
      this.wh = wh;
      this.init(index);
    }
    
    init(index) {
      this.index = index;
      // Coordinate
      this.x = this.ww * Math.random();
      this.y = this.wh + 15;
      // vector
      this.v = new Vector2d(0, -Math.random());
      // for animation
      this.AnimationTimer = new AnimationTimer(
        Utils.getRandomNumber(500, 5000),
        document.getElementsByTagName('select')[0].value,
        document.getElementsByTagName('input')[0].value
      );
      // AnimationTimer를 시작시킵니다.
      this.AnimationTimer.start();
      this.lastTime = null;
      // shape settings
      this.lineWidth = 1;
      this.radius = Math.random() * 10 + 5;
      // 원의 배경색과 선색을 흰색으로 설정합니다.
      this.fillColor = 'white';
      this.strokeColor = 'white';
      this.globalAlpha = 1;
      this.scalar = 200;
    }
  
    draw(time) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = this.globalAlpha;
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.strokeColor;
      // 값을 받아와 대입한 뒤
      // 이를 기반으로 그려 나가도록 합니다.
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    
    updatePositionTimeBased(elapsedTime, percentComplete) {
      const deltaX = this.v.x * this.scalar * elapsedTime;
      const deltaY = this.v.y * this.scalar * elapsedTime;
      this.x += deltaX;
      this.y += deltaY;
      this.globalAlpha = 1 - percentComplete;
    }
    
    // 애니메이션이 작동 중인지 끝났는지를 판단하는 함수
    judgeAnimation() {
      // 만약 현재 이 애니메이터가 작동 중이라면
      if (this.AnimationTimer.isRunning()) {
        const times = this.AnimationTimer.getElapsedTime();
        const animationElapsed = times[0] || 0.01;
        const percentComplete = times[1];
        if (this.lastTime !== null) {
          let elapsed = animationElapsed - this.lastTime;
          this.updatePositionTimeBased(elapsed / 1000, percentComplete);
        }
        // 만약 현재 이 애니메이터가 작동이 끝났다면
        if (this.AnimationTimer.isOver()) {
          // AnimationTimer는 작동을 중지시키고
          this.AnimationTimer.stop();
          // 초기화 함수를 실행시킵니다.
          this.init(this.index);
          return;
        }
        this.lastTime = animationElapsed;
      }
    }
    
    render(nowTime) {
      this.draw(nowTime / 1000);
      this.judgeAnimation();
    }
  }
  
  /**
   * run
   */
  (() => {
    'use strict';
    // 윈도우가 로드되었을 때,
    // 아래의 기능을 작동시킵니다.
    window.addEventListener('load', () => {
    //   console.clear();
    // 새 캔버스를 불러와
    // 캔버스에 init 함수와 render 함수를 작동시킵니다.
      const canvas = new Canvas(true);
      canvas.init();
      canvas.render();
      
      // resize
      window.addEventListener("resize", () => {
        canvas.resize();
      }, false);
      
    })
  })();