export declare abstract class UseCase<Request, Response> {
    abstract request: any;
    abstract response: any;
    abstract authorize(user: any): Promise<boolean>;
    abstract setup(ctx: any, injection: any): void;
    abstract steps(): Array<(ctx: any) => Promise<any>>;
    execute(req: Request, user: any, injection: any): Promise<Response>;
}
