"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("../common/constants");
const parse_mongo_id_pipe_1 = require("../common/pipes/parse-mongo-id.pipe");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(userDTO) {
        return this.userService.create(userDTO);
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        try {
            return this.userService.findOne(id);
        }
        catch (e) {
            throw e;
        }
    }
    update(payload) {
        return this.userService.update(payload.id, payload.userDTO);
    }
    delete(id) {
        return this.userService.remove(id);
    }
    async validateUser(payload) {
        const user = await this.userService.findByUsername(payload.username);
        const isValidPassword = await this.userService.checkPassword(payload.password, user.password);
        if (user && isValidPassword)
            return user;
        return null;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.FIND_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.FIND_ONE),
    __param(0, (0, microservices_1.Payload)(new parse_mongo_id_pipe_1.ParseMongoIdPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.UPDATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.DELETE),
    __param(0, (0, microservices_1.Payload)('id', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
__decorate([
    (0, microservices_1.MessagePattern)(constants_1.UserMsg.VALID_USER),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map