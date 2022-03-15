import { Badge, Menu as AntdMenu, Skeleton, Tooltip, Typography } from "antd";
import debounce from "lodash.debounce";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IJob } from "../../model/job.model";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
import * as menuService from "../../service/menu.service";
import { MENU_ID_PREFIX, JOB_ID_PREFIX } from "../../shared/constants";
import { getJobId, getJobMenuId } from "../../utils/id.utils";
import JobLink from "../shared/JobLink";

interface IMenu {}
export const Menu: React.FC<IMenu> = props => {
  const dispatch = useDispatch();

  const data = useSelector((store: IRootState) => store.jobFilter.filteredData);
  const showZeroBuilds = useSelector(
    (store: IRootState) => store.jobFilter.filter.showZeroBuilds
  );
  const selectedKey = useSelector((store: IRootState) => store.menu.key);
  const projectsLoaded = useSelector(
    (store: IRootState) => store.layout.projectsLoaded
  );
  const headingElementsRef: any = useRef({});

  const show = (job: IJob) => showZeroBuilds || job.builds.length > 0;

  // Menu selection on scroll
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const registerSection = useCallback(
    debounce(
      (key: string) => dispatch(layoutService.registerSection(key)),
      200
    ),
    []
  );
  const onClick = (key: string) => {
    dispatch(menuService.onSelect(key));
    registerSection(key);
  };

  useEffect(() => {
    if (data?.jobs?.length && projectsLoaded) {
      const scrollMenu = (elementId: string) => {
        const menuId = elementId.replace(JOB_ID_PREFIX, MENU_ID_PREFIX);
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
        document.querySelectorAll(`*[id^="${JOB_ID_PREFIX}"]`)
      );
      headingElements.forEach(element => observer.observe(element));

      return () => {
        observer.disconnect();
        dispatch(layoutService.reset());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data, projectsLoaded, showZeroBuilds]);

  const MenuComponent = (props: { jobs: IJob[] }) => (
    <AntdMenu
      selectedKeys={[selectedKey]}
      theme="light"
      mode="inline"
      // onClick={e => onClick(e.key)}
    >
      {props.jobs
        .filter(e => e.name && show(e))
        .map(job => (
          <AntdMenu.Item
            id={getJobMenuId(job)}
            key={getJobId(job)}
            style={{ scrollMarginTop: 162 }}
          >
            <Tooltip title={job.name} placement="left">
              {job.builds.length ? (
                <JobLink job={job} />
              ) : (
                <Badge
                  showZero
                  count={0}
                  offset={[15, 0]}
                  style={{ backgroundColor: "#108ee9" }}
                >
                  <JobLink job={job} />
                </Badge>
              )}
            </Tooltip>
          </AntdMenu.Item>
        ))}
    </AntdMenu>
  );

  return (
    <>
      <Typography.Title
        level={4}
        style={{ marginLeft: 24, marginTop: 24, marginBottom: 24 }}
      >
        Jobs
      </Typography.Title>
      <Suspense fallback={<Skeleton />}>
        <MenuComponent jobs={data.jobs} />
      </Suspense>
    </>
  );
};

export default Menu;
