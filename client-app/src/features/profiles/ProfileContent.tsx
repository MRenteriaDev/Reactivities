import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profiles } from "../../app/models/profiles";
import ProfileAbout from "./ProfileAbout";
import ProfileActivities from "./ProfileActivities";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: Profiles;
}

export default observer(function ProfileContent({ profile }: Props) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <Tab.Pane>
          {" "}
          <ProfileAbout />{" "}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Photos",
      render: () => <ProfilePhotos profile={profile} />,
    },
    {
      menuItem: "Events",
      render: () => (
        <Tab.Pane>
          {" "}
          <ProfileActivities />{" "}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});