import * as React from "react";
import { WalletExtended } from "../model/types";

export type Props = {
    wallet: WalletExtended
};

export const TotalsComponent = (props : Props) => {
    return <div className="flex">
        <div>
            <div>{props.wallet.euros} €</div>
            <div>{props.wallet.minutes} mins</div>
        </div>
        <div>
            <div className="rounded-sm bg-green-400 border-2 border-green-600">
                Spend
            </div>
        </div>
    </div>
}