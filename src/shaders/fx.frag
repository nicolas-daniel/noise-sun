#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform vec3 color;
uniform float iGlobalTime;
uniform float noiseSpeed;
uniform float noiseSize;

varying vec4 vPosition;

#pragma glslify: noise = require('glsl-noise/simplex/4d')
#pragma glslify: aastep = require('glsl-aastep')

void main() {

	float alpha = 0.0;

	alpha += 1.0 * aastep(1.0, 1.0 + 0.1 * noise(vec4(vec3(vPosition * (0.95 - noiseSize) * 20.0 * 0.005), iGlobalTime * noiseSpeed)));

	gl_FragColor = vec4(color, alpha);

}