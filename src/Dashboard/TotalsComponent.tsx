import * as React from "react";
import { WalletExtended } from "../model/types";
import { ButtonComponent } from "./ButtonComponent";

export type Props = {
    wallet: WalletExtended
};

export const TotalsComponent = (props: Props) => {
    return <div>
        <div className="text-4xl text-blue-100">Wallet</div>

        <div className="flex text-3xl justify-content text-blue-100">
            <div className='w-1/2'>
                <div className='text-white-100'>{props.wallet.euros} €</div>
                <div className='text-white-100'>{props.wallet.minutes} mins</div>
            </div>
            <div className='w-1/2'>
                <div>
                    <ButtonComponent style='primary-outline' size="large">
                        SPEND
                </ButtonComponent>
                </div>
            </div>
        </div>
    </div>

}