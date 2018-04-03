import {setStartDate,setEndDate,setTextFilter,sortByAmount,sortByDate} from '../../actions/filters';
import moment from 'moment';

test('Should generate set start date aciton object',()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});


test('Should generate set end date aciton object',()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('Should generate filter action object with value',()=>{
    const action = setTextFilter('water');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'water'
    });
});

test('Should generate filter action object with no value',()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('Should generate action object sortByAmount ',()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('Should generate action object sortByDate ',()=>{
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});


