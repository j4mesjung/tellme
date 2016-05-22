import {List, Map} from 'immutable';

export function setEntries(state, entries){
  return state.set('entries', List(entries));
};

function getWinners(vote){
  if(!vote) return [];
  const [a,b] = vote.get('pair');
  // Returns the value found by following a path of keys or indices through nested Iterables.
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes) return [a];
  else if (aVotes < bVotes) return [b];
  else                      return [a,b];
}

export function next(state){
  // returns a new Entries list with winners concatted at the end
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));

  // if there is only one entry left, that is the winner
  if (entries.size === 1){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    // Returns a new Map resulting from merging the provided Iterables (or JS objects) into this Map
    return state.merge({
      // Returns a new Iterable of the same type which includes the first amount entries from this Iterable.
      vote: Map({pair: entries.take(2)}),
      // Returns a new Iterable of the same type which excludes the first amount entries from this Iterable.
      entries: entries.skip(2)
    });
  };
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
