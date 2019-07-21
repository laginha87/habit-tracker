import { Wallet, DayData } from "../model/types";

type State = {
    days?: Array<DayData>;
    wallet?: Wallet;
}

const TYPES = "";


type Action = {
    type: typeof TYPES;
}

export const reducer = ( state : State = {}, action : Action ) => {
    switch (action.type) {
        case "":

            break;

        default:
            break;
    }
    return state;
}
