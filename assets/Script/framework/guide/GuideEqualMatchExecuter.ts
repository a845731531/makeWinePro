import { GuideConditionExecuter } from "./GuideManager";

export class GuideEqualMatchExecuter implements GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean {
        return (needParam == curParam)
    }
}