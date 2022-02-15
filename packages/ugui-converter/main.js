'use strict';
var fs = require("fs")
var path = require("path")

module.exports = {
    profile: null,
    load() {
        this.profile = Editor.Profile.load('profile://project/ugui-converter.json');
    },
	mkdirRecurive(dirPath) {
		if (fs.existsSync(dirPath)) {
			return true;
		} else {
			if (this.mkdirRecurive(path.dirname(dirPath))) {
				fs.mkdirSync(dirPath);
				return true;
			}
		}
	},
	copyAssets(assetList, exportPath) {
		for(let i = 0, len = assetList.length; i < len; i++) {
			let itemUrl = assetList[i]
			let relativePath = itemUrl.substr(itemUrl.indexOf(":") + 3)
			let srcPath = Editor.url(itemUrl)
			let targetPath = path.join(exportPath, relativePath)
			if(fs.existsSync(targetPath)) {
				continue
			}
			let targetDir = path.dirname(targetPath)
			this.mkdirRecurive(targetDir)
			fs.copyFileSync(srcPath, targetPath)
		}
	},
	startExport(exportPath) {
		Editor.assetdb.queryAssets("db://assets/**\/*", "prefab",(error, prefabs) => {
			let exportedNum = 0;
			for(let i = 0, len = prefabs.length; i < len; i++) {
				let itemNode = prefabs[i]
				let prefabPath = itemNode.url.slice(5, -7)
				Editor.Scene.callSceneScript('ugui-converter', 'get-node-data', itemNode.uuid, (err, data) => {
					Editor.log("export " + prefabPath)
					let destPath = path.join(exportPath, prefabPath + ".json")
					let desDir = path.dirname(path.normalize(destPath))
					this.mkdirRecurive(desDir)
					fs.writeFileSync(destPath, JSON.stringify(data.treeData, null, 4))
					this.copyAssets(data.assetList, exportPath)
					exportedNum += 1
					if(exportedNum == len) {
						Editor.Dialog.messageBox({
							message: "导出完成"
						})
					}
				});
			}
		})
	},

	messages: {
		'export'() {
			let oldPath = this.profile.get("exportPath") || Editor.Project.path
			var exportPaths = Editor.Dialog.openFile({
				title: "选择导出目录", 
				defaultPath: oldPath,
				properties: ['openDirectory']
			})
			if(exportPaths == -1) {
				Editor.Dialog.messageBox({
					message: "请选择UI导出目录 "
				})
			} else {
				this.startExport(exportPaths[0]);
				this.profile.set("exportPath", exportPaths[0])
				this.profile.save()
			}
		},
		'import' () {
			Editor.Panel.open("ugui-converter")
		}
	},
};