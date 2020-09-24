import { IRouter, Router } from "express";

export interface BaseRouterInterface {
  routes(): void;
}

abstract class BaseRouter implements BaseRouterInterface {
  public router: IRouter;
  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}

export default BaseRouter;
