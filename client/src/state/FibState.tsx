import * as React from 'react';
import { axios } from './../ts/axios';

export type Props = {
    seenIndexes: number[],
    values: { [key: string]: string },
    index: string,
};

export const FibState = (props: Props = { seenIndexes: [], values: {}, index: '' }) => {
    const [seenIndexes, updateSeenIndexes] = React.useState(props.seenIndexes || []);
    const [values, updateValues] = React.useState(props.values || {});
    const [index, updateIndex] = React.useState(props.index || '');

    const fetchValues = async () => {
        const { data } = await axios.get('/api/values/current');
        debugger;
        updateValues(data);
    };

    const fetchIndexes = async () => {
        const { data } = await axios.get('/api/values/all');
        debugger;
        updateSeenIndexes(data);
    };
    return {
        seenIndexes,
        updateSeenIndexes,
        values,
        updateValues,
        index,
        updateIndex,
        fetchValues,
        fetchIndexes
    };
};