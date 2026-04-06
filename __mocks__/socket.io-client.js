// __mocks__/socket.io-client.js
module.exports = function () {
  const handlers = {};
  return {
    on: (event, cb) => {
      handlers[event] = handlers[event] || [];
      handlers[event].push(cb);
    },
    off: (event, cb) => {
      if (!handlers[event]) return;
      if (!cb) { handlers[event] = []; return; }
      handlers[event] = handlers[event].filter(fn => fn !== cb);
    },
    emit: (event, ...args) => {
      (handlers[event] || []).forEach(fn => {
        try { fn(...args); } catch (e) {}
      });
    },
    disconnect: () => {},
    close: () => {},
  };
};
