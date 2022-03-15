import { IBuild } from "../model/build.model";
import { IJob } from "../model/job.model";
import { BUILDS } from "../shared/constants";
export const calculateErrorIndex = (builds: IBuild[]) => {
  const failureBuilds = builds.filter(
    build => ![null, undefined, BUILDS.RESULTS.SUCCESS].includes(build.result)
  );
  return builds?.length ? (failureBuilds.length * 100) / builds.length : 0;
};

export const getColor = (color: string | undefined) => {
  if (color) {
    switch (color) {
      case "yellow":
      case "yellow_anime":
        return "#faad14";
      case "blue":
        return "#70cf41";
      case "red":
      case "red_anime":
        return "#ff6b6d";
      case "disabled":
      case "notbuilt":
        return "#9e9e9e";
      default:
        return color;
    }
  } else {
    return color;
  }
};

export const getJobName = (job: IJob) =>
  `${job.parent ? `${job.parent.name}/` : ""}${job.name}`;
