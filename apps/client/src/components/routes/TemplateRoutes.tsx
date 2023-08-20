import { mainLinksData } from "../../../App";
import { Route } from "react-router-dom";
import { Templates } from "../../pages/template/Templates";
import { Template } from "../../pages/template/Template";
import { Collections } from "../../pages/collection/Collections";
import { Collection } from "../../pages/collection/Collection";
import { CreateCollectionEntry } from "../../pages/collection/collectionEntry/CreateCollectionEntry";
import { EditCollectionEntry } from "../../pages/collection/collectionEntry/EditCollectionEntry";
import * as React from "react";

type TemplateRoutesProps = {};

export const templateRoutes = [
  <Route path={mainLinksData.templates.path} element={<Templates />} />,
  <Route
    path={mainLinksData.templates.path + "/:templateHandle"}
    element={<Template />}
  />,
];

export const collectionRoutes = [
  <Route path={mainLinksData.collections.path} element={<Collections />} />,
  <Route
    path={mainLinksData.collections.path + "/:collectionHandle"}
    element={<Collection />}
  />,
  <Route
    path={mainLinksData.collections.path + "/:collectionHandle" + "/create"}
    element={<CreateCollectionEntry />}
  />,
  <Route
    path={
      mainLinksData.collections.path +
      "/:collectionHandle" +
      "/:collectionEntryId"
    }
    element={<EditCollectionEntry />}
  />,
];
