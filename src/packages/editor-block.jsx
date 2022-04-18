import { defineComponent,computed, inject, onMounted, ref } from "vue";

export default defineComponent({
    props:{
        block: {
            type:Object
        }
    },
    setup(props){
        const config = inject('config')

        const blockStyles = computed(() =>({
            top: `${props.block.top}px`,
            left: `${props.block.left}px`,
            zIndex: `${props.block.zIndex}`
        }))

        const blockRef = ref(null)
        onMounted(() =>{
            let { offsetWidth,offsetHeight } = blockRef.value

            if(props.block.alignCenter){    //拖拽松手时候生成
                props.block.left = props.block.left - offsetWidth/2
                props.block.top = props.block.top - offsetHeight/2
                props.block.alignCenter = false       //拿渲染后的结果才能去居中
            }else{

            }
        })
        return () =>{
            const component = config.componentMap[props.block.key]
            const RenderComponent = component.render()
            return (
                <div className={[props.block.focus?'editor-block-focus editor-block': 'editor-block']} style={blockStyles.value} ref={blockRef}> 
                    { RenderComponent }
                </div>
            )
        }
    }
})