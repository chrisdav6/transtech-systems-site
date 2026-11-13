const { format } = require('util');

module.exports = function flashMessages(options = {}) {
  const safe = options.unsafe === undefined ? true : !options.unsafe;

  return function (req, res, next) {
    if (req.flash && safe) {
      return next();
    }

    req.flash = function (type, msg) {
      if (!req.session) {
        throw new Error('req.flash() requires sessions');
      }

      const messages = (req.session.flash = req.session.flash || {});

      if (type && msg) {
        if (arguments.length > 2) {
          const args = Array.prototype.slice.call(arguments, 1);
          msg = format.apply(undefined, args);
        } else if (Array.isArray(msg)) {
          msg.forEach((value) => {
            (messages[type] = messages[type] || []).push(value);
          });

          return messages[type].length;
        }

        return (messages[type] = messages[type] || []).push(msg);
      }

      if (type) {
        const queued = messages[type];
        delete messages[type];
        return queued || [];
      }

      req.session.flash = {};
      return messages;
    };

    next();
  };
};
