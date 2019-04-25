/**
 * @file: 页面切换相关逻辑
 */
;(function() {
  // 点击开始游戏
  startGameBtn.onclick = function() {
    homePage.style.display = 'none'
    gamePage.style.display = 'block'
  }
  // 点击模式选择
  modeChooseBtn.onclick = function() {
    homePage.style.display = 'none'
    modePage.style.display = 'block'
  }
  // 点击困难模式
  difficultBtn.onclick = function() {
    homePage.style.display = 'block'
    modePage.style.display = 'none'
    degree = 3
  }
  // 点击中等模式
  mediumBtn.onclick = function() {
    homePage.style.display = 'block'
    modePage.style.display = 'none'
    degree = 2
  }
  // 点击简单模式
  simpleBtn.onclick = function() {
    homePage.style.display = 'block'
    modePage.style.display = 'none'
    degree = 1
  }
  // 点击首页游戏说明按钮显示游戏说明页面
  gameDescriptionBtn.onclick = function() {
    homePage.style.display = 'none'
    helpPage.style.display = 'block'
  }
  // 点击游戏说明页面任意点返回菜单页
  helpPage.onclick = function() {
    homePage.style.display = 'block'
    helpPage.style.display = 'none'
  }
})()
