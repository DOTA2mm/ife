document.addEventListener('DOMContentLoaded', function (ev) {
  console.log(ev,'domready!')
  document.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    const clientW = document.documentElement.clientWidth
    const clientH = document.documentElement.clientHeight
    const targetX = ev.x
    const targetY = ev.y
    const menu = document.getElementById('context-menu')
    let menuW = getComputedStyle(menu).width
    let menuH = getComputedStyle(menu).height
    let posX = targetX
    let posY = targetY
    if (targetX + 267 > clientW) {
      posX = clientW - 267
    }
    if (targetY + 234 > clientH) {
      posY = clientH - 234
    }
    console.log(targetX + menuW.slice(0, -2), menuH)
    menu.style.cssText += `left: ${posX}px; top: ${posY}px;`
    menu.style.display = 'block'
  })

  document.addEventListener('click', function () {
    document.getElementById('context-menu').style.display = 'none'
  })
})