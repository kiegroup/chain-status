import { Statistic } from "antd";
import React from "react";
import { STATISTICS_STYLE } from "../../shared/constants";

interface IStatisticDate {
  date: Date;
  intervalSeconds?: number;
  text: string;
}
export const StatisticDate: React.FC<IStatisticDate> = props => {
  // const [dateDifferenceMiliseconds, setDateDifferenceMiliseconds] =
  //   useState<number>(0);

  // useEffect(() => {
  //   if (props.date && props.intervalSeconds) {
  //     const interval = setInterval(
  //       () =>
  //         setDateDifferenceMiliseconds(
  //           new Date().getTime() - props.date.getTime()
  //         ),
  //       props.intervalSeconds * 1000
  //     );
  //     return () => clearInterval(interval);
  //   }
  // }, [props.date, props.intervalSeconds]);

  return (
    <>
      <Statistic
        title={props.text}
        loading={!props.date}
        valueStyle={STATISTICS_STYLE}
        value={props.date.toLocaleString()}
      />
      {/* {props.date && dateDifferenceMiliseconds ? (
        <Tooltip placement="bottom" title={props.date.toLocaleString()}>
          <Tag
            icon={<ClockCircleOutlined />}
            color="success"
            style={{ marginTop: 5 }}
          >
            {prettyMilliseconds(dateDifferenceMiliseconds)}
          </Tag>
        </Tooltip>
      ) : (
        <Loading />
      )} */}
    </>
  );
};

export default StatisticDate;
