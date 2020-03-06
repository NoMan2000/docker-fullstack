import * as React from 'react';
import {axios} from './ts/axios';
import {FibState} from './state/FibState';

export const Fib = () => {
    const {
        fetchIndexes,
        fetchValues,
        values,
        updateIndex,
        seenIndexes,
        index
    } = FibState();
    const [submitting, updateSubmitted] = React.useState(false);

    React.useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [submitting]);

    const onSubmit = async (e: React.FormEvent) => {
        updateSubmitted(true);
        e.preventDefault();
        await axios.post('/api/values', {
            index
        });
        updateIndex('');
        updateSubmitted(false);
    };

    const onChangeIndex = (e: React.ChangeEvent) => {
        const target = e.target as unknown as HTMLInputElement;
        const {value} = target;
        updateIndex(value);
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map((value) => {
            debugger;
            return value;
        }).join(', ');
    };

    const renderValues = () => {
        const entries =[];
        for (let key in values) {
            entries.push(
            <div key={key}>
                For index {key} I calculated value {values[key]}
            </div> )
        }
        return entries;
    };

    return (
        <section className="fib">
            <form onSubmit={onSubmit} action="#" className="form">
                <label htmlFor="index" className="label">Enter your index:</label>
                <input onChange={onChangeIndex} id='index' name='index' type="text" value={index}/>
            </form>
            <h3 className="announcement">Indexes I have seen</h3>
             <div className="indexes">{renderSeenIndexes()}</div>
             <h3 className="calculated">
                 Calculated Values
             </h3>
             <div className="values">
                 {renderValues()}
             </div>
             <button onClick={onSubmit} className="button btn" type="submit">Submit Index</button>
        </section>
    )
};