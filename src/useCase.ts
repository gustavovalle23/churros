export abstract class UseCase<Request, Response> {
  abstract request: any;
  abstract response: any;

  abstract authorize(user: any): Promise<boolean>;
  abstract setup(ctx: any, injection: any): void;
  abstract steps(): Array<(ctx: any) => Promise<any>>;

  async execute(req: Request, user: any, injection: any): Promise<Response> {
    const ctx: any = { req, user, ret: null };

    if (!await this.authorize(user)) {
      throw new Error('Unauthorized');
    }

    this.setup(ctx, injection);

    for (const step of this.steps()) {
      const result = await step(ctx);
      if (result instanceof Error) {
        throw result;
      }
    }

    return ctx.ret;
  }
}
