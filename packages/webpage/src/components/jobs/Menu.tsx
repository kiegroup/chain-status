import { Badge, Col, Menu as AntdMenu, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../service";
import { JOB_ID_PREFIX } from "../../shared/constants";
import { getJobId, getJobMenuId } from "../../utils/id.utils";
import { getColor } from "../../utils/job.utils";
import JobLink from "../shared/JobLink";
import MenuSelection from "../shared/MenuSelection";
import JobStatusIconFactory from "./JobStatusIconFactory";

interface IMenu {}
export const Menu: React.FC<IMenu> = props => {
  const data = useSelector((store: IRootState) => store.jobFilter.filteredData);
  const filter = useSelector((store: IRootState) => store.jobFilter.filter);
  const selectedKey = useSelector((store: IRootState) => store.menu.key);

  return (
    <MenuSelection
      filter={filter}
      filteredData={data.jobs}
      title="Jobs"
      querySelectorPrefix={JOB_ID_PREFIX}
    >
      <AntdMenu
        selectedKeys={[selectedKey]}
        theme="light"
        mode="inline"
        // onClick={e => onClick(e.key)}
      >
        {data.jobs
          .filter(e => e.name)
          .map(job => (
            <AntdMenu.Item
              id={getJobMenuId(job)}
              key={getJobId(job)}
              style={{ scrollMarginTop: 162 }}
            >
              {job.builds.length ? (
                <Row gutter={[10, 16]}>
                  <Col flex="none" style={{ marginTop: 2 }}>
                    <JobStatusIconFactory
                      color={getColor(job?.color)}
                      building={job.builds[0].building}
                      result={job.builds[0].result}
                      size={16}
                    />
                  </Col>
                  <Col flex="auto">
                    <JobLink job={job} />
                  </Col>
                </Row>
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
            </AntdMenu.Item>
          ))}
      </AntdMenu>
    </MenuSelection>
  );
};

export default Menu;
