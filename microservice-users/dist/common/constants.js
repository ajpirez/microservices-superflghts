"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMsg = exports.RabbitMQ = void 0;
var RabbitMQ;
(function (RabbitMQ) {
    RabbitMQ["UserQueue"] = "users";
})(RabbitMQ = exports.RabbitMQ || (exports.RabbitMQ = {}));
var UserMsg;
(function (UserMsg) {
    UserMsg["CREATE"] = "CREATE_USER";
    UserMsg["FIND_ALL"] = "FIND_USERS";
    UserMsg["FIND_ONE"] = "FIND_USER";
    UserMsg["UPDATE"] = "UPDATE_USER";
    UserMsg["DELETE"] = "DELETE_USER";
    UserMsg["VALID_USER"] = "VALID_USER";
})(UserMsg = exports.UserMsg || (exports.UserMsg = {}));
//# sourceMappingURL=constants.js.map