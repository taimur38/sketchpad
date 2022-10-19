import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import Plane from "../Plane2";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.onresize = () => {
      console.log("resize");
      this.setState({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
  }

  render() {
    return (
      <div className="main">
        <div className="visual">
          <Plane height={this.state.height} width={this.state.width} />
        </div>
        <div className="tippy-top"></div>
        <div className="heading">
          <div className="title">Taimur Shah</div>
        </div>
        <div className="content">
          <Out url="https://github.com/taimur38">GitHub</Out>
          <Out url="https://keybase.pub/taimur38/Resume.pdf">Resume</Out>
          <Out url="https://medium.com/@taimur38">Blog</Out>
          <Out url="https://twitter.com/taimur38">Twitter</Out>
          <Out url="https://www.instagram.com/taimur38">Instagram</Out>
          <Link to="/list">Sketches</Link>
        </div>
        <div className="about">
          <div className="liner">
            <p>
              I am a Development Economist with a background in Computer Science
              and entrepreneurship. <br />
              <br /> I have started organizations in both New York City and
              Lahore, and developed deep product expertise by working on a wide
              range of products across many contexts. I am currently focused on
              connecting insights from{" "}
              <Out url="https://growthlab.cid.harvard.edu/files/growthlab/files/growth-diagnostics.pdf">
                Growth Diagnostics
              </Out>{" "}
              and{" "}
              <Out url="https://www.science.org/doi/10.1126/science.1144581">
                Economic Complexity
              </Out>{" "}
              to issues in Pakistan in order to identify both policy and
              entrepreneurial opportunities. <br /> <br /> I am currently
              obtaining my{" "}
              <Out url="https://www.hks.harvard.edu/educational-programs/masters-programs/master-public-administration-international-development">
                Masters in Public Administration in International Development
                from Harvard Kennedy School
              </Out>
              , where I have developed interests in Economic Complexity, Growth
              Diagnostics and Macro-Development. In the summer break during the
              program, I developed policy solutions for the{" "}
              <Out url="https://www.gov.kz/memleket/entities/aspr?lang=en">
                Agency for Strategic Planning and Reforms of the Republic of
                Kazakhstan
              </Out>
              , in the fields of Industrial Policy, Pension reform, Fiscal
              policy, data management and reform monitoring. <br /> <br /> Prior
              to coming the program, I started the Labs unit at the Centre for
              Economic Research in Pakistan.{" "}
              <Out url="https://labs.cerp.org.pk/">CERP Labs</Out> is a
              revenue-generating software house situated within an economic
              research institution, which builds products informed by learning
              from economic research within Pakistan. We created a financially
              sustainable model which has actualized the insights from research
              and scales up the impact from these findings. <br /> <br /> Before
              coming to CERP, I was a Software Architect at{" "}
              <Out url="https://www.ibm.com/watson/">Watson</Out>. Before that,
              I was VP of Engineering at{" "}
              <Out url="https://parrable.com">Parrable</Out> after having
              cofounded and sold a consumer clothing recommendation app Clossit,
              developed with my friend while I was at{" "}
              <Out url="https://www.engineering.columbia.edu/">
                Columbia Engineering
              </Out>
              .
            </p>
          </div>
          <div className="interests">
            <div className="heading">Current Questions</div>
            <p>
              What is the binding constraint to Agriculture productivity in
              Pakistan?
            </p>
            <p>
              How can Chatbots, AI, and data visualization improve human
              communication?
            </p>
            <p>
              How can software address systemic issues in developing countries?
            </p>
            <p>
              Can decentralized solutions legitamize previously untrustworthy
              institutions?
            </p>
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

const Out = ({ url, children }) => (
  <a href={url} target="_">
    {children}
  </a>
);
