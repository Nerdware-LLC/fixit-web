import { faker } from "@faker-js/faker/locale/en_US";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { VirtualizedList } from "./VirtualizedList";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/List/VirtualizedList",
  component: VirtualizedList,
  args: {
    overscan: 30,
    style: {
      height: "clamp(15rem, 90vh, 30rem)",
      width: "320px",
      border: "1px solid rgba(100,100,100,0.5)",
      borderRadius: "0.5rem",
    },
  },
} satisfies Meta<typeof VirtualizedList>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

interface FakeUserItem {
  username: string;
  photoURL: string;
  bio: string;
}

/**
 * An array of 100 random fake user-items for VirtualizedList stories.
 */
const LIST_STORY_ITEMS = Array.from({ length: 100 }).map(() => ({
  username: faker.internet.userName(),
  photoURL: faker.image.avatar(),
  bio: faker.person.bio(),
}));

const ListStoryItem = ({ username, photoURL, bio }: FakeUserItem) => (
  <ListItem divider>
    <ListItemAvatar>
      <Avatar src={photoURL} alt={`Avatar for fake user ${username}`} />
    </ListItemAvatar>
    <ListItemText primary={username} secondary={bio} />
  </ListItem>
);

export const BasicDemo100Items = {
  args: {
    totalCount: LIST_STORY_ITEMS.length,
    itemContent: (index) => <ListStoryItem {...LIST_STORY_ITEMS[index]} />,
  },
} satisfies Story;

export const Empty = {
  args: {
    totalCount: 0,
    componentProps: {
      EmptyPlaceholder: {
        text: "No Demo Items",
        tooltip: "This demo EmptyPlaceholder is awesome 👍",
        backgroundIcon: <PersonSearchIcon />,
      },
    },
  },
} satisfies Story;
