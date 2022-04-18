
export default function useMenuDragger(containerRef, data) {
    let currentComponent = null

    const dragenter = (e) => {
        e.dataTransfer.dropEffect = 'move'
    }
    const dragover = (e) => {
        e.preventDefault()
    }
    const dragleave = (e) => {
        e.dataTransfer.dropEffect = 'none'
    }
    const drop = (e) => {
        let blocks = data.value.blocks
        data.value = {
            ...data.value, blocks: [
                ...blocks,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    zIndex: 1,
                    key: currentComponent.key,
                    alignCenter: true //松手的时候可以居中
                }
            ]
        }
        currentComponent = null
    }
    const dragStart = (e, component) => {

        // dragenter 进入元素中 添加一个 移动标识
        // dragover 在目标元素中经过 必须阻止默认行为 否则不能触发drop
        // dragleave 离开元素的时候 添加禁用标识
        // drop 松手的时候  根据拖拽的组件添加一个组件
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component
    }
    const dragEnd = (e, component) => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)

        console.log('取消监听')
    }

    return {
        dragStart, dragEnd
    }
}