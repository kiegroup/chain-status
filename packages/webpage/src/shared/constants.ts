export const JOB_ID_PREFIX = "job_";
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

export const BUILDS = {
  RESULTS: {
    SUCCESS: "SUCCESS",
    UNSTABLE: "UNSTABLE",
    FAILURE: "FAILURE"
  }
};

export const COLOURS = {
  GREEN: "#3f8600",
  RED: "#cf1322",
  YELLOW: "#ffcc00",
  GRAY: '#d9d9d9'
};

export const GENERAL_MARGIN = 10;
export const MENU_MARGIN_TOP = 64;
export const MENU_WIDTH = 350;
export const STATUS_MARGIN_TOP = 203 + MENU_MARGIN_TOP;
export const STATUS_MARGIN_RIGHT = MENU_WIDTH + GENERAL_MARGIN / 2;

export const STATISTICS_STYLE = { fontSize: 18 };
export const COMPARISON_LINK_STYLE = { fontSize: 5}
export const DISABLED_ITEM_STYLE = { 
  color: COLOURS.GRAY
}

export const APP_TIMESTAMP_FORMAT = "YYYY/MM/DD HH:mm:ss";

export const URL = {
  BASE_GITHUB: "https://github.com"
}
