import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
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
  const headBranch = useSelector(
    (store: IRootState) => store.branches.targetBranch
  );

  const [numberOfDiffFiles, setNumberOfDiffFiles] = useState<Record<string, number>>({});

  useEffect(() => {
    if(baseBranch && headBranch && props.projects?.length) {
      const numOfDiffFilesByProject = Object.fromEntries(
        props.projects.map(project => [project.name, project.branchesComparison?.[baseBranch]?.[headBranch]?.length])
      )
      setNumberOfDiffFiles(numOfDiffFilesByProject)
    } else {
         setNumberOfDiffFiles({})
    }
  }, [baseBranch, headBranch, props.projects]); 

  return (
    <>
      {props.projects
        .filter(project => project.name)
        .map(project => (
        <Row key={project.key} gutter={[16, 16]}>
          <Col flex="none">
            <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
              <ProjectLink project={project} />
            </Typography.Text>
          </Col>
          <Col flex="auto" style={{ textAlign: "end", marginTop: "2.5px" }}>
            <FileDifferenceStatistic 
              diffs={numberOfDiffFiles[project.name as string]} 
              project={project}
              baseBranch={baseBranch}
              headBranch={headBranch}
              size={props.size} />
          </Col>
        </Row>
      ))}
    </>
  )
}

export default BranchesDiffsByProject