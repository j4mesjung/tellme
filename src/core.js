import {List, Map} from 'immutable';

export function setEntries(state, entries){
  return state.set('entries', List(entries));
};

export function next(state){
  const entries = state.get('entries');
  // Returns a new Map resulting from merging the provided Iterables (or JS objects) into this Map
  return state.merge({
    // Returns a new Iterable of the same type which includes the first amount entries from this Iterable.
    vote: Map({pair: entries.take(2)}),
    // Returns a new Iterable of the same type which excludes the first amount entries from this Iterable.
    entries: entries.skip(2)
  });
};

export function vote(state, entry){

  // reach into the nested data structure path ['vote', 'tally', 'Trainspotting']
  // apply function found at keyPath
  // if there are no keys along the path, create new Maps and initialize with 0
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
};
