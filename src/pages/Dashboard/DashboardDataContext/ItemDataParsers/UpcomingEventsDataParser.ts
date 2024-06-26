import dayjs from "dayjs";
import type { OverrideProperties } from "type-fest";
import type {
  ItemDataParser,
  DataParserItem,
  DataParserAccum,
  DataParserAccumUpdater,
} from "./ItemDataParser.js";

export type UpcomingEvent = {
  eventLabel: string;
  eventDate: Date;
};

export type ItemWithUpcomingEvent<TItem extends DataParserItem> = TItem & UpcomingEvent;

export interface UpcomingEventsDataParserAccum<TItem extends DataParserItem>
  extends DataParserAccum {
  UPCOMING_EVENTS: Array<ItemWithUpcomingEvent<TItem>>;
}

export type GetItemEventsFn<TItem> = (
  item: TItem
) => Array<OverrideProperties<UpcomingEvent, { eventDate: Date | null | undefined }>>;

/**
 * This `ItemDataParser` subclass is used to aggregate `UpcomingEvent` data for "events"
 * like due dates which will occur between now and the `timeHorizon` (default: 7 days).
 */
export class UpcomingEventsDataParser<TItem extends DataParserItem>
  implements ItemDataParser<TItem, UpcomingEventsDataParserAccum<TItem>>
{
  private static now = dayjs();

  initialDataAccum: UpcomingEventsDataParserAccum<TItem>;
  dataAccumUpdater: DataParserAccumUpdater<TItem, UpcomingEventsDataParserAccum<TItem>>;

  constructor(
    getItemEvents: GetItemEventsFn<TItem>,
    timeHorizon: dayjs.Dayjs = UpcomingEventsDataParser.now.add(7, "days")
  ) {
    this.initialDataAccum = {
      UPCOMING_EVENTS: [],
    };

    this.dataAccumUpdater = (dataReducerAccum, item) => {
      // Pass each item to the `getItemEvents` function to get an array of `UpcomingEvent`s
      getItemEvents(item).forEach(({ eventLabel, eventDate }) => {
        if (
          eventDate instanceof Date &&
          dayjs(eventDate).isBetween(UpcomingEventsDataParser.now, timeHorizon)
        ) {
          dataReducerAccum.UPCOMING_EVENTS.push({ ...item, eventLabel, eventDate });
        }
      });

      return dataReducerAccum;
    };
  }
}
