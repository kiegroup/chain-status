import { IJob } from "../model/job.model";
import { IProject } from "../model/project.model";
import { IPullRequest } from "../model/pullrequest.model";
import {
  MENU_ID_PREFIX,
  PROJECT_ID_PREFIX,
  JOB_ID_PREFIX,
  PULLREQUEST_ID_PREFIX
} from "../shared/constants";
import { getProjectKey } from "./pullrequest.utils";

export const getProjectId = (project: IProject) =>
  `${PROJECT_ID_PREFIX}${getProjectKey(project)}`;

export const getJobId = (job: IJob) =>
  `${JOB_ID_PREFIX}${job.parent ? `${job.parent.id}_` : ""}${job.id}`;

export const getPullRequestId = (
  pullRequest: IPullRequest,
  project: IProject | undefined
) =>
  `${PULLREQUEST_ID_PREFIX}${project ? getProjectKey(project) : "project"}_${
    pullRequest.number
  }`;

export const getPullRequestMenuId = (project: IProject) =>
  `${MENU_ID_PREFIX}${getProjectKey(project)}`;

export const getJobMenuId = (job: IJob) => `${MENU_ID_PREFIX}${job.id}`;
