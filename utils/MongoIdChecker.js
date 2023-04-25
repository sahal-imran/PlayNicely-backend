const ObjectId = require("mongoose").Types.ObjectId;
function MongoIdChecker(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

module.exports = MongoIdChecker;
