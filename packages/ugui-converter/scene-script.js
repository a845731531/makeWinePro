var NodeSerializer = Editor.require("packages://ugui-converter/serializer/NodeSerializer")
var path = require("path")

var ComponentNameMap = {
    "Text": "Label",
    "Image": "Sprite",
}

module.exports = {
	formatNode(node) {
		let data = {}
        data.baseInfo = NodeSerializer.serialize(node)
		data.components = []
		data.children = []
		for (let i = 0, l = node._components.length; i < l; i++) {
            let component = node._components[i];
            let typeName = component.constructor.name
            let serializerName = typeName.replace("cc_", "") + "Serializer"
            try {
                let serializer = Editor.require("packages://ugui-converter/serializer/" + serializerName)
                let serilizerData = serializer.serialize(component)
                data.components.push(serilizerData.component)
                this.assetList = this.assetList.concat(serilizerData.assets)
            } catch (error) {
                console.error(error)
            }
		}
		for (let i = 0, l = node.children.length; i < l; i++) {
			let nodeInfo = this.formatNode(node.children[i])
			data.children.push(nodeInfo)
		}
		return data
	},
    buildNode: function (nodeData) {
        var node = new cc.Node()
        NodeSerializer.deserialize(node, nodeData.baseInfo)
        
		for (let i = 0, l = nodeData.components.length; i < l; i++) {
            let componentData = nodeData.components[i];
            let typeName = componentData.type
            typeName = ComponentNameMap[typeName] || typeName
            let serializerName = typeName + "Serializer"
            try {
                let serializer = Editor.require("packages://ugui-converter/serializer/" + serializerName)
                serializer.deserialize(node, componentData, this.resourcePath)
            } catch (error) {
                Editor.error(serializerName, error)
            }
		}
		for (let i = 0, l = nodeData.children.length; i < l; i++) {
			let child = this.buildNode(nodeData.children[i])
			child.parent = node
		}
        return node
    },
    'get-node-data': function (event, uuid) {
        cc.assetManager.loadAny([{ uuid: uuid }], (error, prefab) => {
            var target = cc.instantiate(prefab)
            this.assetList = []
            let data = this.formatNode(target)
            if (event.reply) {
                event.reply(null, {
                    treeData: data, 
                    assetList: this.assetList
                });
            }
        })
    },
    'preload-sprite': function(event,data){

        //提前加载好字体库
        Editor.assetdb.queryAssets("db://assets/UnityUI/**\/*", "ttf-font",function(err,result){
            let loadList = []
            for(let i = 0; i < result.length; i++)
            {
                loadList.push({
                    uuid: result[i].uuid
                })
            }
            cc.assetManager.loadAny(loadList, (error, font) => {

            })
            
        })

        //提前加载好图片资源
        Editor.assetdb.queryAssets("db://assets/UnityUI/**\/*", "sprite-frame",function(err,result){
            let loadList = []
            for(let i = 0; i < result.length; i++)
            {
                loadList.push({
                    uuid: result[i].uuid
                })
            }

            cc.assetManager.loadAny(loadList, (error, spriteList) => {
                if (event.reply) {
                    event.reply(null, {
                        code: 1, 
                    });
                }
            })
            
        })

    },
    'build-node': function(event, data) {
        let urlConfig = path.parse(data.url)
        let prefabPath = data.prefabTargetFolder + "/" + urlConfig.name + ".prefab"
        this.resourcePath = data.resourcePath
        cc.assetManager.loadAny([{ uuid: data.uuid }], (error, jsonAsset) => {
            let node = this.buildNode(jsonAsset.json)
            if(Editor.assetdb.remote.urlToUuid(prefabPath)) {
                Editor.assetdb.delete(prefabPath)
            }
            node.parent = cc.find("Canvas")
            setTimeout(() => {
                Editor.Ipc.sendToPanel('scene', 'scene:create-prefab', node.uuid, data.prefabTargetFolder, console.log);
                Editor.Ipc.sendToPanel('scene', 'scene:apply-prefab', node.uuid, console.log);
                setTimeout(() => {
                    node.destroy()
                }, 200)
            }, 500)
        })
    }
};