import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { defaultValue } from "../../model/filter.model";
import { IUser } from "../../model/user.model";
import { IRootState } from "../../service";
import { alphabeticallySort } from "../../utils/common.utils";
const UserComponent = React.lazy(() => import("../shared/User"));

interface IFilter {
  onFilter: (e: any) => void;
}
export const Filter: React.FC<IFilter> = props => {
  const inputRef = useRef<any>(null);

  const [baseBranches, setBaseBranches] = useState<(string | undefined)[]>([]);
  const [headBranches, setHeadBranches] = useState<(string | undefined)[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [reviewers, setReviewers] = useState<IUser[]>([]);
  const data = useSelector((store: IRootState) => store.data.data);

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
    if (data.projects?.length) {
      setBaseBranches(
        Array.from(
          new Set(
            data.projects.flatMap(project =>
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
            data.projects.flatMap(project =>
              project.pullRequests
                .map(pullrequest => pullrequest.head.ref)
                .filter(e => e)
            )
          )
        ).sort(alphabeticallySort)
      );
      setUsers(
        treatUsers(
          data.projects.flatMap(project =>
            project.pullRequests
              .map(pullrequest => pullrequest.user)
              .filter(e => e)
          )
        )
      );
      setReviewers(
        treatUsers(
          data.projects.flatMap(project =>
            project.pullRequests
              .flatMap(pullrequest => pullrequest.requested_reviewers)
              .filter(e => e)
          )
        )
      );
    }
  }, [data]);

  return (
    <Row>
      <Col span={24}>
        <Form initialValues={defaultValue} onValuesChange={props.onFilter}>
          <Row gutter={[12, 0]}>
            <Col span={12}>
              <Form.Item
                label="Pull Request"
                name="title"
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
                name="users"
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
                          hiddeButton={true}
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
                name="requested_reviewers"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select mode="multiple" placeholder="Pull Request reviewers">
                  {reviewers.map(user => (
                    <Select.Option key={user?.login}>
                      <Suspense fallback={<SkeletonAvatar size="small" />}>
                        <UserComponent
                          user={user}
                          size={16}
                          showName={true}
                          hiddeButton={true}
                        />
                      </Suspense>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default Filter;
