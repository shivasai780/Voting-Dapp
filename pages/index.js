import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Head from "next/head";
import Nav from "../components/nav";
import ballot from "../ethereum/Ballot";
import { Container, Card, Image, Message } from "semantic-ui-react";
import { Link } from "../routes";
import web3 from "../ethereum/web3";

class App extends Component {
  state = {
    message: true,
    positive: false,
    address: "",
    loading0: false,
    loading1: false,
    loading2: false,
    loading3: false,
    errMessage: "",
    extraMessage: "",
    error: false,
    loadingWinner: false
  };
  static async getInitialProps() {
    const Ballot = await ballot.methods.chairperson().call();
    console.log("this is" + Ballot);
    //const accounts=await web3.eth.getAccounts();

    return { Ballot };
  }

  onClick = async (event, number) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ loading: true });
    try {
      await ballot.methods.vote(number).send({
        from: accounts[0]
      });
      this.setState({
        errMessage: "",
        extraMessage: `successfully voted by` + accounts,
        positive: true
      });
    } catch (err) {
      this.setState({ extraMessage: err.message, error: true });
    }
    this.setState({ loading: false, message: false });
  };
  onDeclare = async event => {
    event.preventDefault();
    this.setState({ message: true, loadingWinner: true });
    const result = await ballot.methods.winningProposal().call();
    this.setState({
      extraMessage: `Voter` + (parseInt(result) + 1),
      positive: true,
      message: false
    });
    this.setState({ loadingWinner: false });
  };
  render() {
    return (
      <Container>
        <div style={{ marginTop: "25px" }}>
          <Head>
            <link
              rel="stylesheet prefetch"
              href="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/css/semantic.min.css"
            />

            <link
              rel="stylesheet prefetch"
              href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
            />

            <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            />
          </Head>
          <div>
            <Link route={`/Ballot/register`}>
              <Button primary floated="right">
                Register
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="ui link four column cards"
          style={{ marginTop: "50px" }}
        >
          <div className="card">
            <div className="image">
              <Image className="ui fluid image" src="../party1.png"></Image>
            </div>
            <div className="content">
              <div className="header">Voter1</div>
              <div className="description">
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={e => {
                    this.onClick(e, 0);
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img src="/images/avatar2/large/molly.png" />
            </div>
            <div className="content">
              <div className="header">Voter2</div>

              <div className="description">
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={e => {
                    this.onClick(e, 1);
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img src="/images/avatar2/large/elyse.png" />
            </div>
            <div className="content">
              <div className="header">Voter3</div>

              <div className="description">
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={e => {
                    this.onClick(e, 2);
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img src="/images/avatar2/large/elyse.png" />
            </div>
            <div className="content">
              <div className="header">Voter4</div>

              <div className="description">
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={e => {
                    this.onClick(e, 3);
                  }}
                >
                  Vote
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Message
          hidden={this.state.message}
          positive={this.state.positive}
          error={this.state.error}
        >
          {this.state.extraMessage}
        </Message>

        <div style={{ marginTop: "25px" }}>
          <Link>
            <Button
              primary
              loading={this.state.loadingWinner}
              style={{ backgroundColor: "LightGreen" }}
              onClick={this.onDeclare}
            >
              Declare Winner
            </Button>
          </Link>
        </div>
      </Container>
    );
  }
}
export default App;

/*const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Welcome to Next.js!</h1>
      <p className='description'>
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className='row'>
        <a href='https://nextjs.org/docs' className='card'>
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <a href='https://nextjs.org/learn' className='card'>
          <h3>Next.js Learn &rarr;</h3>
          <p>Learn about Next.js by following an interactive tutorial!</p>
        </a>
        <a
          href='https://github.com/zeit/next.js/tree/master/examples'
          className='card'
        >
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Next.js GitHub.</p>
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home
*/
