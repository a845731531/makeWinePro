module.exports = {
    serialize(component) {
        let assets = []
        let componentInfo = {
            type: "Image",
            imageType: component.type,
            spriteFrame: "",
            capInsets: [0,0,0,0],
        }
        if(component._spriteFrame) {
            let imageUuid = component._spriteFrame._texture._uuid
            let imagePath = Editor.assetdb.remote.uuidToUrl(imageUuid)
            assets.push(imagePath)
            componentInfo.spriteFrame = imagePath.substr(5)
            componentInfo.capInsets = component._spriteFrame._capInsets
        }
        return {
            component: componentInfo,
            assets: assets,
        }
    },
    deserialize(node, componentData, resourcePath) {
        let spriteComp = node.addComponent(cc.Sprite)
        spriteComp.type = componentData.imageType
        if(componentData.spriteFrame) {
            let spriteFrameDatas = Editor.assetdb.remote.subAssetInfos(resourcePath + "/" + componentData.spriteFrame)
            if(spriteFrameDatas.length > 0) {
                let uuid = spriteFrameDatas[0].uuid
                cc.assetManager.loadAny([{ uuid: uuid }], (error, spriteFrame) => {
                    spriteComp.spriteFrame = spriteFrame    
                })
            }
            
            //有设置九宫格
            if(componentData.capInsets)
            {
                for(let i = 0 ; i < componentData.capInsets.length; i++)
                {
                    if(componentData.capInsets[i] != 0)
                    {
                        Editor.assetdb.queryMetaInfoByUuid( spriteFrameDatas[0].uuid, function ( err,info ) {
                            // info 中包含以下属性：
                            // assetType: 资源类型
                            // defaultType: meta 类定义的 defaultType 接口返回值（一般与 assetType 一致）,
                            // assetUrl: 资源的 Url（格式如：db://assets/foobar）,
                            // assetPath: 资源文件在文件系统中的绝对路径,
                            // metaPath: meta 文件在文件系统中的绝对路径,
                            // metaMtime: meta 文件的最后修改时间,
                            // assetMtime: 资源文件的最后修改时间,
                            // isSubMeta: 是否为 subMeta,
                            // json: meta 文件中的内容
                         
                            var meta = JSON.parse(info.json);
                         
                            // 在这里修改 meta 的属性
                            meta.borderLeft = componentData.capInsets[0] 
                            meta.borderTop = componentData.capInsets[1] 
                            meta.borderRight = componentData.capInsets[2] 
                            meta.borderBottom = componentData.capInsets[3] 
                         
                            Editor.assetdb.saveMeta( spriteFrameDatas[0].uuid, JSON.stringify(meta), err => {
                                // meta 属性已修改，继续处理
                            });
                          });
                        return
                    }
                }
                
            }
        }
    },
}