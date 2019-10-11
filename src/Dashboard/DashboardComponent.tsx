import * as React from 'react';

import { DayResult } from '../model/types';
import { CheckboxesComponent } from './CheckboxesComponent';
import { WalletComponent } from '../common/WalletComponent';
import { SectionComponent } from '../common/SectionComponent';
import { DataRowComponent } from '../common/DataRowComponent';
import { ListComponent } from '../common/ListComponent';
import { DateTime, Duration } from 'luxon';
import { ButtonComponent } from '../common/ButtonComponent';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getDate, getDateFormatted, getResultForDay, getChain, getLevel, getLevelChain, getWalletExtended } from '../App/selectors';
import { removeDayActivity, setDayActivityAction, setDayAction } from '../App';

export const DashboardComponent = (props) => {
    const date = useSelector(getDate);
    const dateFormatted = useSelector(getDateFormatted);
    const result = useSelector(getResultForDay);
    const chain = useSelector(getChain);
    const level = useSelector(getLevel);
    const levelChain = useSelector(getLevelChain);
    const wallet = useSelector(getWalletExtended);

    const dispatch = useDispatch();

    const setDayBad = React.useCallback((day: DateTime, currentStatus : DayResult) => {
        if(currentStatus == 'bad') {
            dispatch(removeDayActivity(day))
        } else {
            dispatch(setDayActivityAction(day, "bad"))
        }
    }, [dispatch, removeDayActivity, setDayActivityAction]);

    const setDayGood = React.useCallback((day: DateTime, currentStatus : DayResult) => {
        if(currentStatus == 'good') {
            dispatch(removeDayActivity(day))
        } else {
            dispatch(setDayActivityAction(day, "good"))
        }
    }, [dispatch, removeDayActivity, setDayActivityAction]);

    const changeDay = React.useCallback((day: DateTime) => dispatch(setDayAction(day)), [dispatch, setDayAction])


    return <div className="px-2 h-screen py-4 w-screen overflow-scroll" style={{ background: 'linear-gradient(0deg, rgba(39,87,138,1) 0%, rgba(30,91,172,1) 53%, rgba(50,50,179,1) 93%)' }}>
        <div className='flex mb-10 items-center'>
            <div className='w-8'> <ButtonComponent style="clean" action={() => changeDay(date.minus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-left"></i></ButtonComponent></div>
            <div className='text-2xl text-blue-100 flex-grow text-center' onClick={() => location.reload()}>
                {dateFormatted}
            </div>
            { date.diffNow('days').days <= -1 ?  <div className='w-8'> <ButtonComponent style="clean" action={() => changeDay(date.plus(Duration.fromObject({ days: 1 })))}><i className="fa fa-chevron-right"></i></ButtonComponent></div> : <div className='w-8'/>}
        </div>

        <div className='mb-2'>
            <CheckboxesComponent status={result} setDayBad={() => setDayBad(date, result)} setDayGood={() => setDayGood(date, result)} />
        </div>

        <SectionComponent title="Activity">

            <ListComponent>
                <DataRowComponent label="Current Streak">
                    {chain}
                </DataRowComponent>
                <DataRowComponent label="Level">
                    {level}
                </DataRowComponent>
                <DataRowComponent label="To Next Level">
                    {level - levelChain}
                </DataRowComponent>
                <DataRowComponent label="Next Ok">
                    {level} credits
                </DataRowComponent>
            </ListComponent>
        </SectionComponent>
        <SectionComponent title="wallet">
            <WalletComponent wallet={wallet} />
            <div className="mb-20" />

            <div className='absolute w-full flex justify-end' style={{bottom: 15, right: 15}}>
                <Link to={{pathname: "/spend", state:{ duration:{ enter: 1000, exit: 1000 }, transition:"slide-in"} }} className='text-xl rounded-full bg-white-100 shadow-lg text-blue-500 w-10 h-10 flex justify-center items-center'> + </Link>
            </div>
        </SectionComponent>
    </div>;
    }

