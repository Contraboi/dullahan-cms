import create from "zustand";
import {
  CollectionEntryType,
  CollectionEntryContent,
} from "../../server/src/interfaces/CMS";

type UseCollectionEntryProps = {
  collectionEntry: CollectionEntryType | undefined;
  setCollectionEntry: (collectionEntry: CollectionEntryType) => void;
  collectionContent: CollectionEntryContent | undefined;
  setCollectionContent: (
    collectionContent: CollectionEntryContent | undefined
  ) => void;
};

export const useCollectionEntryStore = create<UseCollectionEntryProps>(
  (set) => ({
    collectionEntry: undefined,
    setCollectionEntry: (collectionEntry) => set({ collectionEntry }),
    collectionContent: {},
    setCollectionContent: (collectionContent) => set({ collectionContent }),
  })
);
