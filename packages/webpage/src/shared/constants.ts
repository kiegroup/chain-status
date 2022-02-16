export const CHECKS = {
  CONCLUSION: {
    SUCCESS: "success",
    SKIPPED: "skipped",
    FAILURE: "failure",
    CANCELLED: "cancelled"
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
