export class Client {
    symbol: string | null = null;
    private emit: (eventName: string, data: string) => any;
    session: string;

    constructor(emit: (eventName: string, data: string) => any, session: string){
        this.emit = emit;
        this.session = session;
    }

    public send(type: string, data: string) {
        this.emit(type, data);
    }
}