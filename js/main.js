//Following along a SitePoint tutorial

var MyApp = React.createClass({
	render: function(){
		return (
			<div>
				<h1>Stopwatch Tres</h1>
				<StopWatch />
			</div>
		);
	}
});

function formattedSeconds(sec) {
	var seconds = ("0"+ sec % 60).slice(-2);
	var minutes = Math.floor(sec/60);
	return minutes + ":" + seconds;
}

var StopWatch = React.createClass({
	getInitialState: function() {
	    return { 
	    	secondsElapsed: 0,
	    	laps: []
	    };
	},
	getSeconds: function(){
		return ("0"+this.state.secondsElapsed%60).slice(-2);
	},
	getMinutes: function(){
		return Math.floor(this.state.secondsElapsed/60);
	},
	handleStartClick: function() {
		var _this = this;

		this.incrementer = setInterval(function(){
			_this.setState({
				secondsElapsed: (_this.state.secondsElapsed+1)
			});
		}, 1000);
	},
	handleStopClick: function() {
		clearInterval(this.incrementer);
		this.setState({ lastClearedIncrementer: this.incrementer})
	},
	handleLapClick: function() {
		this.setState({ laps: this.state.laps.concat([this.state.secondsElapsed])});
	},
	handleResetClick: function() {
		this.setState({ 
			secondsElapsed: 0,
			laps: []
		});
	},
	render: function(){
		return (
			<div>
				<h1>{formattedSeconds(this.state.secondsElapsed)}</h1>
				{(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer) ? 
				 <button type="button" onClick={this.handleStartClick}>Start</button> :
				 <button type="button" onClick={this.handleStopClick}>Stop</button> }
				{(this.state.secondsElapsed !== 0 && this.incrementer !== this.state.lastClearedIncrementer) ? <button type="button" onClick={this.handleLapClick}>Lap</button> : null}
				{(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer) ? <button type="button" onClick={this.handleResetClick}>Reset</button> : null}
				<ul>
					{this.state.laps.map(function(lap, idx){
						return (
							<li><strong>Lap {idx+1}</strong>/ {formattedSeconds(lap)}</li>
						);
					})}
				</ul> 
			</div>
		);
	}
});

ReactDOM.render(<MyApp />, document.getElementById("reactApp"));