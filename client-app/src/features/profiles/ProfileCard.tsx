import React from "react";
import { Profiles } from "../../app/models/profiles";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profiles;
}

export default observer(function Profile({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followersCount} followers
      </Card.Content>
      <Card.Content extra>
        <FollowButton profile={profile} />
      </Card.Content>
    </Card>
  );
});
