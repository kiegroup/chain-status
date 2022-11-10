import { Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { IProject } from "../../model/project.model";
import { IRootState } from "../../service";
import FileDifferenceStatistic from "../shared/FilesDifferenceStatistic";
import ProjectLink from "../shared/ProjectLink";

interface IBranchesDiffsByProject {
  projects: IProject[];
  size?: number
}

export const BranchesDiffsByProject: React.FC<IBranchesDiffsByProject> = props => {
  const baseBranch = useSelector(
    (store: IRootState) => store.branches.baseBranch
  );
  const targetBranch = useSelector(
    (store: IRootState) => store.branches.targetBranch
  );

  const getNumberOfDiffFiles = (project: IProject) => {
    if (project.branchesComparison && baseBranch && targetBranch 
      && project.branchesComparison[baseBranch]
      && project.branchesComparison[baseBranch][targetBranch]) {
     return project.branchesComparison[baseBranch][targetBranch].length;
    }

    return undefined;
  }  

  return (
    <>
      {props.projects.map(project => (
        <Row key={project.key} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              <ProjectLink project={project} />
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end" }}>
            <FileDifferenceStatistic diffs={getNumberOfDiffFiles(project)} size={props.size} />
          </Col>
        </Row>
      ))}
    </>
  )
}

export default BranchesDiffsByProject