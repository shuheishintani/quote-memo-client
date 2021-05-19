import {
  Tag as ChakraTag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  tags: string[];
  handleDelete?: (tag: string) => void;
  setAddedTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagList: React.VFC<Props> = ({
  tags,
  handleDelete,
  setAddedTags,
}) => {
  return (
    <>
      <Wrap spacing={4}>
        {tags.map((tag) => (
          <WrapItem key={tag}>
            <ChakraTag
              borderRadius="full"
              variant="solid"
              colorScheme="gray"
              cursor={setAddedTags ? "pointer" : ""}
              onClick={() => {
                if (setAddedTags) {
                  setAddedTags((prev) => [...prev, tag]);
                }
              }}
            >
              <TagLabel>#{tag}</TagLabel>
              {handleDelete && (
                <TagCloseButton onClick={() => handleDelete(tag)} />
              )}
            </ChakraTag>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
