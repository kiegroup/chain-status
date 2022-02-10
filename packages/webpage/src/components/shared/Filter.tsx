import { Input } from "antd";
import React, { useEffect, useRef } from "react";

interface IFilter {
  onFilter: (e: any) => void;
}
export const Filter: React.FC<IFilter> = props => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus({
      cursor: "start"
    });
  }, []);

  return (
    <Input
      ref={inputRef}
      placeholder="project name, pull request title, author, base or head branch, author, reviewer"
      onChange={props.onFilter}
      allowClear
    />
  );
};

export default Filter;
