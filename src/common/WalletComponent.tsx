import * as React from "react";
import { WalletExtended } from "../model/types";
import { DataRowComponent } from "./DataRowComponent";
import { ListComponent } from "./ListComponent";

import {formatMoney, formatTime} from '../App/formatters';

export type Props = {
    wallet: WalletExtended
};

export const WalletComponent = (props: Props) => {
    const {total, euros, minutes} = props.wallet;
    return <ListComponent>
            <DataRowComponent label="Credits">
                {total}
            </DataRowComponent>
            <DataRowComponent label="Money">
                {formatMoney(euros)}
            </DataRowComponent>
            <DataRowComponent label="Time">
                {formatTime(minutes)}
            </DataRowComponent>
        </ListComponent>

}