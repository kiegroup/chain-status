import { Badge, Col, Popover, Row, Tag, Tooltip, Typography } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { getProjectBranchDiffs, getProjectBranches, getTotalBranchDiffs } from "../../utils/branches.utils";
import { alphabeticallySort } from "../../utils/common.utils";
import BranchesCompareLink from "../shared/BranchesCompareBucketLink";
import FileDifferenceStatistic from "../shared/FilesDifferenceStatistic";
import Loading from "../shared/Loading";

interface IBranchesInfo {
  project: IProject;
}

// show affected branches with branches comparison, if enabled
export const ProjectBranchesDiffsByBranch: React.FC<IBranchesInfo> = props => {

  const branches = getProjectBranches(props.project)

  return (
    <Tooltip key="affected-branches-tooltip" title="Affected Branches">
      {branches
        .filter(b => b)
        .sort(alphabeticallySort)
        .map(b => {
          const diffsByBranch = getProjectBranchDiffs(props.project, b as string)
          const totDiffs = getTotalBranchDiffs(diffsByBranch)

          return (
            <Popover
              key={b}
              content={
                <Suspense key={b} fallback={<Loading />}>
                  <>
                    {Object.entries(diffsByBranch).map(([headBranch, diffs], _) => (
                      <Row key={`${b}-${headBranch}`} gutter={[16, 16]}>
                        <Col flex="none">
                          <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
                            <BranchesCompareLink project={props.project} baseBranch={b as string} headBranch={headBranch} linkName={headBranch}/>
                          </Typography.Text>
                        </Col>
                        <Col flex="auto" style={{ textAlign: "end", marginTop: "2.5px" }}>
                          <FileDifferenceStatistic diffs={diffs} size={12} />
                        </Col>
                      </Row>
                    ))}
                  </>
                </Suspense>
              }
              placement="bottom"
            >
              <Badge size="small" offset={[-10, 0]} count={totDiffs}>
                <Tag key={b}>{b}</Tag>
              </Badge>
            </Popover>
          )
        })
      }
    </Tooltip>
  )
}

export default ProjectBranchesDiffsByBranch
