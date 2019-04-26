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
  function updateJumper() {
    console.log(jumper)
    ctx.clearRect(jumper.x, jumper.y, jumper.width, jumper.height)
    jumper.x += jumper.vx
    jumper.y -= jumper.vy
    jumper.vy -= jumper.g
    var foundBox = boxes.find((item) => {
      return item.x > jumper.x + jumper.width && item.x - 40 < jumper.x
    })
    if (jumper.x + jumper.width === 0) {
    }
  }
  function jumpUp() {
    updateJumper()
    drawJumper()
  }
  setInterval(function() {
    jumpUp()
  }, 1000)
})()
