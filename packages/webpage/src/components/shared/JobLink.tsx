import React from "react";
import { IJob } from "../../model/job.model";
import { getJobId } from "../../utils/id.utils";
import { getJobName } from "../../utils/job.utils";
import { Tooltip } from "antd";

interface IJobLink {  
  job: IJob;
}

export const JobLink: React.FC<IJobLink> = props => { 
  return (
      <Tooltip 
        mouseEnterDelay={ 1 }
        title={ getJobName( props.job )}>
        <a
          style={{ display: "block", width: "10vw" }}
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
      </Tooltip>
    );
};

export default JobLink;
