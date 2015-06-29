///<reference path='../lib/typings/react/react-global.d.ts' />
///<reference path='../lib/typings/jquery/jquery.d.ts' />
///<reference path='Net.ts' />
///<reference path='Simulation.ts' />
///<reference path='Transform.ts' />
///<reference path='NetworkVisualization.ts' />

var sim: Simulation;

$(document).ready(() => sim = new Simulation());



function checkSanity() {
	let out = [-0.3180095069079748, -0.2749093166215802, -0.038532753589859546, 0.09576201205465842, -0.3460678329225116,
		0.23218797637289554, -0.33191669283980774, 0.5140297481331861, -0.1518989898989732];
	let inp = [-0.3094657452311367, -0.2758470894768834, 0.005968799814581871, 0.13201188389211893, -0.33257930004037917,
		0.24626848078332841, -0.35734778200276196, 0.489376779878512, -0.2165879353415221];
	sim.stop();
	sim.config.inputLayer = { neuronCount: 2, names: ['', ''] };
	sim.config.hiddenLayers = [{ neuronCount: 2, activation: "sigmoid" }];
	sim.config.outputLayer = { neuronCount: 1, activation: "sigmoid", names: [''] };
	sim.net.connections.forEach((e, i) => e.weight = inp[i]);
	for (var i = 0; i < 1000; i++) sim.step();
	let realout = sim.net.connections.map(e => e.weight);
	if (realout.every((e, i) => e !== out[i])) throw "insanity!";
	return "ok";
}