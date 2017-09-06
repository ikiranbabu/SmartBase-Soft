import { Resource } from "../resource/resource.model";
export class Permission {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public resourceId?: number,
        public roleId?: number,
        public permissionGroupId?: number,
        public resources?: Resource[]
    ) {
    }
}
