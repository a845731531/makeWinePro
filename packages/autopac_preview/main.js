'use strict';
var fs = require("fs")
module.exports = {
    load () {
    },
    
    unload () {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'say-hello' () {
            Editor.log('Hello World!');
        },
        'asset-db:asset-changed' (event) {
            Editor.assetdb.queryAssets("db://**/**","auto-atlas", function(err, pacList) {
                for(let i = 0; i < pacList.length; i++) {
                    let pacConfig = pacList[i]
                    let destPath = pacConfig.destPath

                    let url = pacConfig.url
                    let dirIndex = url.lastIndexOf("/")
                    let dirUrl = url.slice(0, dirIndex)
                    let spriteFrameFormat = dirUrl + "/*/*"
                    new Promise((resolve, reject) => {
                        Editor.assetdb.queryAssets(spriteFrameFormat, "sprite-frame", (err, arrays)=> {
                            if(err) {
                                reject(err)
                            } else {
                                resolve(arrays)
                            }
                        })
                    }).then((spriteFrames) => {
                        var data = fs.readFileSync(destPath);
                        var pacConfig = JSON.parse(data.toString())
                        pacConfig._objFlags = 0
                        pacConfig._native = 0                        
                        pacConfig._spriteFrames = {}
                        for(let j = 0; j < spriteFrames.length; j++) {
                            let itemFrame = spriteFrames[j]
                            let dirIndex = itemFrame.url.lastIndexOf("/")
                            let name = itemFrame.url.slice(dirIndex + 1)
                            pacConfig._spriteFrames[name] = {
                                __uuid__: itemFrame.uuid,
                            }
                        }
                        fs.writeFileSync(destPath, JSON.stringify(pacConfig))
                    })
                }
            })
        },
    },
};