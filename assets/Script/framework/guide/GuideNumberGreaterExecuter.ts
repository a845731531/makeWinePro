import { GuideConditionExecuter } from "./GuideManager";

export class GuideNumberGreaterExecuter implements GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean {
        return (parseFloat(needParam) < parseFloat(curParam))
    }
}