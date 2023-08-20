"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const collection_1 = require("./collection");
const template_1 = require("./template");
const component_1 = require("./component");
const assets_1 = require("./assets");
exports.appRouter = (0, trpc_1.router)({
    collection: collection_1.collectionRouter,
    template: template_1.templateRouter,
    assets: assets_1.assetsRouter,
    component: component_1.componentRouter,
});
