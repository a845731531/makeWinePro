import { GuideConditionExecuter } from "./GuideManager"


export class GuideContainStrExecuter implements GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean {
        return (curParam.indexOf(needParam) != -1)
    }
}