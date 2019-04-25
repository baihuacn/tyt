/**
 * @file: 游戏主要控制逻辑
 */
;(function() {
  function getRandomNumber(range) {
    return Math.floor(Math.random() * range)
  }
  function drawBox() {
    var boxHeight = 80
    var boxWidth = 40
    var spacing = 40
    var heightDifference = 40
    var increase = true
    for (var i = 0; i < 10; i++) {
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
      ctx.fillStyle = boxColors[getRandomNumber(6)]
      ctx.fillRect(i * (boxWidth + spacing), innerHeight - boxHeight, boxWidth, boxHeight)
    }
  }
  drawBox()
  function render(cxt) {
    cxt.clearRect(ball.x - ball.r, ball.y - ball.r, 2 * ball.r, 2 * ball.r)
    update()
    cxt.beginPath()
    cxt.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
    cxt.fillStyle = ball.color
    cxt.fill() //填充
  }
  function update() {
    ball.x += ball.vx
    ball.y += ball.vy
    ball.vy += ball.g
    if (ball.y >= 768 - ball.r) {
      ball.y = 768 - ball.r
      ball.vy = -ball.vy * 0.5 //到达底部弹起来，*0.5有个缓冲的效果
    }
  }
  var ball = { x: 0, y: 0, r: 20, g: 2, vx: 4, vy: 10, color: '#f6aeab' } //定义球的初始值g：加速度，vx:x轴方向的速度，vy:y轴方向的速度
  setInterval(function() {
    render(ctx)
  }, 50)
})()
