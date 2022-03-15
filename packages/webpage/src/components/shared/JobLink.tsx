import React from "react";
import { IJob } from "../../model/job.model";
import { getJobId } from "../../utils/id.utils";
import { getJobName } from "../../utils/job.utils";

interface IJobLink {
  job: IJob;
}

export const JobLink: React.FC<IJobLink> = props => {
  return (
    <a
      href={`#${getJobId(props.job)}`}
      rel="noopener noreferrer"
      onClick={e => {
        e.preventDefault();

        document
          ?.getElementById(getJobId(props.job) ?? "")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {getJobName(props.job)}
    </a>
  );
};

export default JobLink;
