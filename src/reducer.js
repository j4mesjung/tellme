import {setEntries, next, vote, INITIAL_STATE} from './core';

// Reducer - a generic function that takes any kind of action - along with the current state - and invokes the core function that matches the action

// the Reducer should delegate to one of the core functions based on the action
// the Reducer should know how to unpack the additional arguments of each function from the action object
export default function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      // look for the vote key first, reducer breaks apart state to only give relevant part
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
  }
  return state;
};
