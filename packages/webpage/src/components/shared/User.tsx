import { Avatar, Button, Tooltip } from "antd";
import React from "react";
import { IUser } from "../../model/user.model";

interface IUserComponent {
  user?: IUser;
  size?: number;
  showName?: boolean;
  hiddeButton?: boolean;
}

export const UserComponent: React.FC<IUserComponent> = props => {
  const Content = (props: {
    showName?: boolean;
    user?: IUser;
    size?: number;
  }) => (
    <>
      <Avatar size={props.size ?? 24} src={props.user?.avatar_url} />
      {props.showName ? (
        <span style={{ marginLeft: 5, color: "#2d2d2d" }}>
          {props.user?.login}
        </span>
      ) : null}
    </>
  );
  return props.user ? (
    <Tooltip title={props.user.login}>
      {!props.hiddeButton ? (
        <Button
          type="link"
          href={props.user.html_url}
          target="_blank"
          style={{ padding: 0, margin: 0 }}
        >
          <Content
            showName={props.showName}
            user={props.user}
            size={props.size}
          />
        </Button>
      ) : (
        <Content
          showName={props.showName}
          user={props.user}
          size={props.size}
        />
      )}
    </Tooltip>
  ) : null;
};

export default UserComponent;
