/**
 * @file: 全局变量及参数
 */
;(function() {
  // 页面对象
  homePage = document.getElementById('homePage')
  modePage = document.getElementById('modePage')
  helpPage = document.getElementById('helpPage')
  gamePage = document.getElementById('gamePage')
  gamePage.width = innerWidth
  gamePage.height = innerHeight
  // 游戏页canvas对象
  ctx = gamePage.getContext('2d')
  // 音频对象
  jumperAudio = document.getElementById('jumperAudio')
  // 主页面菜单按钮对象
  startGameBtn = document.getElementById('startGame')
  modeChooseBtn = document.getElementById('modeChoose')
  gameDescriptionBtn = document.getElementById('gameDescription')
  // 模式选择页面三个模式按钮对象
  difficultBtn = document.getElementById('difficult')
  mediumBtn = document.getElementById('medium')
  simpleBtn = document.getElementById('simple')
  // 游戏参数
  highestScore = 0 // 最高分
  degree = 1 // 困难程度参数，默认简单，1 | 2 | 3
  boxColors = ['#CD5C5C', '#CDB7B5', '#A2B5CD', '#8B7D6B', '#6E8B3D', '#424242', '#009ACD'] // 盒子的颜色，随机取值
  boxes = [{ color: '#CD5C5C', x: 0, y: innerHeight - 80, width: 40, height: 80 }] // 盒子的坐标宽高数据集合，根据这个数据来绘制盒子
  jumper = { x: 0, y: innerHeight - 80 - 20, width: 20, height: 20, g: 2, vx: 12, vy: 10, color: '#f6aeab' } // 定义跳动的盒子的初始值，g：加速度，vx:x轴方向的速度，vy:y轴方向的速度
})()
