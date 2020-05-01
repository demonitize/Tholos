const db = require("better-sqlite3")("database.db");

db.exec(
  "CREATE TABLE IF NOT EXISTS guilds (guildID TEXT, ownerID TEXT, name TEXT, description TEXT, tags TEXT, memberCount INT, invite TEXT, logo TEXT)"
);

const addServer = db.prepare("INSERT INTO guilds VALUES (?,?,?,?,?,?,?,?)");
const updateServerDescription = db.prepare(
  "UPDATE guilds SET description = ? WHERE guildID = ?"
);
const addServerTags = db.prepare(
  "UPDATE guilds SET tags = ? WHERE guildID = ?"
);
const readServer = db.prepare("SELECT * FROM guilds WHERE guildID = ?");
const listServers = db.prepare("SELECT * FROM guilds");

module.exports.addServer = ({
  guildID,
  ownerID,
  name,
  description,
  tags,
  memberCount,
  invite,
  logo,
}) => {
  addServer.run(
    guildID,
    ownerID,
    name,
    description,
    tags,
    memberCount,
    invite,
    logo
  );
};

module.exports.updateServerDescription = ({ guildID, description }) => {
  updateServerDescription.run(description, guildID);
};

module.exports.updateServerTags = ({ serverID, tags }) => {
  let totalTags = JSON.parse(readServer.get(serverID).tags);
  for (let tag of JSON.parse(tags)) {
    tag = tag.toLowerCase()
    totalTags.includes(tag) ? undefined :totalTags.push(tag);
  }
  addServerTags.run(JSON.stringify(totalTags), serverID);
};

module.exports.readServer = (serverID) => {
  return readServer.get(serverID);
};

module.exports.listServers = () => {
  return listServers.all();
};
