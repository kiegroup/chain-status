import { Menu, Tooltip, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import ProjectLink from "../shared/ProjectLink";

interface ICurrentStatusMenu {}
export const CurrentStatusMenu: React.FC<ICurrentStatusMenu> = props => {
  const data = useSelector((store: IRootState) => store.data.data);

  return (
    <>
      <Typography.Title
        level={4}
        style={{ marginLeft: 24, marginTop: 24, marginBottom: 24 }}
      >
        Repositories
      </Typography.Title>
      <Menu theme="light" mode="inline">
        {data.projects
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
