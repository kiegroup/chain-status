import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IUser } from "../../model/user.model";

interface IProjectStatusInformation {
  user?: IUser;
  size?: number;
}

export const ProjectStatusInformation: React.FC<
  IProjectStatusInformation
> = props => {
  const [markdown, setMarkdown] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMarkdown = () => {
    setLoading(true);
    fetch("data/info.md", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.text())
      .then(data => {
        console.log("data", data);
        setMarkdown(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMarkdown();
  }, []);

  return (
    <Skeleton loading={loading}>
      <ReactMarkdown children={markdown} linkTarget="_blank" />
    </Skeleton>
  );
};

export default ProjectStatusInformation;
