import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAtendee from "./ActivityListItemAtendee";

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancell && (
          <Label
            color="red"
            content="Activity Cancelled"
            style={{ textAlign: "center" }}
            attached="top"
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src={activity.host?.image || "/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}{" "}
              </Item.Header>
              <Item.Description>
                Hosted By{" "}
                <Link to={`/profiles/${activity.hostUsername}`}>
                  {" "}
                  {activity.host?.displayName}{" "}
                </Link>
              </Item.Description>

              {activity.isHost && (
                <Item.Description>
                  <Label basic color="orange">
                    Youre hosting this activity
                  </Label>
                </Item.Description>
              )}
              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color="green">
                    Youre going this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MM yyyy h:mm aa")}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAtendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
