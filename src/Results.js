import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    let pets;
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
      });

    this.setState({ pets });
  }
  handleClick() {
    alert(`i'm clicked!`);
  }
  render() {
    return (
      <div>
        <Pet name="nelly" animal="cat" breed="birman" />
        <Pet name="gilbert" animal="cat" breed="bengal" />
        <Pet name="nala" animal="cat" breed="norwegian forest" />
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }
}

export default Results;
