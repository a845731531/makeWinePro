const Fs=require("fire-fs"),FsExtra=require("fs-extra"),Path=require("fire-path");module.exports={get rootDir(){return Path.join(Editor.Project.path,"packages-hot-update")},get manifestDir(){return Path.join(this.rootDir,"manifest")},get testServerDir(){return Path.join(this.rootDir,"test-server")},get versionsDir(){return Path.join(this.rootDir,"versions")},initialization(){FsExtra.ensureDirSync(this.rootDir),FsExtra.ensureDirSync(this.manifestDir),FsExtra.ensureDirSync(this.testServerDir),FsExtra.ensureDirSync(this.versionsDir)}};