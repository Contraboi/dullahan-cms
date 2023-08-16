import { Collections } from "../../pages/collection/Collections";
import { Route } from "react-router-dom";
import * as React from "react";
import { mainLinksData } from "../../../App";
import { Collection } from "../../pages/collection/Collection";
import { CreateCollectionEntry } from "../../pages/collection/collectionEntry/CreateCollectionEntry";
import { EditCollectionEntry } from "../../pages/collection/collectionEntry/EditCollectionEntry";

export const CollectionRoutes = () => {
  return (
    <>
      <Route path={mainLinksData.collections.path} element={<Collections />} />
      <Route
        path={mainLinksData.collections.path + "/:collectionHandle"}
        element={<Collection />}
      />
      <Route
        path={mainLinksData.collections.path + "/:collectionHandle" + "/create"}
        element={<CreateCollectionEntry />}
      />
      <Route
        path={
          mainLinksData.collections.path +
          "/:collectionHandle" +
          "/:collectionEntryId"
        }
        element={<EditCollectionEntry />}
      />
    </>
  );
};
