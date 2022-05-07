function renderSvg(h, node, props){
    let nodeProps = {
        attrs: {
            ...node.attributes
        }
    };
    // 根元素,绑定事件,设置组件的宽高颜色
    if(node.name === 'svg'){
        nodeProps.on = props.listeners;
        Object.assign(nodeProps.attrs, props.attrs);
    }
    const children = node.children || [];
    return h(
        node.name,
        nodeProps,
        children.map((childNode) => {
            return renderSvg(h, childNode, props);
        })
    )
}

const Icon = {
    name: 'icon',
    props: {
        name: String,
        size: {
            type: String,
            default: '20px'
        },
        // 可不传
        width: String,
        height: String,
    },

    // 图标集合
    icons: [],

    /**
     * 给图标组件添加可使用的图标
     * @param {*} newIcons 参数可以是单个图标对象，也可以是图标数组
     */
    add(newIcons){
        const expectAddIcons = [].concat(newIcons);
        expectAddIcons.forEach(icon => {
            // 防重复添加图标
            if(this.icons.indexOf(icon) === -1){
                this.icons.push(icon);
            }
        });
    },

    computed: {
        /**
         * 当前要渲染的icon
         * {name: '', icon: svgJSONObject}
         */
        renderIcon(){
            // 如果图标没找到，会在渲染的时候处理
           return this.$options.icons.find((item) => item.name === this.name);
        },

        /**
         * 要渲染的图标的宽高
         * 1）宽高默认都是size
         * 2) 如果组件设置了宽高则用此数据覆盖size
         */
        renderSize(){
            const size = {
                width: this.size,
                height: this.size
            }
            if(typeof this.width === 'string' && typeof this.height === 'string'){
                size.width = this.width;
                size.height = this.height;
            }
            return size;
        }
    },

    render(h){
        if(!this.renderIcon) return null;
        const props = {
            listeners: this.$listeners,
            attrs: {
                name: this.renderIcon.name,
                width: this.renderSize.width,
                height: this.renderSize.height,
                fill: 'currentColor'
            }
        };
        return renderSvg(h, this.renderIcon.icon, props);
    },
}

Icon.install = (Vue) => {
    Vue.component(Icon.name, Icon);
}

export default Icon;
