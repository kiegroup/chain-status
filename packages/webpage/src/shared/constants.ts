export const PROJECT_ID_PREFIX = "project_";
export const PULLREQUEST_ID_PREFIX = "pullrequest_";
export const MENU_ID_PREFIX = "menu_";
export const CHECKS = {
  CONCLUSION: {
    SUCCESS: "success",
    SKIPPED: "skipped",
    FAILURE: "failure",
    CANCELLED: "cancelled",
    PENDING: "pending"
  },
  STATUS: {
    COMPLETED: "completed",
    IN_PROGRESS: "in_progress",
    QUEUED: "queued"
  },
  SLUGS: {
    GITHUB: "github-actions",
    SONAR: "sonarcloud",
    JENKINS: "jenkins"
  }
};

export const GENERAL_MARGIN = 10;
export const STATUS_MARGIN_TOP = 198;
export const STATUS_MARGIN_RIGHT = STATUS_MARGIN_TOP + GENERAL_MARGIN / 2;

export const STATISTICS_STYLE = { fontSize: 18 };

export const APP_TIMESTAMP_FORMAT = 'YYYY/MM/DD HH:mm:ss';

