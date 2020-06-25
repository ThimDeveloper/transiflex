const { findScriptSchema } = require("../schemas");

const createFindScript = ({
  startDir = null,
  type = null,
  identifier = null,
  maxDepth = 3,
}) => {
  const input = { type, identifier, maxDepth };
  try {
    const { error } = findScriptSchema.validate(input);
    if (error) throw error;

    let dir = "~";
    if (startDir) {
      dir = startDir;
    }
    const script = `find ${dir} -maxdepth ${maxDepth} -type ${type} -name ${identifier} 2>&1 | grep -v find`;
    return script;
  } catch {
    return null;
  }
};

module.exports = {
  createFindScript,
};
