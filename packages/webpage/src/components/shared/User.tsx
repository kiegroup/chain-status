import { Avatar, Button, Tooltip } from "antd";
import React from "react";
import { IUser } from "../../model/user.model";

interface IUserComponent {
  user?: IUser;
  size?: number;
}

export const UserComponent: React.FC<IUserComponent> = props => {
  return props.user ? (
    <Tooltip title={props.user.login}>
      <Button
        type="link"
        href={props.user.html_url}
        target="_blank"
        style={{ padding: 0 }}
      >
        <Avatar size={props.size ?? 24} src={props.user.avatar_url} />
      </Button>
    </Tooltip>
  ) : null;
};

export default UserComponent;
