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


    return <div>
        <div>
            <i className="fas fa-chevron-left"></i>
            {dateFormatted}
        </div>

        <CheckboxesComponent status={result} />

        <hr className="h-px bg-green-800" />
        <TotalsComponent wallet={wallet} />
    </div>;
}

