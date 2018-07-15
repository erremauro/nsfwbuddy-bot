const { SessionActionType } = require('./SessionActionType');

function createSessionAction(user) {
  return({
    type: SessionActionType.createSession,
    user
  });
}

//const createSession = data => dispatch => dispatch(createSessionAction(data));
const createSession = data => createSessionAction(data);

function updateSessionAction(id, data) {
  return({
    type: SessionActionType.updateSession,
    userId: id,
    data
  });
}

const updateSession = (id, data) => updateSessionAction(id, data);


function destroySessionAction(id) {
  return({
    type: SessionActionType.destroySession,
    userId: id
  });
}

const destroySession = (id, data) => destroySessionAction(id, data);

module.exports = {
  createSession,
  updateSession,
  destroySession
}
