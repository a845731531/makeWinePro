import { GuideConditionExecuter } from "./GuideManager";

export class GuideAlwaysMatchExecuter implements GuideConditionExecuter {
    isConditionMatch(needParam: string, curParam: string): boolean {
        return true
    }
}