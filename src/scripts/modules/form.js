let glslify = require('glslify');

class Form extends THREE.Object3D {

	constructor ( opt ) {

		super();

		// params
		this.opt = opt;
		this.radius = opt.radius || 100;
		this.formColor = '#111111';
		this.form = 'Sphere';
		this.noiseSpeed = 1.0;
		this.noiseSize = 1.0;

		// material
		this.material = new THREE.RawShaderMaterial({
			vertexShader: glslify('../../shaders/fx.vert'),
			fragmentShader: glslify('../../shaders/fx.frag'),
			uniforms: {
				color: { type: 'c', value: new THREE.Color(this.formColor) },
				iGlobalTime: { type: 'f', value: 0.0 },
				noiseSpeed: { type: 'f', value: this.noiseSpeed },
				noiseSize: { type: 'f', value: this.noiseSize }
			},
			transparent: true,
			depthTest: false
		});

		// geometry
		this.geometry = new THREE.SphereGeometry( 150, 32, 32 );

		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		// gui
		this.initGui();

		this.add( this.mesh );

	}

	initGui () {

		let geometry = window.gui.add(this, 'form', [ 'Sphere','Cube','Icosahedron' ] );
		geometry.onChange((geometry) => {
			this.remove(this.mesh);
			switch ( geometry ) {
				case 'Sphere':
					this.geometry = new THREE.SphereGeometry( 150, 32, 32 );
					break;
				case 'Cube':
					this.geometry = new THREE.BoxGeometry( 220, 220, 220 );
					break;
				case 'Icosahedron':
					this.geometry = new THREE.IcosahedronGeometry( 150, 0 );
					break;
			}
			this.mesh = new THREE.Mesh( this.geometry, this.material );
			this.add( this.mesh );
		});

		let color = window.gui.addColor(this, 'formColor');
		color.onChange(() => {
			this.material.uniforms.color.value = new THREE.Color(this.formColor);
		});

		window.gui.add(this, 'noiseSpeed', 1.0, 10.0 );
		window.gui.add(this, 'noiseSize', 0.0, 1.0 );

	}

	update() {

		this.material.uniforms.iGlobalTime.value += 0.01;
		this.material.uniforms.noiseSpeed.value = this.noiseSpeed;
		this.material.uniforms.noiseSize.value = this.noiseSize;

	}
	
}

export default Form;