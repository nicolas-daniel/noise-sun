class Sun extends THREE.Object3D {

	constructor () {

		super();

		// params
		this.sunColor = '#ff9500';

		// material
		this.material = new THREE.MeshBasicMaterial({ color:0xff9500 }); 

		// geometry
		this.geometry = new THREE.SphereGeometry( 100, 32, 32 );

		// mesh
		this.mesh = new THREE.Mesh( this.geometry, this.material );

		// gui
		this.initGui();

		this.add( this.mesh );

	}

	initGui () {

		let color = window.gui.addColor(this, 'sunColor');
		color.onChange(() => {
			this.mesh.material.color.setHex( this.sunColor.replace( '#','0x' ) );
		});

	}

	update() {


	}
	
}

export default Sun;