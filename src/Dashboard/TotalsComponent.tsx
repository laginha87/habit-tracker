import * as React from "react";
import { WalletExtended } from "../model/types";
import { ButtonComponent } from "./ButtonComponent";
import { DataRowComponent } from "./DataRowComponent";
import { ListComponent } from "./ListComponent";

export type Props = {
    wallet: WalletExtended
};

export const TotalsComponent = (props: Props) => {
    return <div>

        <ListComponent>
            <DataRowComponent label="Credits">
                {props.wallet.total}
            </DataRowComponent>

            <DataRowComponent label="Money">
                {props.wallet.euros} €
            </DataRowComponent>

            <DataRowComponent label="Time">
                {props.wallet.minutes} mins
            </DataRowComponent>
        </ListComponent>
        <div className='w-full'>
            <div>
                <ButtonComponent style='primary-outline' size="large">
                    SPEND
            </ButtonComponent>
            </div>
        </div>
    </div>

}