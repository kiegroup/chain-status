import { Skeleton, Typography } from "antd";
import debounce from "lodash.debounce";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../service";
import * as layoutService from "../../service/layout.service";
import * as menuService from "../../service/menu.service";
import { MENU_ID_PREFIX } from "../../shared/constants";

interface IMenuSelection {
  title: string;
  children: any;
  querySelectorPrefix: string;
  filter: any;
  filteredData: any[];
}
export const MenuSelection: React.FC<IMenuSelection> = props => {
  const dispatch = useDispatch();

  const listItemLoaded = useSelector(
    (store: IRootState) => store.layout.listItemLoaded
  );
  const headingElementsRef: any = useRef({});

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
    return () => {
      layoutService.reset();
    };
  }, []);

  useEffect(() => {
    if (props.filteredData.length) {
      const scrollMenu = (elementId: string) => {
        const menuId = elementId.replace(
          props.querySelectorPrefix,
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
        document.querySelectorAll(`*[id^="${props.querySelectorPrefix}"]`)
      );
      headingElements.forEach(element => observer.observe(element));

      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.filteredData, listItemLoaded, props.filter]);

  return (
    <>
      <Typography.Title
        level={4}
        style={{ marginLeft: 24, marginTop: 24, marginBottom: 24 }}
      >
        {props.title}
      </Typography.Title>
      <Suspense fallback={<Skeleton />}>{props.children}</Suspense>
    </>
  );
};

export default MenuSelection;
