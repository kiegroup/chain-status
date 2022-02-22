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
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultValue, IFilter } from "../../model/filter.model";
import { IProject } from "../../model/project.model";
import { IPullRequestInfo } from "../../model/pullrequestinfo.model";
import { IUser } from "../../model/user.model";
import { IRootState } from "../../service";
import * as filterService from "../../service/filter.service";
import { alphabeticallySort } from "../../utils/common.utils";
import debounce from "lodash.debounce";
import moment, { Moment } from "moment";

const UserComponent = React.lazy(() => import("../shared/User"));

interface IFilterComponent {}
export const FilterComponent: React.FC<IFilterComponent> = props => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);

  const [baseBranches, setBaseBranches] = useState<(string | undefined)[]>([]);
  const [headBranches, setHeadBranches] = useState<(string | undefined)[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [reviewers, setReviewers] = useState<IUser[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const data = useSelector((store: IRootState) => store.data.data);
  const filter = useSelector((store: IRootState) => store.filter.filter);
  const filteredData = useSelector(
    (store: IRootState) => store.filter.filteredData
  );

  const [form] = Form.useForm();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFilter = useCallback(
    debounce((values: IFilter) => dispatch(filterService.filter(values)), 400),
    []
  );

  const clear = () => {
    form.resetFields();
    dispatch(filterService.reset());
  };

  const treatUsers = (users: (IUser | undefined)[]): IUser[] =>
    users
      .reduce((acc: IUser[], curr) => {
        if (curr && !acc.find(e => e.login === curr.login)) {
          acc.push(curr);
        }
        return acc;
      }, [])
      .sort((a: IUser, b: IUser) =>
        a?.login && b?.login
          ? a.login.toLocaleLowerCase() < b.login.toLocaleLowerCase()
            ? -1
            : a.login.toLocaleLowerCase() > b.login.toLocaleLowerCase()
            ? 1
            : 0
          : 0
      );

  useEffect(() => {
    inputRef.current?.focus({
      cursor: "start"
    });
  }, []);

  useEffect(() => {
    if (filteredData.projects?.length) {
      setBaseBranches(
        Array.from(
          new Set(
            filteredData.projects.flatMap(project =>
              project.pullRequests
                .map(pullrequest => pullrequest.base.ref)
                .filter(e => e)
            )
          )
        ).sort(alphabeticallySort)
      );
      setHeadBranches(
        Array.from(
          new Set(
            filteredData.projects.flatMap(project =>
              project.pullRequests
                .map(pullrequest => pullrequest.head.ref)
                .filter(e => e)
            )
          )
        ).sort(alphabeticallySort)
      );
      setUsers(
        treatUsers(
          filteredData.projects.flatMap(project =>
            project.pullRequests
              .map(pullrequest => pullrequest.user)
              .filter(e => e)
          )
        )
      );
      setReviewers(
        treatUsers(
          filteredData.projects.flatMap(project =>
            project.pullRequests
              .flatMap(pullrequest => pullrequest.requested_reviewers)
              .filter(e => e)
          )
        )
      );
    }
  }, [filteredData, dispatch]);

  const filterBranch = (refs: string[] | undefined, branch: IPullRequestInfo) =>
    !refs || (branch.ref && refs.includes(branch.ref));

  const filterUser = (
    logins: string[] | undefined,
    prUsers: IUser[] | undefined
  ) =>
    !logins ||
    logins.length === 0 ||
    (prUsers &&
      prUsers.filter(prUser => logins.includes(prUser.login)).length > 0);

  const filterTitle = (search: string | undefined, title: string | undefined) =>
    !search || (title && title.toLocaleLowerCase().includes(search));

  const filterDate = (
    dates: Moment[] | undefined,
    prDate: string | undefined
  ) =>
    !dates ||
    dates.length !== 2 ||
    (prDate &&
      moment(prDate).isBetween(dates[0].startOf("day"), dates[1].endOf("day")));

  const isFilterEmpty = (filter: IFilter) =>
    Object.keys(filter).length === 1 ||
    ((!filter.base || filter.base.length === 0) &&
      (!filter.head || filter.head.length === 0) &&
      (!filter.userLogins || filter.userLogins.length === 0) &&
      (!filter.requested_reviewersLogins ||
        filter.requested_reviewersLogins.length === 0) &&
      [null, undefined, ""].includes(filter.search) &&
      (!filter.date || filter.date.length !== 2));

  useEffect(() => {
    if (data?.projects) {
      if (isFilterEmpty(filter)) {
        dispatch(filterService.setData(data));
      } else {
        const searchLowerCase = filter.search
          ? filter.search.toLocaleLowerCase()
          : undefined;
        const filteredProjects = data.projects.reduce(
          (accProject: IProject[], currProject: IProject) => {
            const pullRequests = currProject.pullRequests.filter(
              pr =>
                filterBranch(filter.base, pr.base) &&
                filterBranch(filter.head, pr.head) &&
                filterUser(
                  filter.userLogins,
                  pr.user ? [pr.user] : undefined
                ) &&
                filterUser(
                  filter.requested_reviewersLogins,
                  pr.requested_reviewers
                ) &&
                filterTitle(searchLowerCase, pr.title) &&
                filterDate(filter.date, pr.created_at)
            );
            return [...accProject, { ...currProject, pullRequests }];
          },
          []
        );
        dispatch(
          filterService.setData({
            metadata: data.metadata,
            projects: filteredProjects
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
                <Typography.Title level={4}>
                  Filter Pull Requests
                </Typography.Title>
              }
              key="1"
              extra={
                <Form.Item name="showZeroPullRequests">
                  <Switch
                    checkedChildren="Show 0 Pull Requests"
                    unCheckedChildren="Hide 0 Pull Requests"
                    defaultChecked
                  />
                </Form.Item>
              }
            >
              <Row gutter={[12, 0]}>
                <Col span={12}>
                  <Form.Item
                    label="Pull Request"
                    name="search"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      ref={inputRef}
                      placeholder="pull request title"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Date"
                    name="date"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker.RangePicker />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[12, 0]}>
                <Col span={6}>
                  <Form.Item
                    label="Base"
                    name="base"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" placeholder="Branch">
                      {baseBranches.map(branch => (
                        <Select.Option key={branch}>{branch}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Head"
                    name="head"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" placeholder="Branch">
                      {headBranches.map(branch => (
                        <Select.Option key={branch}>{branch}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Users"
                    name="userLogins"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select mode="multiple" placeholder="Pull Request user">
                      {users.map(user => (
                        <Select.Option key={user?.login}>
                          <Suspense fallback={<SkeletonAvatar size="small" />}>
                            <UserComponent
                              user={user}
                              size={16}
                              showName={true}
                              hideButton={true}
                            />
                          </Suspense>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Reviewers"
                    name="requested_reviewersLogins"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Pull Request reviewers"
                    >
                      {reviewers.map(user => (
                        <Select.Option key={user?.login}>
                          <Suspense fallback={<SkeletonAvatar size="small" />}>
                            <UserComponent
                              user={user}
                              size={16}
                              showName={true}
                              hideButton={true}
                            />
                          </Suspense>
                        </Select.Option>
                      ))}
                    </Select>
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
