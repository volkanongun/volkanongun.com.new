/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Ocean shader
 */

THREE.OceanShader = {

	uniforms: {

		u_color : { type: "c", value: new THREE.Color( 0x383a49 ) }

	},

	vertexShader: [

		"varying vec3 v_objCoor;"

    "void main() {"

      "v_objCoor = position;"
      "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"

    "}"

	].join("\n"),

	fragmentShader: [

		"uniform vec3 u_color;"
    "varying vec3 v_objCoor;"

    "float remap (float value, float initStart, float initEnd, float finalStart, float finalEnd)"
    "{"
      "float mapped = (( (value - initStart) *(finalEnd - finalStart) ) / (initEnd- initStart)) + finalStart;"
      "return mapped;"
    "}"

    "void main() {"
      "vec3 cameraPos = vec3(-338.0, -48.0, 2000.0);"
      "float border = -100.0;"

      "float alpha = remap(v_objCoor.y+border, 0.0, cameraPos.z*3.0, 0.0, 1.0);"
      "float red = remap(v_objCoor.z, -500.0, 500.0, 0.8, 1.0);"
      "float green = remap(v_objCoor.z, -500.0, 500.0, 0.8, 1.0);"

      "gl_FragColor=vec4(red, green, 248.0/256.0, alpha);"

    "}"

	].join("\n")

};
