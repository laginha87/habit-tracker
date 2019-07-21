import { DateTime } from "luxon";

export type DayResult  = "good" | "bad";

export type DayData = {
    result: DayResult;
    date: DateTime;
}

export type DayDataExtended = {
    dateFormatted: string;
} & DayData


export type Wallet = {
    total: number;
}

export type WalletExtended = {
    minutes: number;
    euros: number;
} & Wallet;