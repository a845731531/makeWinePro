type TaskConfigData = {
	taskId: number,
	name: string,
	taskType: number,
	activateConditon: string,
	isAutoReceive: boolean,
	receivePos: number[],
	finishType: number,
	targetType: string,
	targetParam: number,
	isAutoSubmit: boolean,
	submitPos: number[],
	rewards: string[],
	nextTaskId: number,
	desc: string,
}
let TaskConfig: { [id: string]: TaskConfigData } = {
    "1": {
        "taskId": 1,
        "name": "基建狂魔",
        "taskType": 0,
        "activateConditon": "0_0",
        "isAutoReceive": true,
        "receivePos": [],
        "finishType": 2,
        "targetType": "2_1",
        "targetParam": 1,
        "isAutoSubmit": true,
        "submitPos": [],
        "rewards": [
            "30001_1000"
        ],
        "nextTaskId": -1,
        "desc": "建造1块农田"
    },
    "2": {
        "taskId": 2,
        "name": "精耕细作",
        "taskType": 1,
        "activateConditon": "0_0",
        "isAutoReceive": true,
        "receivePos": [],
        "finishType": 2,
        "targetType": "1_31003",
        "targetParam": 1000,
        "isAutoSubmit": true,
        "submitPos": [],
        "rewards": [
            "30001_1000"
        ],
        "nextTaskId": -1,
        "desc": "生产1000公斤普通小麦"
    },
    "3": {
        "taskId": 3,
        "name": "祈福",
        "taskType": 2,
        "activateConditon": "0_0",
        "isAutoReceive": true,
        "receivePos": [],
        "finishType": 1,
        "targetType": "1_200",
        "targetParam": 200,
        "isAutoSubmit": true,
        "submitPos": [],
        "rewards": [
            "30001_1000"
        ],
        "nextTaskId": -1,
        "desc": "前往雕像祈福"
    },
    "4": {
        "taskId": 4,
        "name": "掌控酒厂",
        "taskType": 3,
        "activateConditon": "0_0",
        "isAutoReceive": true,
        "receivePos": [],
        "finishType": 0,
        "targetType": "1_500",
        "targetParam": 1,
        "isAutoSubmit": true,
        "submitPos": [],
        "rewards": [
            "30001_1000"
        ],
        "nextTaskId": -1,
        "desc": "探索商城"
    }
}
export default TaskConfig;