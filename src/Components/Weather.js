import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import "./weather.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "450px",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    marginLeft: "60px",
  },
  controls: {
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    fontSize: "22px",
    fontWeight: "bold",
  },
}));

export default function Weather() {
  const classes = useStyles();
  const [weaths, setWeaths] = useState([]);
  const [wind, setWind] = useState([]);
  const [cloud, setCloud] = useState([]);
  const [name, setName] = useState("");
  const [stat, setStat] = useState("");
  const [weaths1, setWeaths1] = useState([]);
  const [wind1, setWind1] = useState([]);
  const [cloud1, setCloud1] = useState([]);
  const [name1, setName1] = useState("");
  const [error, setError] = useState("");
  const [iserror, setIserror] = useState(false);

  const SubmitHandle = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          `${stat}` +
          "&appid=b2d9a7376e4731b820112c33dc3fda44"
      )
      .then((res) => {
        setWeaths1(res.data.main);
        setWind1(res.data.wind);
        setCloud1(res.data.weather[0]);
        setName1(res.data.name);
      })
      .catch((err) => {
        setError(err.response.statusText);
        setIserror(true);
      });
  };

  const StateHandle = (e) => {
    setStat(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=mangalore&appid=b2d9a7376e4731b820112c33dc3fda44"
      )
      .then((res) => {
        setWeaths(res.data.main);
        setWind(res.data.wind);
        setCloud(res.data.weather[0]);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container>
      {error === "" ? "" : <Alert severity="error">{error}</Alert>}

      <br />
      <Row>
        <Col sm={6}>
          <Card className={classes.root} className="car">
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  <strong>CURRENTLY</strong>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <div className="weather_status">
                    <strong style={{ fontSize: "32px" }}>
                      {Math.round(weaths.temp - 273.15)}℃
                    </strong>
                    <div className="weather_right">
                      Mostly <strong>{cloud.description}</strong>
                      <br />
                      Feels Like{" "}
                      <strong>
                        {Math.round(weaths.feels_like - 273.15)}℃{" "}
                      </strong>
                    </div>

                    <div className="weather_sub"></div>
                  </div>
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <p>Pressure : {weaths.pressure} mBar</p>
                <p>Humidity : {weaths.humidity}%</p>
                <p>Wind : {wind.speed} km/hr</p>
                <h3>
                  <strong>{name}</strong>
                </h3>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="https://png.pngtree.com/element_our/md/20180627/md_5b33491c79ac0.jpg"
              title="Live from space album cover"
            />
          </Card>
        </Col>
        <Col sm={6}>
          <br />
          <div className="header-bar">
            <form onSubmit={SubmitHandle}>
              <TextField
                className="Textfield"
                id="outlined-search"
                label="State"
                type="text"
                onChange={StateHandle}
                variant="outlined"
                error={iserror}
                helperText={error}
              />{" "}
              <Button
                style={{ marginTop: "5px" }}
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
              >
                SEARCH
              </Button>
            </form>
          </div>
          <br />
          <br />
          {name1 === "" ? (
            ""
          ) : (
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    <strong>CURRENTLY</strong>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <div className="weather_status">
                      <strong style={{ fontSize: "32px" }}>
                        {Math.round(weaths1.temp - 273.15)}℃
                      </strong>
                      <div className="weather_right">
                        Mostly <strong>{cloud1.description}</strong>
                        <br />
                        Feels Like{" "}
                        <strong>
                          {Math.round(weaths1.feels_like - 273.15)}℃{" "}
                        </strong>
                      </div>

                      <div className="weather_sub"></div>
                    </div>
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                  <p>Pressure : {weaths1.pressure} mBar</p>
                  <p>Humidity : {weaths1.humidity}%</p>
                  <p>Wind : {wind1.speed} km/hr</p>
                  <h3>
                    <strong>{name1}</strong>
                  </h3>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                image="https://png.pngtree.com/element_our/md/20180627/md_5b33491c79ac0.jpg"
                title="Weather"
              />
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
