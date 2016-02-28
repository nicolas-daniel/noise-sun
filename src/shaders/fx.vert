attribute vec4 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec4 vPosition;

void main() {

	vPosition = position;

	gl_Position = projectionMatrix * modelViewMatrix * position;

}