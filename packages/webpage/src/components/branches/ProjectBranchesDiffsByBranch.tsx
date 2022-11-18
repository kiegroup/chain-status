import { Badge, Col, Popover, Row, Tag, Tooltip, Typography } from "antd";
import React, { Suspense } from "react";
import { IProject } from "../../model/project.model";
import { getProjectBranchDiffs, getProjectBranches, getTotalBranchDiffs } from "../../utils/branches.utils";
import { alphabeticallySort } from "../../utils/common.utils";
import BranchesComparisonLink from "../shared/BranchesComparisonLink";
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
        .filter(branch => branch)
        .sort(alphabeticallySort)
        .map(branch => {
          // branch is not undefined
          const diffsByBranch = getProjectBranchDiffs(props.project, branch as string)
          const totDiffs = getTotalBranchDiffs(diffsByBranch)

          return (
            <Popover
              key={branch}
              content={
                <Suspense key={branch} fallback={<Loading />}>
                  <>
                    {Object.entries(diffsByBranch).map(([headBranch, diffs], _) => (
                      <Row key={`${branch}-${headBranch}`} gutter={[16, 16]}>
                        <Col flex="none">
                          <Typography.Text ellipsis={true} style={{ fontWeight: "bold" }}>
                            {headBranch}
                          </Typography.Text>
                        </Col>
                        <Col flex="auto" style={{ textAlign: "end", marginTop: "2.5px" }}>
                          <FileDifferenceStatistic diffs={diffs} size={12} project={props.project} baseBranch={branch as string} headBranch={headBranch} />
                        </Col>
                      </Row>
                    ))}
                  </>
                </Suspense>
              }
              placement="bottom"
            >
              <Badge size="small" offset={[-10, 0]} count={totDiffs}>
                <Tag key={branch}>{branch}</Tag>
              </Badge>
            </Popover>
          )
        })
      }
    </Tooltip>
  )
}

export default ProjectBranchesDiffsByBranch
