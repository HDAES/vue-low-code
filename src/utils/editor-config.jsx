import { ElButton, ElInput } from 'element-plus'
const createEditorConfig = () => {

    const componentList = []
    const componentMap = {}

    function registerConfig(component) {
        componentList.push(component)
        componentMap[component.key] = component
    }

    return {
        componentList,
        componentMap,
        registerConfig
    }
}

export let editorConfig = createEditorConfig()

editorConfig.registerConfig({
    lable: '文本',
    preview: () => '预览文本',
    render: () => ' 渲染文本',
    key: 'text'
})

editorConfig.registerConfig({
    lable: '按钮',
    preview: () => <ElButton>预览按钮</ElButton>,
    render: () => <ElButton>渲染按钮</ElButton>,
    key: 'button'
})

editorConfig.registerConfig({
    lable: '文本框',
    preview: () => <ElInput placeholder="预览输入框"></ElInput>,
    render: () => <ElInput placeholder="渲染输入框"></ElInput>,
    key: 'input'
})