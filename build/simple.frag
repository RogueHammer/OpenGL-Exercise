#version 330 core

in vec3 fN;
in vec3 fL1;
in vec3 fL2;
in vec3 fE;
in vec2 texCoord;
in mat3 TBN;

out vec4 outColor;

uniform vec4 AmbientProduct, DiffuseProduct1, SpecularProduct1, DiffuseProduct2, SpecularProduct2;
uniform mat4 ModelView;
uniform vec4 Light1Position;
uniform vec4 Light2Position;
uniform float Shininess;
uniform sampler2D texture;
uniform sampler2D normalMap;

void main()
{	

	//bump calculations
	vec3 bump = texture2D(normalMap, texCoord).rgb;
	vec3 N = normalize(bump * 2.0 - 1.0);
	N = normalize(TBN * N); 


	//lighting calculations
	vec3 E = normalize(fE);
	vec3 L1 = normalize(fL1);
	vec3 H1 = normalize( L1 + E );
	vec3 L2 = normalize(fL2);
	vec3 H2 = normalize( L2 + E );

	vec4 ambient = AmbientProduct;
	float Kd1 = max(dot(L1, N), 0.0);
	vec4 diffuse1 = Kd1*DiffuseProduct1;
	float Ks1 = pow(max(dot(N, H1), 0.0), Shininess);
	vec4 specular1 = Ks1*SpecularProduct1;

	float Kd2 = max(dot(L2, N), 0.0);
	vec4 diffuse2 = Kd2*DiffuseProduct2;
	float Ks2 = pow(max(dot(N, H2), 0.0), Shininess);
	vec4 specular2 = Ks2*SpecularProduct2;

	// discard the specular highlight if the light’s behind the vertex
	if( dot(L1, N) < 0.0 ) {
	 specular1 = vec4(0.0, 0.0, 0.0, 1.0);
	}
	if( dot(L2, N) < 0.0 ) {
	 specular2 = vec4(0.0, 0.0, 0.0, 1.0);
	}


	//final render
    outColor = (ambient + diffuse1 + specular1 + diffuse2 + specular2)* texture2D(texture,texCoord);
	outColor.a = 1.0;
}
