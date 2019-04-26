/**
 * @file: 游戏主要控制逻辑
 */
;(function() {
  function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
  }
  function createBoxes() {
    var boxHeight = boxes[boxes.length - 1].height
    var boxWidth = boxes[boxes.length - 1].width
    var spacing = 40
    var heightDifference = 40
    var increase = true
    var totalWidth = 0
    boxes.forEach((item) => {
      totalWidth += item.width + spacing
    })
    while (totalWidth + boxWidth <= innerWidth) {
      if (innerHeight - boxHeight < 300) {
        increase = false
      } else if (boxHeight < 80) {
        increase = true
      }
      if (increase) {
        boxHeight = boxHeight + heightDifference
      } else {
        boxHeight = boxHeight - heightDifference
      }
      boxes.push({
        color: boxColors[getRandomNumber(6)],
        x: boxes.length * (boxWidth + spacing),
        y: innerHeight - boxHeight,
        width: boxWidth,
        height: boxHeight
      })
      totalWidth += boxWidth + spacing
    }
  }
  createBoxes()
  function drawBoxes() {
    boxes.forEach((item) => {
      ctx.fillStyle = item.color
      ctx.fillRect(item.x, item.y, item.width, item.height)
    })
  }
  drawBoxes()
  function drawJumper() {
    ctx.beginPath()
    ctx.fillStyle = jumper.color
    ctx.fillRect(jumper.x, jumper.y, jumper.width, jumper.height)
  }
  drawJumper()
  function updateJumper() {
    ctx.clearRect(jumper.x, jumper.y, jumper.width, jumper.height)
    if (jumper.x >= innerWidth || jumper.y + jumper.height <= 0 || jumper.y > innerHeight) {
      clearInterval(timer)
      return
    }

    var nextX = jumper.x + jumper.vx
    var nextY = jumper.y - jumper.vy
    var nextVY = jumper.vy - jumper.g
    for (var i = 0; i < boxes.length; i++) {
      var item = boxes[i]
      if (nextX + jumper.width > item.x && nextX < item.x + item.width && jumper.y + jumper.height > item.y) {
        hinder = boxes[i]
        break
      } else if (nextX < item.x + item.width && nextX > item.x - jumper.width && nextY >= item.y - jumper.height) {
        foothold = boxes[i]
        break
      }
    }

    if (foothold) {
      clearInterval(timer)
      nextY = foothold.y - jumper.height
      jumper.y = nextY
      drawJumper()
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
  window.onkeyup = function(event) {
    if (event.keyCode === 32) {
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
})()
