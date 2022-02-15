module.exports = {
    serialize(component) {
        let assets = []
        let componentInfo = {
            type: "Button",
            interactable: component.interactable,
        }
        return {
            component: componentInfo,
            assets: assets,
        }
    },
    deserialize(node, componentData, resourcePath) {
        let button = node.addComponent(cc.Button)
        button.interactable = componentData.interactable
    },
}