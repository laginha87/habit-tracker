import { Duration } from "luxon";

export const formatMoney = (money : number) => `${money.toFixed(2)} €`

export const formatTime = (minutes : number) =>
    Duration.fromObject({minutes}).toFormat('hh:mm')