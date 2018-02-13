import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

import Plane from '../Plane2'

export default class Main extends Component {
	render() {
		
		return <div className="main">
			<div className='visual'>
				<Plane height={window.innerHeight * .75} width={window.innerWidth * 1.2} />
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