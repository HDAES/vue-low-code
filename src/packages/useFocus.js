import { computed } from 'vue'
export default function useFocus(data, callback) {
    const blockMousedown = (e, block) => {

        e.preventDefault()
        e.stopPropagation()
        // block 设置属性 focus ,获取焦点 为true

        if (e.shiftKey) {
            block.focus = !block.focus
        } else {
            if (!block.focus) {
                clearBlockFocus()
                //清空其他 focus
                block.focus = true
            } else {
                block.focus = false
            }
        }
        callback(e)
    }
    const clearBlockFocus = () => {
        data.value.blocks.forEach(block => block.focus = false)
    }

    const focusData = computed(() => {
        let focus = []
        let unfocused = []
        data.value.blocks.forEach(block => (block.focus ? focus : unfocused).push(block))

        return { focus, unfocused }
    })

    //取消选中
    const containerMousedown = () => clearBlockFocus()

    return {
        containerMousedown, focusData, blockMousedown
    }
}