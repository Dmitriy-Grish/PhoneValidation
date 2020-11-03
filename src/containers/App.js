import React from "react";
import { Router } from "react-router-dom";
import history from "../routes/History";
import Routes from "../routes/Routes";
import Loader from "../components/Loader/Loader";
import "./App.scss";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <div>
        {loading ? <Loader /> : null}
        <Router history={history}>{Routes}</Router>
      </div>
    );
  }
}

const mapStateToProps = ({ lang, loading }) => ({
  lang,
  loading,
});

export default connect(mapStateToProps, null)(App);
