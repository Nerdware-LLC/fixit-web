import dayjs from "dayjs";
import MuiAvatar from "@mui/material/Avatar";
import Text from "@mui/material/Typography";
import ClockDottedOutlineIcon from "@mui/icons-material/HistoryToggleOffRounded";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import CalendarDateIcon from "@mui/icons-material/InsertInvitation";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import UpdateIcon from "@mui/icons-material/Update";
import { Timeline } from "./Timeline.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Timeline/Timeline",
  component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    events: [
      {
        timestamp: new Date("10/10/2020"),
        icon: <NoteAddIcon />,
        eventInfoContent: (
          <>
            <MuiAvatar src="https://freesvg.org/img/Linux-Avatar.png" />
            <Text>Demo event with arbitrary JSX content</Text>
          </>
        ),
      },
      {
        timestamp: dayjs().subtract(1, "hour").toDate(),
        eventInfoContent: `Demo "complete/inactive" event with blue highlight`,
        icon: <UpdateIcon />,
      },
      {
        timestamp: new Date(),
        eventInfoContent: `Demo "in progress" event with green highlight`,
        icon: <ClockDottedOutlineIcon />,
        iconHighlight: "green",
      },
      {
        timestamp: dayjs().subtract(5, "days").toDate(),
        eventInfoContent: `Demo "past due" event with red highlight`,
        icon: <CalendarDateIcon />,
        iconHighlight: "red",
      },
      {
        timestamp: dayjs().add(5, "days").toDate(),
        eventInfoContent: `Demo "upcoming" event with yellow highlight`,
        icon: <HomeRepairServiceIcon />,
        iconHighlight: "yellow",
      },
    ],
  },
} satisfies Story;
