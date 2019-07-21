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

    const cardClass = 'bg-blue-800 p-5 rounded mt-4 shadow-lg';

    return <div className="px-2 bg-grey-400 h-screen py-4">
        <div className={cardClass}>
            <div className='text-3xl mb-10 text-blue-100'>
                {dateFormatted}
            </div>

            <CheckboxesComponent status={result} />
        </div>


        <div className={cardClass}>
            <div className='text-3xl text-blue-100'>
                <div>
                    Current Streak: <div className='text-white-100'>2</div>
                </div>
                <div>
                    Next Ok is Worth

                    <div className='text-white-100'> 0.10€ or 10 mins</div>
                </div>
            </div>
        </div>
        <div className={cardClass}>
            <TotalsComponent wallet={wallet} />
        </div>
    </div>;
}

