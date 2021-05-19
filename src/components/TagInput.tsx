import {
  Flex,
  Input,
  List,
  ListItem,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { NextPage } from "next";
import React, { useState } from "react";
import { TagList } from "./TagList";

interface Props {
  registeredTags: string[];
  addedTags: string[];
  setAddedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: NextPage<Props> = ({
  registeredTags,
  addedTags,
  setAddedTags,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      setAddedTags((prev) => [...new Set([...prev, currentTag])]);
      setCurrentTag("");
    }
  };

  const handleSelectTag = (selectedTag: string) => {
    setAddedTags((prev) => [...new Set([...prev, selectedTag])]);
    setCurrentTag("");
    setSuggestedTags([]);
  };

  const handleDeleteTag = (tag: string) => {
    setAddedTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      console.log(e.target.value);
      setSuggestedTags(matchSorter(registeredTags, e.target.value).slice(0, 5));
    } else {
      setSuggestedTags([]);
    }
    setCurrentTag(e.target.value);
  };

  return (
    <>
      <Text>タグ検索</Text>
      <Input
        variant="flushed"
        placeholder="タグを入力..."
        size="md"
        mb={5}
        value={currentTag}
        onChange={handleChangeTag}
        onKeyPress={handleAddTag}
        maxLength={30}
      />

      <TagList tags={addedTags} handleDelete={handleDeleteTag} />
      {suggestedTags.length > 0 && (
        <List
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          mt={2}
        >
          {suggestedTags.map((tag) => (
            <ListItem
              _hover={{ bg: bgColor[colorMode] }}
              key={tag}
              my={1}
              p={2}
              cursor="pointer"
              data-testid="create-option"
              onClick={() => handleSelectTag(tag)}
            >
              <Flex align="center">{tag}</Flex>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};
