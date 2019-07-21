import { DateTime } from 'luxon';
import * as React from 'react';

import { DayDataExtended, WalletExtended } from '../model/types';
import { CheckboxesComponent } from './CheckboxesComponent';
import { TotalsComponent } from './TotalsComponent';

export type DashboardProps = {
    wallet: WalletExtended;
    day: DayDataExtended;
};

export const DashboardComponent = (props: DashboardProps) => {
    const { day: {
        dateFormatted,
        result
    }, wallet
    } = props;


    return <div className="px-2 bg-grey-400 h-screen">
        <div className='bg-blue-800 p-5 rounded mt-4'>
            <div className='text-5xl mb-10 text-blue-100'>
                {dateFormatted}
            </div>

            <CheckboxesComponent status={result} />
        </div>


        <div className='bg-blue-800 p-5 rounded mt-4'>
            <div className='text-3xl text-blue-100'>
                <div>
                    Current Streak: 2
                </div>
                <div>
                    Next Ok is Worth

                    <div> 0.10€ or 10 mins</div>
                </div>
            </div>
        </div>
        <div className='bg-blue-800 p-5 rounded mt-4'>
            <TotalsComponent wallet={wallet} />
        </div>
    </div>;
}

