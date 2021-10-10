import React from "react";
import { Profiles } from "../../app/models/profiles";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";

interface Props {
  profile: Profiles;
}

export default observer(function Profile({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        20 followers
      </Card.Content>
    </Card>
  );
});
