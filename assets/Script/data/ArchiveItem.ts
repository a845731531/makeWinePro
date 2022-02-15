export default class ArchiveItem {
    serialize()
    {
        let archiveObj = {}
        for(let key in this){
            let keyStr = key.toString()
            let value = this[key]
            if(value && typeof value != "function" && keyStr.indexOf("_") != 0) {
                archiveObj[keyStr] = value
            }
        }
        return archiveObj
    }
    deserialize(archiveObj: any) {
        for(let key in archiveObj) {
            this[key] = archiveObj[key]
        }
    }
}