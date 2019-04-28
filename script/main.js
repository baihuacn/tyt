/**
 * @file: 游戏主要控制逻辑
 */
;(function() {
  // 获取随机数，如：range = 9 随机数是[0,9)
  function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
  }
  // 绘制当前得分
  function drawCurrentScore() {
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.font = 'bold 28px Arial'
    var textWidth = ctx.measureText('当前得分：' + currentScore).width
    ctx.fillText('当前得分：' + currentScore, (innerWidth - textWidth) / 2, 40)
  }
  // 创建100个盒子数据
  function createBoxes() {
    while (boxes.length < 100) {
      var boxHeight = 0
      var boxWidth = 0
      var spacing = 0
      var heightDifference = 0
      var emptyDifference = 0
      var increase = true
      var lastBox = boxes[boxes.length - 1]
      switch (degree) {
        case 1: // 简单模式
          boxHeight = lastBox.height
          boxWidth = initialBox.width + initialBox.width * getRandomNumber(2)
          spacing = 40
          heightDifference = 40
          emptyDifference = 0
          break
        case 2: // 中等模式
          boxHeight = initialBox.height
          boxWidth = initialBox.width
          spacing = 40 + 20 * getRandomNumber(5)
          heightDifference = 40 + 50 * getRandomNumber(9)
          emptyDifference = 0
          break
        case 3: // 困难模式
          boxHeight = initialBox.height
          boxWidth = initialBox.width
          spacing = 40 + 20 * getRandomNumber(5)
          heightDifference = 40 + 50 * getRandomNumber(9)
          emptyDifference = heightDifference - 10 * getRandomNumber(3)
          break
        default:
          break
      }
      // 判断方块是在向上增高还是向下缩短
      if (innerHeight - boxHeight < 300) {
        increase = false
      } else if (boxHeight <= 80) {
        increase = true
      }
      if (increase) {
        boxHeight = boxHeight + heightDifference
      } else {
        boxHeight = boxHeight - heightDifference
      }
      boxes.push({
        color: boxColors[getRandomNumber(6)],
        x: lastBox.x + lastBox.width + spacing,
        y: innerHeight - boxHeight,
        width: boxWidth,
        height: boxHeight - emptyDifference,
        spacing
      })
    }
  }
  // 绘制所有的盒子数据，超出页面的盒子就是无效绘制
  function drawBoxes() {
    for (var i = 0; i < boxes.length; i++) {
      var item = boxes[i]
      if (item.x >= innerWidth) {
        return
      }
      ctx.fillStyle = item.color
      ctx.fillRect(item.x, item.y, item.width, item.height)
    }
  }
  // 更新盒子数据，删除第一个，后面的盒子往左移动，实现页面滚动效果
  function updateBoxes() {
    var firstBox = boxes.shift()
    var offsetX = firstBox.width + firstBox.spacing
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    boxes.forEach((item) => {
      item.x -= offsetX
    })
    jumper.x -= offsetX
    drawJumper()
    drawCurrentScore()
    drawBoxes()
  }
  // 绘制方块，眼睛、嘴巴
  function drawJumper() {
    // 绘制身体
    ctx.fillStyle = jumper.color
    ctx.fillRect(jumper.x, jumper.y, jumper.width, jumper.height)
    // 绘制左眼白色部分
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.arc(jumper.x + jumper.width / 4, jumper.y + 6, 3, 0, 2 * Math.PI)
    ctx.fill()
    // 绘制右眼白色部分
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.arc(jumper.x + (jumper.width / 4) * 3, jumper.y + 6, 3, 0, 2 * Math.PI)
    ctx.fill()
    // 绘制左眼黑色部分
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.arc(jumper.x + jumper.width / 4, jumper.y + 6, 1.5, 0, 2 * Math.PI)
    ctx.fill()
    // 绘制右眼黑色部分
    ctx.beginPath()
    ctx.fillStyle = '#000'
    ctx.arc(jumper.x + (jumper.width / 4) * 3, jumper.y + 6, 1.5, 0, 2 * Math.PI)
    ctx.fill()
    // 绘制嘴巴
    ctx.fillStyle = '#fff'
    ctx.fillRect(jumper.x + 4, jumper.y + 12, 12, 4)
  }
  // 更新方块位置
  function updateJumper() {
    ctx.clearRect(jumper.x, jumper.y, jumper.width, jumper.height)
    // 方块跳到当前得分的高度需要重绘得分防止被clearReact擦掉内容
    if (jumper.y < 50) {
      drawCurrentScore()
    }
    if (jumper.x >= innerWidth || jumper.y + jumper.height <= 0 || jumper.y > innerHeight) {
      clearInterval(timer)
      endGame()
      return
    }

    var nextX = jumper.x + jumper.vx
    var nextY = jumper.y - jumper.vy
    var nextVY = jumper.vy - jumper.g
    var footholdIndex = 0
    for (var i = 0; i < boxes.length; i++) {
      var item = boxes[i]
      // 判断下一个要绘制的方块是碰到障碍物还是安全降落在了盒子上
      if (
        nextX + jumper.width > item.x &&
        nextX < item.x + item.width &&
        jumper.y + jumper.height > item.y &&
        nextY < item.y + item.height
      ) {
        // 方块被盒子阻挡，（方块在盒子的高度范围内并在盒子左侧）
        hinder = item
        break
      } else if (
        nextX > item.x - jumper.width &&
        nextX < item.x + item.width &&
        nextY >= item.y - jumper.height &&
        nextY < item.y + item.height - jumper.height
      ) {
        // 方块成功落在盒子上，（方块在盒子上方并在盒子宽度范围内容）
        foothold = item
        footholdIndex = i
        break
      }
    }

    if (foothold) {
      // 判断当前降落的盒子和之前的盒子不一样的话当前得分就加一
      if (JSON.stringify(historyFoothold) !== JSON.stringify(foothold)) {
        currentScore += 1
      }
      clearInterval(timer)
      nextY = foothold.y - jumper.height
      jumper.y = nextY
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      drawJumper()
      drawBoxes()
      drawCurrentScore()
      // 重置数据，为再次起跳做准备
      addEventListen()
      jumper = { ...jumper, ...jumperSpeed }
      historyFoothold = foothold
      foothold = null
      if (footholdIndex > 2) {
        setTimeout(() => {
          updateBoxes()
        }, 300)
      }
      return
    }

    if (hinder) {
      nextX = hinder.x - jumper.width
    }
    jumper.x = nextX
    jumper.y = nextY
    jumper.vy = nextVY
    drawJumper()
  }
  // 按下空格键开始计时
  function timeStart(event) {
    if (!keyDownTime && event.keyCode === 32) {
      keyDownTime = new Date().getTime()
    }
  }
  // 松开空格键，结束计时开始跳跃
  function timeEnd(event) {
    if (keyDownTime && event.keyCode === 32) {
      removeEventListen()
      // 空格键按下蓄力的时间，设置横向及纵向的移动速度
      var storingForceTime = (new Date().getTime() - keyDownTime) / 1000
      jumper.vy = parseInt(storingForceTime * 80)
      jumper.vx = parseInt(storingForceTime * 10) + 1
      // 播放跳跃音乐，500ms后播放停止
      jumperAudio.play()
      setTimeout(function() {
        jumperAudio.pause()
      }, 500)
      timer = setInterval(() => {
        updateJumper()
      }, 20)
      keyDownTime = 0
    }
  }
  // 触摸开始
  function touchStart(event) {
    if (!touchStartX) {
      touchStartX = event.changedTouches[0].pageX
    }
  }
  // 触摸结束
  function touchEnd(event) {
    var touchEndX = event.changedTouches[0].pageX
    var distanceX = Math.abs(touchEndX - touchStartX)
    jumper.vy = parseInt(distanceX / 10) + 10
    jumper.vx = parseInt(distanceX / 20)
    // 播放跳跃音乐，500ms后播放停止
    jumperAudio.play()
    setTimeout(function() {
      jumperAudio.pause()
    }, 500)
    timer = setInterval(() => {
      updateJumper()
    }, 20)
    touchStartX = 0
  }
  // 添加监听键盘敲击事件
  function addEventListen() {
    window.addEventListener('keydown', timeStart)
    window.addEventListener('keyup', timeEnd)
    window.addEventListener('touchstart', touchStart)
    window.addEventListener('touchend', touchEnd)
  }
  // 移除监听键盘敲击事件
  function removeEventListen() {
    window.removeEventListener('keydown', timeStart)
    window.removeEventListener('keyup', timeEnd)
    window.removeEventListener('touchstart', touchStart)
    window.removeEventListener('touchend', touchEnd)
  }
  // 打开游戏页面后，初始化游戏
  window.initialGame = function() {
    createBoxes()
    drawBoxes()
    drawJumper()
    drawCurrentScore()
    addEventListen()
  }
  // 结束游戏，清空相关数据，计算最高得分
  function endGame() {
    if (highestScore < currentScore) {
      highestScore = currentScore
    }
    jumper = { ...initialJumper }
    boxes = [{ ...initialBox }]
    foothold = null
    hinder = null
    keyDownTime = 0
    currentScore = 0
    removeEventListen()
    setTimeout(() => {
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      // 关闭游戏页面更新最高分
      homePage.style.display = 'block'
      gamePage.style.display = 'none'
      highestScoreBtn.innerText = '最高分：' + highestScore
    }, 1000)
  }
})()
