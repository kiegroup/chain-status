import { IProject } from "../model/project.model";
import { IPullRequest } from "../model/pullrequest.model";
import {
  MENU_ID_PREFIX,
  PROJECT_ID_PREFIX,
  PULLREQUEST_ID_PREFIX
} from "../shared/constants";
import { getProjectKey } from "./pullrequest.utils";

export const getProjectId = (project: IProject) =>
  `${PROJECT_ID_PREFIX}${getProjectKey(project)}`;

export const getPullRequestId = (
  pullRequest: IPullRequest,
  project: IProject | undefined
) =>
  `${PULLREQUEST_ID_PREFIX}${project ? getProjectKey(project) : "project"}_${
    pullRequest.number
  }`;

export const getMenuId = (project: IProject) =>
  `${MENU_ID_PREFIX}${getProjectKey(project)}`;
