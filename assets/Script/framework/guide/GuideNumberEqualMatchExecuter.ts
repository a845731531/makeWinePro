import { GuideConditionExecuter } from "./GuideManager";

export class GuideNumberEqualMatchExecuter implements GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean {
        return (Math.abs(parseFloat(needParam) - parseFloat(curParam)) < 0.001)
    }
}