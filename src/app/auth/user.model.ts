export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExp: Date
    ) {}

    get token() {
        if (!this._token || this._tokenExp < new Date()) {
            return null;
        }

        return this._token;
    }
}