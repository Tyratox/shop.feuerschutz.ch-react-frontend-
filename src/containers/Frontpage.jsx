import React from "react";
import { connect } from "react-redux";
import Link from "components/Link";
import ProductCategories from "containers/ProductCategories";

/**
 * The front page
 * @returns {Component} The component
 */
class Frontpage extends React.PureComponent {
  render = () => {
    const { categories } = this.props;
    return (
      <div>
        <ProductCategories />
      </div>
    );
  };
}

export default connect()(Frontpage);