import { Menu, Tooltip, Typography } from "antd";
import React from "react";
import { IData } from "../../model/data.model";
import ProjectLink from "../shared/ProjectLink";

interface ICurrentStatusMenu {
  data: IData;
}
export const CurrentStatusMenu: React.FC<ICurrentStatusMenu> = props => {
  return (
    <>
      <Typography.Title
        level={4}
        style={{ marginLeft: 24, marginTop: 24, marginBottom: 24 }}
      >
        Repositories
      </Typography.Title>
      <Menu theme="light" mode="inline">
        {props.data.data
          .filter(e => e.name)
          .map(project => (
            <Menu.Item key={project.key}>
              <Tooltip title={project.key} placement="left">
                <ProjectLink project={project} />
              </Tooltip>
            </Menu.Item>
          ))}
      </Menu>
    </>
  );
};

export default CurrentStatusMenu;
