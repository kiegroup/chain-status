const { ClientError } = require("../lib/common");

function getOwnerProject(project) {
  if (!project || project.split("/").length !== 2) {
    throw new ClientError(
      `project ${project} does not match with the expected format owner/repo`
    );
  }
  const ownerProject = project.split("/");
  return { owner: ownerProject[0], repo: ownerProject[1] };
}

module.exports = {
  getOwnerProject
};
