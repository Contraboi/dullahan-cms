import * as React from "react";
import { Layout } from "../components/Layout";
import { Text } from "@mantine/core";
import { View } from "../components/View";
import { mainLinksData } from "../../App";

export const Home = () => {
  return (
    <Layout title={"Home"}>
      <View title={mainLinksData.home.label}>
        <Text size={"xl"}>Welcome to my custom CMS</Text>
        <Text size={"md"}>Let's try to make this actually good :)</Text>
      </View>
    </Layout>
  );
};
