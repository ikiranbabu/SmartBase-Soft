export class Resource {
    constructor(
        public id?: number,
        public url?: string,
        public name?: string,
        public requestMethod?: string,
        public permissionId?: number,
    ) {
    }
}
