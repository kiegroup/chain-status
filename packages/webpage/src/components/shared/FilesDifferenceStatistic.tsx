import {
  DiffOutlined
} from "@ant-design/icons";
import { Statistic } from "antd";
import { IProject } from "../../model/project.model";
import { STATISTICS_STYLE } from "../../shared/constants";
import BranchesComparisonLink from "./BranchesComparisonLink";

interface IFileDifferenceStatistic {
  project: IProject;
  baseBranch?: string;
  headBranch?: string;
  title?: string;
  diffs?: number;
  size?: number;
  prefix?: React.ReactNode;
}

export const FileDifferenceStatistic: React.FC<IFileDifferenceStatistic> = props => {
  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  return (
    <Statistic
      title={props.title}
      value={props.diffs}
      precision={0}
      valueStyle={{
        ...fontSizeStyle
      }}
      prefix={props.prefix ?? <DiffOutlined />}
      suffix={
        props.baseBranch && props.headBranch ?
        <BranchesComparisonLink 
          project={props.project} 
          baseBranch={props.baseBranch} 
          headBranch={props.headBranch}
        /> : null
      }
    />
  )
}

export default FileDifferenceStatistic