import { Menu, Tooltip } from "antd";
import React from "react";
import { IData } from "../../model/data.model";
import { getProjectKey } from "../../utils/pullrequest.utils";

interface ICurrentStatusMenu {
  data: IData;
}
export const CurrentStatusMenu: React.FC<ICurrentStatusMenu> = props => {
  return (
    <Menu theme="light" mode="inline">
      {props.data.data
        .filter(e => e.name)
        .map(project => (
          <Menu.Item>
            <Tooltip title={project.key} placement="left">
              <a
                href={`#${getProjectKey(project)}`}
                rel="noopener noreferrer"
                onClick={e => {
                  e.preventDefault();
                  document
                    ?.querySelector(`#${getProjectKey(project)}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {project.name}
              </a>
            </Tooltip>
          </Menu.Item>
        ))}
    </Menu>
  );
};

export default CurrentStatusMenu;
