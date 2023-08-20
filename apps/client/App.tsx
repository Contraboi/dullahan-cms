import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Collections } from "./src/pages/collection/Collections";
import { Home } from "./src/pages/Home";
import { Templates } from "./src/pages/template/Templates";
import { Collection } from "./src/pages/collection/Collection";
import LeftNavbar from "./src/components/dashboard/leftNavbar/LeftNavbar";
import {
  IconTemplate,
  IconArticle,
  IconComponents,
  IconHome2,
  IconPictureInPicture,
} from "@tabler/icons";
import { Template } from "./src/pages/template/Template";
import { CreateCollectionEntry } from "./src/pages/collection/collectionEntry/CreateCollectionEntry";
import { EditCollectionEntry } from "./src/pages/collection/collectionEntry/EditCollectionEntry";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { Assets } from "./src/pages/assets/Assets";
import { Components } from "./src/pages/component/Components";
import { Component } from "./src/pages/component/Component";

type MainLinksDataType = {
  icon: any;
  label: string;
  path: string;
};

export const mainLinksData: { [key: string]: MainLinksDataType } = {
  home: { icon: IconHome2, label: "Home", path: "/home" },
  collections: {
    icon: IconArticle,
    label: "Collections",
    path: "/collections",
  },
  components: {
    icon: IconComponents,
    label: "Components",
    path: "/components",
  },
  templates: {
    icon: IconTemplate,
    label: "Templates",
    path: "/templates",
  },
  assets: { icon: IconPictureInPicture, label: "Assets", path: "/assets" },
};

export const App = () => {
  console.log("window.location.host", window.location.host);
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: " http://172.17.0.228:4000/" + "trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{
            fontFamily: "Poppins, sans-serif",
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Router>
            <div style={{ display: "flex" }}>
              <LeftNavbar />
              <Routes>
                <Route path={"/home"} element={<Home />} />
                <Route
                  path={mainLinksData.collections.path}
                  element={<Collections />}
                />
                <Route
                  path={mainLinksData.collections.path + "/:collectionHandle"}
                  element={<Collection />}
                />
                <Route
                  path={
                    mainLinksData.collections.path +
                    "/:collectionHandle" +
                    "/create"
                  }
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
                <Route
                  path={mainLinksData.templates.path}
                  element={<Templates />}
                />
                <Route
                  path={mainLinksData.templates.path + "/:templateHandle"}
                  element={<Template />}
                />
                <Route path={mainLinksData.assets.path} element={<Assets />} />
                <Route
                  path={mainLinksData.components.path}
                  element={<Components />}
                />
                <Route
                  path={mainLinksData.components.path + "/:componentHandle"}
                  element={<Component />}
                />
              </Routes>
            </div>
          </Router>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
