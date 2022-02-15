var path = require("path")

Editor.Panel.extend({
    style: `
      :host { margin: 5px; }
      h2 { color: #f90; }
    `,
  
    template: `
      <ui-prop name="根目录">
        <div class="flex-1 layout horizontal center">
            <ui-input class="flex-2" readonly="readonly" disabled="disabled" v-value="resourcePath">
            </ui-input>
            <ui-button v-on:confirm="onSelectResourceRootDir">
                选择
            </ui-button>
        </div>
      </ui-prop>
      <ui-prop name="预制体配置目录">
        <div class="flex-1 layout horizontal center">
            <ui-input class="flex-2" readonly="readonly" disabled="disabled" v-value="prefabSrcFolder">
            </ui-input>
            <ui-button v-on:confirm="onSelectPrefabSrcDir">
                选择
            </ui-button>
        </div>
      </ui-prop>
      <ui-prop name="预制体生成目录">
        <div class="flex-1 layout horizontal center">
            <ui-input class="flex-2" readonly="readonly" disabled="disabled" v-value="prefabTargetFolder">
            </ui-input>
            <ui-button v-on:confirm="onSelectPrefabTargetDir">
                选择
            </ui-button>
        </div>
      </ui-prop>
      
      <ui-checkbox v-if="allSelect" checked v-on:change="onChangeSelectAll">全选</ui-checkbox>
      <ui-checkbox v-else v-on:change="onChangeSelectAll">全选</ui-checkbox>

      <div style="width: 100%; height: 200px; overflow: scroll; ">
        <div v-for="(path,value) in prefabList">
            <ui-checkbox v-if="value" checked v-on:change="onChangeSelectItem(path)">{{path}}</ui-checkbox>
            <ui-checkbox v-else v-on:change="onChangeSelectItem(path)">{{path}}</ui-checkbox>
            <br/>
        </div>
      </div>
      <ui-button v-on:confirm="onStartImport">
          开始导入
      </ui-button>
    `,
  
    ready () {
        let profile = Editor.Profile.load('profile://project/ugui-converter.json');
        new window.Vue({
            el: this.shadowRoot,
            data: {
                resourcePath: profile.get("resourcePath") || 'db://assets/GameMain', 
                prefabSrcFolder: profile.get("prefabSrcFolder") || "db://assets/GameMain", 
                prefabTargetFolder: profile.get("prefabTargetFolder") || "db://assets/Import",  
                prefabList: {},
                allSelect: true
            },
            created() {
                let assetPath = Editor.url('db://assets')
                if(profile.get("prefabSrcFolder"))
                {
                    this.prefabSrcFolder = this.prefabSrcFolder.replace(assetPath, "db://assets").replaceAll("\\", "/")
                    Editor.assetdb.queryAssets(this.prefabSrcFolder + "/**/*", "json",(error, jsonList) => {
                        this.prefabList = {}
                        for(let i = 0; i < jsonList.length; i++) {
                            Vue.set(this.prefabList, jsonList[i].url, true)
                        }
                    })
                }
            },
            methods: {
                onSelectResourceRootDir() {
                    let assetPath = Editor.url('db://assets')
                    let oldPath = profile.get("resourcePath") || 'db://assets'
                    var exportPaths = Editor.Dialog.openFile({
                        title: "选择根目录", 
                        defaultPath: Editor.url(oldPath),
                        properties: ['openDirectory']
                    })
                    if(exportPaths == -1) {
                    } else {
                        if(exportPaths[0].indexOf(assetPath) != -1)
                        {
                            this.resourcePath = exportPaths[0].replace(assetPath, "db://assets").replaceAll("\\", "/")
                        }
                    }
                },
                onSelectPrefabSrcDir() {
                    let assetPath = Editor.url('db://assets')
                    let oldPath = profile.get("prefabSrcFolder") || 'db://assets'
                    var exportPaths = Editor.Dialog.openFile({
                        title: "选择预制体配置目录", 
                        defaultPath: Editor.url(oldPath),
                        properties: ['openDirectory']
                    })
                    if(exportPaths == -1) {
                    } else {
                        if(exportPaths[0].indexOf(assetPath) != -1)
                        {
                            this.prefabSrcFolder = exportPaths[0].replace(assetPath, "db://assets").replaceAll("\\", "/")
                            Editor.assetdb.queryAssets(this.prefabSrcFolder + "/**/*", "json",(error, jsonList) => {
                                this.prefabList = {}
                                for(let i = 0; i < jsonList.length; i++) {
                                    Vue.set(this.prefabList, jsonList[i].url, true)
                                }
                            })
                        }

                    }
                },
                onSelectPrefabTargetDir() {
                    let assetPath = Editor.url('db://assets')
                    let oldPath = profile.get("prefabTargetFolder") || 'db://assets'
                    var exportPaths = Editor.Dialog.openFile({
                        title: "选择预制体生成目录", 
                        defaultPath: Editor.url(oldPath),
                        properties: ['openDirectory']
                    })
                    if(exportPaths == -1) {
                    } else {
                        if(exportPaths[0].indexOf(assetPath) != -1)
                        {
                            this.prefabTargetFolder = exportPaths[0].replace(assetPath, "db://assets").replaceAll("\\", "/")
                        }
                    }
                },
                onChangeSelectAll() {    
                    this.allSelect = !this.allSelect
                    for(let path in this.prefabList) {
                        Vue.set(this.prefabList, path, this.allSelect)
                    }
                },
                onChangeSelectItem(path1){
                    for(let path in this.prefabList) {
                        if(path1 == path)
                        {
                            Vue.set(this.prefabList, path, !this.prefabList[path])
                            // Editor.log("修改导入状态",path,this.prefabList[path])
                        }
                    }
                },
                mkdirRecurive(dirPath) {
                    if (Editor.assetdb.remote.urlToUuid(dirPath)) {
                        return true;
                    } else {
                        if (this.mkdirRecurive(path.dirname(dirPath))) {
                            Editor.assetdb.create(dirPath);
                            return true;
                        }
                    }
                },
                onStartImport() {
                    let self = this
                    let pathList = []
                    for(let path in this.prefabList) {
                        if(this.prefabList[path]) {
                            pathList.push(path)
                        }
                    }
                    self.mkdirRecurive(self.prefabTargetFolder)

                    //提前加载好图集和字体库 等资源
                    Editor.Scene.callSceneScript('ugui-converter', 'preload-sprite', {
                        //preload-sprite不需要传参
                    }, (err, data) => {
                        //preload-sprite 完成后的回调
                        for(let i = 0; i < pathList.length; i++) {
                            let url = pathList[i]
                            let uuid = Editor.assetdb.remote.urlToUuid(url)
                            Editor.Scene.callSceneScript('ugui-converter', 'build-node', {
                                uuid: uuid,
                                url: url,
                                resourcePath: self.resourcePath,
                                prefabTargetFolder: self.prefabTargetFolder,
                            }, (err, data) => {

                            });
                        }
                    });

                    profile.set("resourcePath", this.resourcePath)
                    profile.set("prefabSrcFolder", this.prefabSrcFolder)
                    profile.set("prefabTargetFolder", this.prefabTargetFolder)
                    profile.save()
                }
            }
        });
    },
});