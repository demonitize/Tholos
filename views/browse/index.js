const serverDisplay = document.getElementById("serverList");
const body = document.getElementById("body");

const loadServers = new XMLHttpRequest();

loadServers.open("GET", "../api/servers/listServers");

loadServers.send();

var popUpOpen = false;

setTimeout(() => {
  let servers = JSON.parse(loadServers.responseText);
  for (server of servers) {
    serverDisplay.appendChild(renderServerListing(server));
  }
}, 2000);

function renderServerListing(server) {
  let serverBox = document.createElement("div");
  serverBox.classList.add("serverBox");

  let serverLogo = document.createElement("img");
  serverLogo.classList.add("serverLogo");
  serverLogo.setAttribute("src", server.logo);

  serverBox.appendChild(serverLogo);

  let serverNameDiv = document.createElement("div");

  serverNameDiv.classList.add("serverNameDiv");

  let serverName = document.createElement("p");
  serverName.innerHTML = server.name;
  serverName.classList.add("serverName");
  serverNameDiv.appendChild(serverName);

  serverBox.appendChild(serverNameDiv);

  serverBox.onclick = () => {
    if (popUpOpen) return;
    let memberCount = document.createElement("p");
    memberCount.innerHTML = `Member # : ${server.memberCount}`;
    memberCount.classList.add("memberCount");

    let tags = document.createElement("p");

    tags.innerHTML = server.tags;
    tags.classList.add("serverTags");

    let popUp = document.createElement("div");
    popUp.appendChild(serverLogo.cloneNode(true));
    popUp.appendChild(serverName.cloneNode(true));
    popUp.appendChild(memberCount.cloneNode(true));
    popUp.appendChild(tags.cloneNode(true));

    let description = document.createElement("p");
    description.classList.add("serverDescription");
    description.innerHTML = server.description;
    popUp.appendChild(description);

    let joinLink = document.createElement("a");
    joinLink.href = server.invite;
    let joinButton = document.createElement("button");

    joinButton.innerHTML = "Join Server";

    joinButton.classList.add("serverJoinButton");

    joinLink.appendChild(joinButton);

    popUp.appendChild(joinLink);

    popUp.classList.add("serverPopUp");
    popUp.onclick = () => {
      body.removeChild(popUp);
      popUpOpen = false;
    };

    body.appendChild(popUp);
    popUpOpen = true;
  };

  return serverBox;
}
