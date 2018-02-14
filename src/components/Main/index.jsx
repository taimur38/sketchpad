import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

import Plane from '../Plane2'

export default class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {
			height: window.innerHeight * .75,
			width: window.innerWidth
		};
	}

	componentDidMount() {
		window.onresize = () => {
			console.log('resize')
			this.setState({
				height: window.innerHeight * .75,
				width: window.innerWidth
			})
		}
	}

	render() {
		
		console.log(this.state)
		return <div className="main">
			<div className='visual'>
				<Plane height={this.state.height} width={this.state.width} />
			</div>
			<div className='heading'>
				<div className='title'>Taimur Shah</div>
			</div>
			<div className='angled'/>
			<div className='content'>
				Projects
				Sketches
				Cartoons
				Blog
				Photos
			</div>
		</div>

	}
}