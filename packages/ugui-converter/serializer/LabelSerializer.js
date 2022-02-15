module.exports = {
    serialize(component) {
        let assets = []
        let componentInfo = {
            type: "Text",
            text: component.string,
            fontSize: component.fontSize,
            lineHeight: component.lineHeight,
            horizontalAlign: component.horizontalAlign,
            verticalAlign: component.verticalAlign,
            enableBold: component.enableBold,
            enableItalic: component.enableItalic,
            enableUnderline: component.enableUnderline,                
            enableWrapText: component.enableWrapText,
            overflow: component.overflow,
            font: "",
        }
        if(component.font) {
            let fontUuid = component.font._uuid
            let fontPath = Editor.assetdb.remote.uuidToUrl(fontUuid)
            assets.push(fontPath)
            componentInfo.font = fontPath.substr(5)
        }
        return {
            component: componentInfo,
            assets: assets,
        }
    },
    deserialize(node, componentData, resourcePath) {
        let labelComp = node.addComponent(cc.Label)
        labelComp.string = componentData.text
        labelComp.fontSize = componentData.fontSize
        labelComp.horizontalAlign = componentData.horizontalAlign
        labelComp.verticalAlign = componentData.verticalAlign
        labelComp.enableBold = componentData.enableBold
        labelComp.enableItalic = componentData.enableItalic

        if(componentData.font != "")
        {
            Editor.assetdb.queryUuidByUrl(resourcePath + "/" + componentData.font,(error,uuid)=>{
                cc.assetManager.loadAny([{ uuid: uuid }], (error, font) => {
                    labelComp.font = font    
                })
            })
        }
    },
}