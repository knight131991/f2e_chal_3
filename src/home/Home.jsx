import React from "react";
// import PropTypes from "prop-types";
import { Button } from "antd";
import { useHistory } from "react-router";

function Home(props) {
  const history = useHistory();
  return (
    <div>
      <Button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                history.push({
                  pathname: "/nearby-stations",
                  search: `lat=${latitude}&long=${longitude}`,
                });
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }}
      >
        附近公車站
      </Button>
      <Button onClick={() => history.push("/search-bus")}>查詢公車</Button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
