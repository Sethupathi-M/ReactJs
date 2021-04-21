import React, { Component } from "react";
class ListGroup extends Component {
  getListClassName(genere, currentGenre) {
    let className = "list-group-item";
    if (currentGenre === genere) className += " active";

    return className;
  }
  render() {
    const {
      onItemsChange,
      items,
      currentGenre,
      textProperty,
      valueProperty,
    } = this.props;
    return (
      <ul className="list-group">
        <li
          key="All"
          className={this.getListClassName("All", currentGenre)}
          onClick={() => onItemsChange("All")}
          style={{ cursor: "pointer" }}
        >
          All Generes
        </li>
        {items.map((genere) => (
          <li
            key={genere[valueProperty]}
            className={this.getListClassName(
              genere[textProperty],
              currentGenre
            )}
            onClick={() => onItemsChange(genere[textProperty])}
            style={{ cursor: "pointer" }}
          >
            {genere[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
