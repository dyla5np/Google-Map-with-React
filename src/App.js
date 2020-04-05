import React, {Component} from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    venues: [],
  };

  componentDidMount() {
    this.getVenues();
  }

  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDGvgJFPcXgnaD02d1tfcb9PBIlzgBr2zE&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: {lat: -33.890648, lng: 151.212921},
    });

    this.state.venues.map((myVenue) => {
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng,
        },
        map: map,
        title: myVenue.venue.name,
      });
    });
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "ESG0EBRJ5E5Q1CXEV33B4SXFEGC3YNAH1KR2MSHJUWOVM3JM",
      client_secret: "0SRCR4ENB3JJRVUKPGXPQAWYXKXDTGAM3T5O1QH0OPFXTCWF",
      query: "shops",
      near: "Sydney",
      v: "20200405",
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then((response) => {
        this.setState(
          {
            venues: response.data.response.groups[0].items,
          },
          this.loadMap()
        );
        console.log(response.data.response.groups[0].items);
      })
      .catch((error) => console.log("Error - " - error));
  };

  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
