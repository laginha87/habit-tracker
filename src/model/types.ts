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

export type SpendType = "money" | "time";

export type WalletExtended = {
    minutes: number;
    euros: number;
} & Wallet;

export type SpendData = {
    date: DateTime;
    type: SpendType;
    value: number;
    description: string;
}