import { Statistic } from "antd";
import { COLOURS, STATISTICS_STYLE } from "../../shared/constants";

interface IFileDifferenceStatistic {
  diffs?: number;
  size?: number;
}

export const FileDifferenceStatistic: React.FC<IFileDifferenceStatistic> = props => {
  const fontSizeStyle = props.size
    ? { fontSize: props.size }
    : STATISTICS_STYLE;

  const getColor = () => {
    return props.diffs === undefined ? COLOURS.YELLOW : (props.diffs === 0 ? COLOURS.GREEN : COLOURS.RED) 
  }

  return (
    <Statistic
      value={props.diffs}
      precision={0}
      valueStyle={{
        ...fontSizeStyle,
        color: getColor(),
        fontWeight: "bold"
      }}
      suffix="files"
    />
  )
}

export default FileDifferenceStatistic