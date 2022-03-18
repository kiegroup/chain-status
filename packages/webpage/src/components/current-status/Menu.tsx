import { Badge, Menu as AntdMenu, Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import { PROJECT_ID_PREFIX } from "../../shared/constants";
import { getProjectId, getPullRequestMenuId } from "../../utils/id.utils";
import MenuSelection from "../shared/MenuSelection";
import ProjectLink from "../shared/ProjectLink";

interface IMenu {}
export const Menu: React.FC<IMenu> = props => {
  const data = useSelector(
    (store: IRootState) => store.pullrequestFilter.filteredData
  );
  const filter = useSelector(
    (store: IRootState) => store.pullrequestFilter.filter
  );
  const selectedKey = useSelector((store: IRootState) => store.menu.key);

  return (
    <MenuSelection
      filter={filter}
      filteredData={data.projects}
      title="Repositories"
      querySelectorPrefix={PROJECT_ID_PREFIX}
    >
      <AntdMenu
        selectedKeys={[selectedKey]}
        theme="light"
        mode="inline"
        // onClick={e => onClick(e.key)}
      >
        {data.projects
          .filter(e => e.name)
          .map(project => (
            <AntdMenu.Item
              id={getPullRequestMenuId(project)}
              key={getProjectId(project)}
              style={{ scrollMarginTop: 162 }}
            >
              <Tooltip title={project.key} placement="left">
                {project.pullRequests.length ? (
                  <ProjectLink project={project} />
                ) : (
                  <Badge
                    showZero
                    count={0}
                    offset={[15, 0]}
                    style={{ backgroundColor: "#108ee9" }}
                  >
                    <ProjectLink project={project} />
                  </Badge>
                )}
              </Tooltip>
            </AntdMenu.Item>
          ))}
      </AntdMenu>
    </MenuSelection>
  );
};

export default Menu;
