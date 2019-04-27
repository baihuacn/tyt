/**
 * @file: 游戏主要控制逻辑
 */
;(function() {
  function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
  }
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
        case 1:
          boxHeight = lastBox.height
          boxWidth = initialBox.width + initialBox.width * getRandomNumber(2)
          spacing = 40
          heightDifference = 40
          emptyDifference = 0
          break
        case 2:
          boxHeight = initialBox.height
          boxWidth = initialBox.width
          spacing = 40 + 20 * getRandomNumber(5)
          heightDifference = 40 + 50 * getRandomNumber(9)
          emptyDifference = 0
          break
        case 3:
          boxHeight = initialBox.height
          boxWidth = initialBox.width
          spacing = 40 + 20 * getRandomNumber(5)
          heightDifference = 40 + 50 * getRandomNumber(9)
          emptyDifference = heightDifference - 10 * getRandomNumber(3)
          break
        default:
          break
      }
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
  function updateBoxes() {
    var firstBox = boxes.shift()
    var offsetX = firstBox.width + firstBox.spacing
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    boxes.forEach((item) => {
      item.x -= offsetX
    })
    jumper.x -= offsetX
    drawJumper()
    drawBoxes()
  }
  function drawJumper() {
    ctx.fillStyle = jumper.color
    ctx.fillRect(jumper.x, jumper.y, jumper.width, jumper.height)
  }
  function updateJumper() {
    ctx.clearRect(jumper.x, jumper.y, jumper.width, jumper.height)
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
      if (
        nextX + jumper.width > item.x &&
        nextX < item.x + item.width &&
        jumper.y + jumper.height > item.y &&
        nextY < item.y + item.height
      ) {
        hinder = item
        break
      } else if (nextX > item.x - jumper.width + 1 && nextX < item.x + item.width && nextY >= item.y - jumper.height) {
        foothold = item
        footholdIndex = i
        break
      }
    }

    if (foothold) {
      clearInterval(timer)
      nextY = foothold.y - jumper.height
      jumper.y = nextY
      drawJumper()
      // 重置数据，为再次起跳做准备
      addEventListen()
      jumper = { ...jumper, ...jumperSpeed }
      foothold = null
      if (footholdIndex > 2) {
        setTimeout(() => {
          updateBoxes()
        }, 100)
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
  function timeStart(event) {
    if (event.keyCode === 32) {
      keyDownTime = new Date().getTime()
    }
  }
  function timeEnd(event) {
    if (event.keyCode === 32) {
      removeEventListen()
      // 空格键按下蓄力的时间，设置横向及纵向的移动速度
      var storingForceTime = (new Date().getTime() - keyDownTime) / 1000
      jumper.vy = parseInt(storingForceTime * 100)
      jumper.vx = parseInt(storingForceTime * 10) + 1
      // 播放跳跃音乐，500ms后播放停止
      var audio = document.getElementById('jumperAudio')
      audio.play()
      setTimeout(function() {
        audio.pause()
      }, 500)
      timer = setInterval(() => {
        updateJumper()
      }, 20)
    }
  }
  function addEventListen() {
    window.addEventListener('keydown', timeStart)
    window.addEventListener('keyup', timeEnd)
  }
  function removeEventListen() {
    window.removeEventListener('keydown', timeStart)
    window.removeEventListener('keyup', timeEnd)
  }
  window.initialGame = function() {
    createBoxes()
    drawBoxes()
    drawJumper()
    addEventListen()
  }
  function endGame() {
    jumper = { ...initialJumper }
    boxes = [{ ...initialBox }]
    foothold = null
    hinder = null
    keyDownTime = 0
    removeEventListen()
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    setTimeout(() => {
      homePage.style.display = 'block'
      gamePage.style.display = 'none'
    }, 700)
  }
})()
