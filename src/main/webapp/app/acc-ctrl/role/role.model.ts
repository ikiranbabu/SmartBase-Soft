import { Permission } from "../permission/permission.model";
export class Role {
    constructor(
        public id?: number,
        public name?: string,
        public permissionId?: number,
        public permissions?: Permission[]
    ) {
    }
}
