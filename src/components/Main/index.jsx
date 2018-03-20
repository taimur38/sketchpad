import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

import Plane from '../Plane2'

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			height: window.innerHeight,
			width: window.innerWidth
		};
	}

	componentDidMount() {
		window.onresize = () => {
			console.log('resize')
			this.setState({
				height: window.innerHeight,
				width: window.innerWidth
			})
		}
	}

	render() {

		return <div className="main">
			<div className='visual'>
				<Plane height={this.state.height} width={this.state.width} />
			</div>
			<div className='tippy-top'>Taimur Shah</div>
			<div className='heading'>
				<div className='title'></div>
			</div>
			<div className='content'>
				<Out url="https://github.com/taimur38">GitHub</Out>
				<Out url="https://keybase.pub/taimur38/Resume.pdf">Resume</Out>
				<Out url="https://medium.com/@taimur38">Blog</Out>
				<Out url="https://twitter.com/taimur38">Twitter</Out>
				<Out url="https://www.instagram.com/taimur38">Instagram</Out>
				<Link to="/list">Sketches</Link>
			</div>
			<div className='about'>
				<div className="liner">
					<p>My background is in NLP, and I was previously a Software Architect at IBM Watson. Before that, I was VP of Engineering at <Out url="https://parrable.com">Parrable</Out> and cofounder of Clossit.</p>
				</div>
				<div className='interests'>
					<div className="heading">Current Questions</div>
					<p>How can Chatbots, AI, and data visualization improve human communication?</p> 
					<p>How can software address systemic issues in developing countries?</p>
					<p>Can decentralized solutions legitamize previously untrustworthy institutions?</p>
				</div>
			</div>
			<div className='footer' />
		</div>

	}
}

const Out = ({url, children}) => <a href={url} target="_">{children}</a>