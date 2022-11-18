import { IProject } from "../model/project.model";

// branch -> #diffs
export type MapCounterType = {
  [key: string]: number;
};

export type BranchesComparison  = keyof IProject["branchesComparison"]

export const isBranchesComparisonEnabled = (project: IProject) => project.branchesComparison !== undefined

/**
 * Retrieve the list of branches, if `isBranchesComparisonEnabled` is true it will return
 * all those branches that are present in the config data, otherwise it will fallback to
 * the list of affected branches in all PRs
 * @param project 
 */
export const getProjectBranches = (project: IProject) => {
  const branches = isBranchesComparisonEnabled(project) 
    ? Object.keys(project.branchesComparison)
    : project.pullRequests.map(e => e.base?.ref)
  
  return Array.from(new Set(branches))
}

/**
 * Get all differences between branch <branch> and all others, based on the config data for a specific project
 * @param project 
 * @param branch 
 * @returns MapCounterType
 */
export const getProjectBranchDiffs = (project: IProject, branch: string) => {
  return isBranchesComparisonEnabled(project) && project.branchesComparison[branch]
    ? Object.fromEntries(Object.entries(project.branchesComparison[branch]).map(([k, files], _) => [k, files.length])) as MapCounterType
    : {} as MapCounterType
}

/**
 * Given the diffsByBranch (as a result of getDiffsByBranch) it computes the overall count of 
 * differences considering all branches together
 * @param diffsByBranch 
 * @returns 
 */
export const getTotalBranchDiffs = (diffsByBranch: MapCounterType) => Object.values(diffsByBranch).reduce((acc, c) => acc + c, 0)

/**
 * Retrieve the overall number of different files between the two branches - considering all projects
 * @param projects 
 * @param baseBranch 
 * @param targetBranch 
 * @returns 
 */
export const getCrossProjectBranchesDiffs = (projects: IProject[], baseBranch: string, targetBranch: string) => {
  return projects.map(p => p.branchesComparison ?? {})
    .filter(c => c && c[baseBranch])
    .map(comp => comp[baseBranch][targetBranch] ?? [])
    .map(files => files.length)
    .reduce((acc, c) => acc + c, 0)
}