import { Menu, Skeleton, Tooltip, Typography } from "antd";
import React, { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProject } from "../../model/project.model";
import { IRootState } from "../../service";
import * as menuService from "../../service/menu.service";
import { MENU_ID_PREFIX, PROJECT_ID_PREFIX } from "../../shared/constants";
import { getMenuId, getProjectId } from "../../utils/id.utils";
import ProjectLink from "../shared/ProjectLink";

interface ICurrentStatusMenu {}
export const CurrentStatusMenu: React.FC<ICurrentStatusMenu> = props => {
  const dispatch = useDispatch();

  const data = useSelector((store: IRootState) => store.data.data);
  const selectedKey = useSelector((store: IRootState) => store.menu.key);
  const headingElementsRef: any = useRef({});

  useEffect(() => {
    if (data?.projects) {
      // Menu selection on scroll
      const onClick = (key: string) => dispatch(menuService.onSelect(key));

      const scrollMenu = (projectElementId: string) => {
        const menuId = projectElementId.replace(
          PROJECT_ID_PREFIX,
          MENU_ID_PREFIX
        );
        document
          ?.getElementById(menuId)
          ?.scrollIntoView({ behavior: "smooth" });
      };
      const callback = (headings: any) => {
        headingElementsRef.current = headings.reduce(
          (map: any, headingElement: any) => {
            map[headingElement.target.id] = headingElement;
            return map;
          },
          headingElementsRef.current
        );

        const visibleHeadings: any[] = [];
        Object.keys(headingElementsRef.current).forEach((key: string) => {
          const headingElement: any = headingElementsRef.current[key];
          if (headingElement.isIntersecting)
            visibleHeadings.push(headingElement);
        });

        const getIndexFromId = (id: string) =>
          headingElements.findIndex(heading => heading.id === id);

        if (visibleHeadings.length === 1) {
          onClick(visibleHeadings[0].target.id);
          scrollMenu(visibleHeadings[0].target.id);
        } else if (visibleHeadings.length > 1) {
          const sortedVisibleHeadings = visibleHeadings.sort((a: any, b: any) =>
            getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 0 : 1
          );
          onClick(sortedVisibleHeadings[0].target.id);
          scrollMenu(sortedVisibleHeadings[0].target.id);
        }
      };

      const observer = new IntersectionObserver(callback, {
        rootMargin: "-220px 0px -40% 0px"
      });

      const headingElements = Array.from(
        document.querySelectorAll(`*[id^="${PROJECT_ID_PREFIX}"]`)
      );

      headingElements.forEach(element => observer.observe(element));

      return () => observer.disconnect();
    }
  }, [dispatch, data]);

  const MenuComponent = (props: { projects: IProject[] }) => (
    <Menu selectedKeys={[selectedKey]} theme="light" mode="inline">
      {props.projects
        .filter(e => e.name)
        .map(project => (
          <Menu.Item
            id={getMenuId(project)}
            key={getProjectId(project)}
            style={{ scrollMarginTop: 162 }}
          >
            <Tooltip title={project.key} placement="left">
              <ProjectLink project={project} />
            </Tooltip>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <>
      <Typography.Title
        level={4}
        style={{ marginLeft: 24, marginTop: 24, marginBottom: 24 }}
      >
        Repositories
      </Typography.Title>
      <Suspense fallback={<Skeleton />}>
        <MenuComponent projects={data.projects} />
      </Suspense>
    </>
  );
};

export default CurrentStatusMenu;
