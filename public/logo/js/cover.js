function init(){createWorld(),createPrimitive(),animation()}window.addEventListener("load",init,!1);var scene,camera,renderer,container,_width,_height,mat,Theme={_darkred:0},start=Date.now();function createWorld(){_width=window.innerWidth,_height=window.innerHeight,(scene=new THREE.Scene).background=new THREE.Color(Theme._darkred),(camera=new THREE.PerspectiveCamera(55,_width/_height,1,1e3)).position.z=6.2,(renderer=new THREE.WebGLRenderer({antialias:!0,alpha:!1})).setSize(_width,_height),(container=document.getElementById("container")).appendChild(renderer.domElement),window.addEventListener("resize",onWindowResize,!1)}function onWindowResize(){_width=window.innerWidth,_height=window.innerHeight,renderer.setSize(_width,_height),camera.aspect=_width/_height,camera.updateProjectionMatrix(),console.log("- resize -")}var _primitive,primitiveElement=function(){this.mesh=new THREE.Object3D,mat=new THREE.ShaderMaterial({wireframe:!1,uniforms:{time:{type:"f",value:0},pointscale:{type:"f",value:0},decay:{type:"f",value:0},complex:{type:"f",value:0},waves:{type:"f",value:0},eqcolor:{type:"f",value:0},fragment:{type:"i",value:!0},redhell:{type:"i",value:!0}},vertexShader:document.getElementById("vertexShader").textContent,fragmentShader:document.getElementById("fragmentShader").textContent});var e=new THREE.IcosahedronBufferGeometry(3,7),i=new THREE.Points(e,mat);this.mesh.add(i)};function createPrimitive(){_primitive=new primitiveElement,scene.add(_primitive.mesh)}var options={perlin:{vel:.002,speed:11e-5,perlins:5,decay:.2,complex:.2,waves:5,eqcolor:11,fragment:!0,redhell:!0},spin:{sinVel:0,ampVel:80}};function animation(){requestAnimationFrame(animation);var e=.003*Date.now();_primitive.mesh.rotation.y+=options.perlin.vel,_primitive.mesh.rotation.x=Math.sin(e*options.spin.sinVel)*options.spin.ampVel*Math.PI/180,mat.uniforms.time.value=options.perlin.speed*(Date.now()-start),mat.uniforms.pointscale.value=options.perlin.perlins,mat.uniforms.decay.value=options.perlin.decay,mat.uniforms.complex.value=options.perlin.complex,mat.uniforms.waves.value=options.perlin.waves,mat.uniforms.eqcolor.value=options.perlin.eqcolor,mat.uniforms.fragment.value=options.perlin.fragment,mat.uniforms.redhell.value=options.perlin.redhell,camera.lookAt(scene.position),renderer.render(scene,camera)}