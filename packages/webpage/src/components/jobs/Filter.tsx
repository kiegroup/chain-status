import { RightOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography
} from "antd";
import debounce from "lodash.debounce";
import moment, { Moment } from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultValue, IJobFilter } from "../../model/job-filter.model";
import { IJob } from "../../model/job.model";
import { IRootState } from "../../service";
import * as jobFilterService from "../../service/job-filter.service";
import { alphabeticallySort } from "../../utils/common.utils";

interface IFilterComponent {}
export const FilterComponent: React.FC<IFilterComponent> = props => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  const [parentJobs, setParentJobs] = useState<(string | undefined)[]>([]);
  const [buildResults, setBuildResults] = useState<(string | undefined)[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const data = useSelector((store: IRootState) => store.jobsData.data);
  const filter = useSelector((store: IRootState) => store.jobFilter.filter);
  const filteredData = useSelector(
    (store: IRootState) => store.jobFilter.filteredData
  );

  const [form] = Form.useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFilter = useCallback(
    debounce((values: IJobFilter) => {
      dispatch(jobFilterService.filter(values));
    }, 400),
    []
  );

  const clear = () => {
    form.resetFields();
    dispatch(jobFilterService.reset());
  };

  useEffect(() => {
    inputRef.current?.focus({
      cursor: "start"
    });
  }, []);

  useEffect(() => {
    if (filteredData.jobs?.length) {
      setParentJobs(
        Array.from(
          new Set(
            filteredData.jobs.flatMap(job => job.parent?.name).filter(e => e)
          )
        ).sort(alphabeticallySort)
      );
      setBuildResults(
        Array.from(
          new Set(
            filteredData.jobs
              .flatMap(job => job.builds.map(build => build.result))
              .filter(e => e)
          )
        ).sort(alphabeticallySort)
      );
    }
  }, [filteredData, dispatch]);

  const filterParent = (
    parentJobs: string[] | undefined,
    parentJob: IJob | undefined
  ) =>
    !parentJobs ||
    (parentJob && parentJob.name && parentJobs.includes(parentJob.name));

  const filterResult = (
    results: string[] | undefined,
    result: string | undefined
  ) => !results || (result && results.includes(result));

  const filterTitle = (search: string | undefined, title: string | undefined) =>
    !search || (title && title.toLocaleLowerCase().includes(search));

  const filterDate = (
    dates: Moment[] | undefined,
    buildDate: string | undefined
  ) =>
    !dates ||
    dates.length !== 2 ||
    (buildDate &&
      moment(buildDate).isBetween(
        dates[0].startOf("day"),
        dates[1].endOf("day")
      ));

  useEffect(() => {
    const isBuildFilterEmpty = (filter: IJobFilter) =>
      (Object.keys(filter).length === 1 ||
        !filter.date ||
        filter.date.length !== 2) &&
      (!filter.result || filter.result.length === 0);

    const isFilterEmpty = (filter: IJobFilter) =>
      Object.keys(filter).length === 1 ||
      ((!filter.parentJob || filter.parentJob.length === 0) &&
        [null, undefined, ""].includes(filter.search) &&
        isBuildFilterEmpty(filter));

    if (data?.jobs) {
      if (isFilterEmpty(filter)) {
        dispatch(jobFilterService.setData(data));
      } else {
        const searchLowerCase = filter.search
          ? filter.search.toLocaleLowerCase()
          : undefined;
        const jobs = data.jobs
          .filter(
            job =>
              filterTitle(searchLowerCase, job.name) &&
              filterParent(filter.parentJob, job.parent)
          )
          .reduce((accProject: IJob[], currJob: IJob) => {
            const builds = currJob.builds.filter(
              build =>
                isBuildFilterEmpty(filter) ||
                (filterResult(filter.result, build.result) &&
                  filterDate(
                    filter.date,
                    build.date ? new Date(build.date).toDateString() : undefined
                  ))
            );
            return [...accProject, { ...currJob, builds }];
          }, []);
        dispatch(
          jobFilterService.setData({
            metadata: data.metadata,
            jobs: filter.showZeroBuilds
              ? jobs
              : jobs.filter(job => job.builds?.length > 0)
          })
        );
      }
    }
  }, [filter, data, dispatch]);

  return (
    <Form initialValues={defaultValue} onValuesChange={onFilter} form={form}>
      <Row>
        <Col span={24}>
          <Collapse
            activeKey={collapsed ? "0" : "1"}
            ghost
            style={{ backgroundColor: "#FFFFFF" }}
            expandIcon={({ isActive }) => (
              <RightOutlined
                rotate={isActive ? 90 : 0}
                style={{ fontSize: 18, marginTop: 5 }}
              />
            )}
            onChange={e => setCollapsed(!e.includes("1"))}
          >
            <Collapse.Panel
              header={
                <Typography.Title level={4}>Filter Jobs</Typography.Title>
              }
              key="1"
              extra={
                <Form.Item name="showZeroBuilds">
                  <span
                    onClick={e => {
                      onFilter({
                        showZeroBuilds: !filter.showZeroBuilds
                      });
                      e.stopPropagation();
                    }}
                  >
                    <Switch
                      checkedChildren="Show 0 Builds"
                      unCheckedChildren="Hide 0 Builds"
                      defaultChecked
                    />
                  </span>
                </Form.Item>
              }
            >
              <Row gutter={[12, 0]}>
                <Col span={8}>
                  <Form.Item
                    label="Jobs"
                    name="search"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input ref={inputRef} placeholder="job name" allowClear />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Parent Job"
                    name="parentJob"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" placeholder="Parent">
                      {parentJobs.map(parentJob => (
                        <Select.Option key={parentJob}>
                          {parentJob}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Build Result"
                    name="result"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" placeholder="Result">
                      {buildResults.map(result => (
                        <Select.Option key={result}>{result}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Build Date"
                    name="date"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker.RangePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={clear}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterComponent;
