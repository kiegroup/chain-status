import { Avatar, Button, Tooltip } from "antd";
import React, { Suspense } from "react";
import { IUser } from "../../model/user.model";
import Loading from "./Loading";

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
        <Suspense fallback={<Loading size={props.size ?? 24} />}>
          <Avatar size={props.size ?? 24} src={props.user.avatar_url} />
        </Suspense>
      </Button>
    </Tooltip>
  ) : null;
};

export default UserComponent;
