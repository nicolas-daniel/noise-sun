let glslify = require('glslify');

class Form extends THREE.Object3D {

	constructor ( opt ) {

		super();

		// params
		this.opt = opt;
		this.radius = opt.radius || 100;
		this.formColor = '#111111';
		this.form = 'Sphere';

		// material
		this.material = new THREE.RawShaderMaterial({
			vertexShader: glslify('../../shaders/fx.vert'),
			fragmentShader: glslify('../../shaders/fx.frag'),
			uniforms: {
				color: { type: 'c', value: new THREE.Color(this.formColor) },
				iGlobalTime: { type: 'f', value: 0.0 }
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

	}

	update() {

		this.material.uniforms.iGlobalTime.value += 0.01;

	}
	
}

export default Form;