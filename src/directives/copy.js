export default {
  bind(el, { value }, vNode) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        // 判断页面上是否有创建的 copy-wrap div 有则移除
        const copyWrap = document.querySelector('#copy-wrap')
        if (copyWrap) {
          document.body.removeChild(copyWrap)
        }

        console.log('复制成功') // 可根据项目UI仔细设计
        // 增加复制成功提示
        const divNode = document.createElement('div')
        divNode.id = 'copy-wrap'
        // el.style.position = 'relative'
        // divNode.innerHTML = '复制成功'
        // 调用 vuei18n
        divNode.innerHTML = vNode.context.$t('copySuccess')
        divNode.style.position = 'fixed'
        divNode.style.zIndex = '10000'
        divNode.style.width = '234px'
        divNode.style.height = '71px'
        divNode.style.textAlign = 'center'
        divNode.style.lineHeight = '71px'
        divNode.style.background = 'rgba(0,0,0,0.7)'
        divNode.style.borderRadius = '16px'
        divNode.style.left = '50%'
        divNode.style.top = '50%'
        divNode.style.transform = 'translate(-50%,-50%)'
        divNode.style.whiteSpace = 'nowrap'
        divNode.style.fontSize = '16px'
        divNode.style.color = '#fff'
        divNode.style.fontFamily = 'PingFangSC, PingFangSC-Medium'
        divNode.style.fontWeight = '500'
        divNode.style.opacity = '1'
        divNode.style.transition = 'opacity 1s'
        // 移动端样式
        if (
          navigator.userAgent
            .toLowerCase()
            .match(
              /(ipod|iphone|android|coolpad|tokenpocket|mmp|smartphone|midp|wap|xoom|j2me|blackberry)/i
            )
        ) {
          divNode.style.width = '239px'
          divNode.style.height = '56px'
          divNode.style.lineHeight = '56px'
          divNode.style.borderRadius = '10px'
        }

        // divNode.style.translate = 'tran'
        document.body.appendChild(divNode)
        // 延迟1000毫秒后移除
        let timer = setTimeout(() => {
          divNode.style.opacity = '0'
          // divNode.style.display = 'none'
        }, 1000)
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  },
}
