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
  boxColors = ['#CD5C5C', '#CDB7B5', '#A2B5CD', '#8B7D6B', '#6E8B3D', '#424242', '#009ACD']
})()
