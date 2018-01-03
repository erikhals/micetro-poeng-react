import React from 'react';
import PropTypes from 'prop-types'

const Elimination = ({players}) => (
  <div>Elimination {players} <button>Alle videre</button><button>Eliminer!</button></div>
);

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Elimination;
