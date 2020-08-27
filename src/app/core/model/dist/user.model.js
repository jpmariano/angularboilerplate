"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(uid, name, username, status, verrified, vkey, created, changed, access, login, mid, manageUsers, user_roles, user_meta) {
        this.uid = uid;
        this.name = name;
        this.username = username;
        this.status = status;
        this.verrified = verrified;
        this.vkey = vkey;
        this.created = created;
        this.changed = changed;
        this.access = access;
        this.login = login;
        this.mid = mid;
        this.manageUsers = manageUsers;
        this.user_roles = user_roles;
        this.user_meta = user_meta;
    }
    return User;
}());
exports.User = User;
