import { defineComponent,computed, inject,ref } from "vue";
import EditorBlock from './editor-block'
import './editor.scss'
import useMenuDragger from './useMenuDragger'
import useFocus from './useFocus'
import useBlockDragger from './useBlockDragger'
import deepcopy from 'deepcopy';

export default defineComponent({
    props:{
        modelValue: {
            type: Object
        }
    },
    setup(props,ctx){
        
        const data = computed({
            get(){
                return props.modelValue
            },
            set(newValue){
                ctx.emit('update:modelValue', deepcopy(newValue))
            }
        })

        const containerStyles = computed(()=>({
            width: data.value.container.width + 'px',
            height: data.value.container.height + 'px'
        }))

        const config = inject('config')

        const containerRef = ref(null)
       
        const {dragStart, dragEnd} = useMenuDragger(containerRef,data)


        const { containerMousedown, focusData, blockMousedown } = useFocus(data,(e) =>{
            const { mousedown } = useBlockDragger(focusData)
            mousedown(e)
        
        })
       


        return () =>(
            <div className="editor"> 
                <div className="editor-left">
                    {
                        config.componentList.map(component =>(
                            <div 
                                draggable 
                                onDragstart={e => dragStart(e,component)}
                                onDragend={e => dragEnd(e,component)}
                                className="editor-left-item" >
                                <span>{component.lable}</span>
                                {component.preview()}
                            </div>
                        ))
                    }
                   
                </div>
                <div className="editor-top">菜单栏</div>
                <div className="editor-right">属性控制栏目</div>
                <div className="editor-container">
                    <div className="editor-container-canvas">
                        <div 
                            onMousedown={containerMousedown}
                            className="editor-container-canvas_content"  
                            ref={containerRef} 
                            style={containerStyles.value}>
                            {
                                data.value.blocks.map((block) =>(
                                    <EditorBlock 
                                        onMousedown={e =>blockMousedown(e,block)}
                                        block={block} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})