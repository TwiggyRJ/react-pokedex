import React, { Component } from 'react';
import './body.css';

function removeDuplicates(num) {
  var x,
      len=num.length,
      out=[],
      obj={};

  for (x=0; x<len; x++) {
    obj[num[x]]=0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
}

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = { next: '' };
  }

  onChildChanged(newState, navigateType) {
    this.setState({next: newState});
    this.props.callbackParent(newState, navigateType);
    console.log(newState + navigateType);
  }

  render() {
    let movesSet = this.props.pokemon.moves.reverse();
    let moves = [];
    let learnedSet;
    let learnedLevel = [];
    let learnedMethod = [];
    let statsSet = this.props.pokemon.stats.reverse();
    let stats = [];

    movesSet.forEach(function (val, i) {
      learnedSet = val.version_group_details;

      learnedSet.forEach(function (move, i) {
        if (move.version_group.name === "omega-ruby-alpha-sapphire") {
          learnedLevel.push(move.level_learned_at + ", ");
          learnedMethod.push(move.move_learn_method.name + ", ");
        }
        learnedLevel = removeDuplicates(learnedLevel);
        learnedMethod = removeDuplicates(learnedMethod);
      });
      moves.push(<tr><td> { val.move.name } </td><td> { learnedLevel } </td><td> { learnedMethod } </td></tr>);
    });

    statsSet.forEach(function (val, i) {
      stats.push(<tr><td>{ val.stat.name }</td><td>{ val.base_stat }</td></tr>);
    });

    return (
      <div className="container">

        <table className="full pokedex-table margin-top-15">
          <tbody>
            <tr className="full">
              <th className="bg-green white table-heading pad-10" colSpan="2">Stats</th>
            </tr>
            <tr>
              <th>Stat</th>
              <th>Base Stat</th>
            </tr>
            { stats }
          </tbody>
        </table>

        <table className="full pokedex-table margin-top-15">
          <tbody>
            <tr className="full">
              <th className="bg-green white table-heading pad-10" colSpan="3">Moves</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Learned At</th>
              <th>How it is Learned</th>
            </tr>
            { moves }
          </tbody>
        </table>

        <table className="full pokedex-table margin-top-15">
          <tbody>
            <tr className="full">
              <th className="bg-green white table-heading pad-10" colSpan="8">Sprites</th>
            </tr>
            <tr>
              <th className="bg-green white table-heading pad-10" colSpan="4">Back</th>
              <th className="bg-green white table-heading pad-10" colSpan="4">Front</th>
            </tr>
            <tr>
              <th>Male</th>
              <th>Female</th>
              <th>Shiny Male</th>
              <th>Shiny Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Shiny Male</th>
              <th>Shiny Female</th>
            </tr>
            <tr>
              <td><img src={ this.props.pokemon.sprites.back_default } /></td>
              <td><img src={ this.props.pokemon.sprites.back_female } /></td>
              <td><img src={ this.props.pokemon.sprites.back_shiny } /></td>
              <td><img src={ this.props.pokemon.sprites.back_shiny_female } /></td>
              <td><img src={ this.props.pokemon.sprites.front_default } /></td>
              <td><img src={ this.props.pokemon.sprites.front_female } /></td>
              <td><img src={ this.props.pokemon.sprites.front_shiny } /></td>
              <td><img src={ this.props.pokemon.sprites.front_shiny_female } /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Body;
