import { Skeleton, Tooltip } from "antd";
import prettyMilliseconds from "pretty-ms";
import React, { useEffect, useState } from "react";

interface IPrettyMiliseconds {
  date?: string;
  ms?: number;
}
export const PrettyMiliseconds: React.FC<IPrettyMiliseconds> = props => {
  const [diffMs, setDiffMs] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (props.date) {
      setDiffMs(
        prettyMilliseconds(
          new Date().getTime() - new Date(Date.parse(props.date)).getTime()
        )
      );
    }
  }, [props.date]);

  useEffect(() => {
    if (props.ms) {
      setDiffMs(prettyMilliseconds(props.ms));
    }
  }, [props.ms]);

  return diffMs ? (
    <Tooltip title={props.date}>{diffMs}</Tooltip>
  ) : (
    <Skeleton.Input style={{ width: 100 }} />
  );
};

export default PrettyMiliseconds;
