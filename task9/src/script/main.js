(function(){
  var regType = {
    mobile: /1(3[3-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\d{8}/,
    word: /\b([a-zA-Z-]+)(?=\s+\1\s+)/
  }


  var $ = function (selector) {return document.querySelector(selector)}

  $('#js_toggle').onclick = function (ev) {
    var ev = ev || window.event
    ev.stopPropagation ? ev.stopPropagation() : ev.cancelBubble = true
    $('#js_option').style.display = $('#js_option').style.display === 'block' ? 'none' : 'block'
  }
  $('body').onclick = function () {
    $('#js_option').style.display = 'none'
  }
  $('#js_option').onclick = function (ev) {
    var ev = ev || window.event
    if (ev.target.nodeName === 'LI') {
      switch (ev.target.getAttribute('data-type')) {
        case 'mobile':
          $('#js_reg').value = regType['mobile'].toString().slice(1, -1)
          $('#js_str').value = '13357346686'
          break
        case 'word':
          $('#js_reg').value = regType['word'].toString().slice(1, -1)
          $('#js_str').value = 'oh, go go ola'
          break
      }
    }
  }
  $('#js_check').onclick = function (ev) {
    var ev = ev || window.event
    var result = check($('#js_str').value, $('#js_reg').value)
    if (result.res) {
      $('#js_result').setAttribute('class','success')
      $('#js_result').innerHTML = '成功！'
    } else {
      $('#js_result').setAttribute('class','fail')
      $('#js_result').innerHTML = '失败！'
    }
    $('#js_info').innerHTML = result.info
  }

  function check(str, reg) {
    if (!str) {
      return {res: false, info: '还没输入测试文本呢！'}
    }
    if (!reg) {
      return {res: false, info: '还没输入正则表达式呢！'}
    }
    try {
      new RegExp(reg)
    } catch (error) {
      return {res: false, info: '输入了不合法的正则表达式呢！不要乱输入哦~'}
    }
    var reg = new RegExp(reg)
    var result = str.match(reg)
    console.log(result)
    if (result) {
      if (reg.toString() === regType.mobile.toString()) {
        return {res: true, info: '嗯，这是一个正确的手机号码！'}
      } else if (reg.toString() === regType.word.toString()) {
        return {res: true, info: '找到了相邻的重复单词：' + result[0]}
      } else {
        return {
          res: true,
          info: '在第 ' + (result.index + 1) + '位找到了你要找的' + result[0]
        }
      }
    } else {
      return {res: false, info: '找不到你要找的...难道你在找我么~'}
    }
  }
}())