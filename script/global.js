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
  // 主页面菜单对象
  highestScoreBtn = document.getElementById('highestScore')
  startGameBtn = document.getElementById('startGame')
  modeChooseBtn = document.getElementById('modeChoose')
  gameDescriptionBtn = document.getElementById('gameDescription')
  // 模式选择页面三个模式按钮对象
  difficultBtn = document.getElementById('difficult')
  mediumBtn = document.getElementById('medium')
  simpleBtn = document.getElementById('simple')
  // 游戏参数
  highestScore = 0 // 最高分
  currentScore = 0 // 当前得分
  degree = 1 // 困难程度参数，默认简单，1 | 2 | 3
  boxColors = ['#CD5C5C', '#CDB7B5', '#A2B5CD', '#8B7D6B', '#6E8B3D', '#424242', '#009ACD'] // 盒子的颜色，随机取值
  initialBox = { color: '#CD5C5C', x: 0, y: innerHeight - 80, width: 40, height: 80, spacing: 0 } // 盒子的坐标宽高数据集合，根据这个数据来绘制盒子
  boxes = [{ ...initialBox }] // 页面绘制的盒子的数据
  jumperSpeed = { g: 2, vx: 6, vy: 40 } // 起跳移动速度数据
  initialJumper = { x: 0, y: innerHeight - 80 - 20, width: 20, height: 20, g: 3, vx: 0, vy: 0, color: '#f6aeab' } // 定义跳动的盒子的初始值，g：加速度，vx:x轴方向的速度，vy:y轴方向的速度
  jumper = { ...initialJumper } // 方块动态改变的数据
  foothold = null // 方块成功落到上面的盒子，如果有值则跳跃成功，方块停留在盒子上面
  historyFoothold = { ...initialBox } // 历史的停留盒子，用来和当前落在的盒子作比较判断是否跳跃出去
  hinder = null // 方块前面的阻隔盒子，如果有值则跳跃失败，直接掉落下去
  keyDownTime = 0 // 空格键按下开始蓄力的时间
  timer = null // 定时器，定时更新方块的位置
})()
