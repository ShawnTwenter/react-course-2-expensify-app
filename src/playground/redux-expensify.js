import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';
// ADD_EXPENSE
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0 , 
        createAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createAt
    }
});
// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE

const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates,
})

// SET_TEXT_FILETER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_Date'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});
// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                return expense;
            });
        default: 
            return state;
    }
};

// Filters Reducer
// text => '', sortBy = 'date', startDate => undefined, endDate => undefined

const filtersReducerDefaultState = {

    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDte: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) =>{
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
        };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_Date':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default: 
            return state;
    }
};



// Get Visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate;
        const endDatematch = typeof endDate !== 'number' || expense.createAt <= startDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDatematch && textMatch;
    }).sort((a, b)=>{
        if (sortBy === 'date') {
            return a.createAt < b.createAt ? 1 : -1;
        }
        else if (sortBy === 'amount') {
            return a.amount > b.amount ? 1 : -1;
        }

    });
};

// Store createion

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const e1 = store.dispatch(addExpense({description: 'Rent', amount: 100, createAt: 1000}));

const e2 = store.dispatch(addExpense({description: 'Coffe', amount: 300, createAt: -1000}));


// store.dispatch(removeExpense({id: e1.expense.id}));
// store.dispatch(editExpense(e2.expense.id, {amount:500}));

 //store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());


// store.dispatch(sortByAmount());
 store.dispatch(sortByDate());

//tore.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250))


const demoState = {
    expenses: [
        {
            id: 'pijasdfwer',
            description: 'January Rent',
            note: 'this was the final payment for that address',
            amount: 54500,
            createAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDte: undefined
    }
}