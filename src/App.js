import React, { useState, useEffect } from "react";

import { Segment, Image, Grid } from "semantic-ui-react";
import axios from "axios";
const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "#e00785",
        padding: 10,
        width: "100%",
        display: "inline",
        zIndex: 1,
        position: "fixed",
        top: 0,
        maxHeight: 120,
      }}
      columns={6}
    >
      <Grid>
        <Grid.Column width={2}>
          <Image
            src="./logo.png"
            size="small"
            style={{ borderRadius: 100, minHeight: 50, minWidth: 50 }}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <div style={{ fontSize: "2.5em", padding: "15%", color: "white" }}>
            LEADERBOARD
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
};

function App() {
  const [playerList, setPlayerList] = useState([]);

  const http = axios.create({
    baseURL: "https://campagne-simulator.herokuapp.com",
  });

  const getRankedPlayers = async () => {
    try {
      const newRankedPlayers = await http.get("/dashboard");
      if (newRankedPlayers) setPlayerList(newRankedPlayers.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getRankedPlayers();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          padding: "20%",
          paddingBottom: 10,
          paddingTop: 130,
        }}
      >
        {playerList.map((player, index) => {
          return (
            <Segment color="blue">
              {index + 1} : {player.username} : {player.amount}$
            </Segment>
          );
        })}
      </div>
    </>
  );
}

export default App;
