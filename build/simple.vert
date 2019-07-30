#version 330 core

in vec3 position;
in vec3 normal;
in vec2 vTexCoord;
in vec3 tangent;
in vec3 bitangent;

uniform mat4 projectionMatrix;
uniform mat4 viewingMatrix;
uniform mat4 modelMatrix;
uniform vec4 Light1Position;
uniform vec4 Light2Position;

out vec3 fN;
out vec3 fE;
out vec3 fL1;
out vec3 fL2;
out vec2 texCoord;
out vec2 bumpCoord;
out mat3 TBN;


void main()
{
	//lighting
    fN = normal;
	fE = position.xyz;
	fL1 = Light1Position.xyz;
	fL2 = Light2Position.xyz;
	if( Light1Position.w != 0.0 ) {
		fL1 = Light1Position.xyz - position.xyz;
	}
	if( Light2Position.w != 0.0 ) {
		fL2 = Light2Position.xyz - position.xyz;
	}

	//texture coordinates passed to frag shader
	texCoord = vTexCoord;

	//bump mapping
	vec3 T = normalize(vec3(modelMatrix * vec4(tangent,   0.0)));
	vec3 B = normalize(vec3(modelMatrix * vec4(bitangent, 0.0)));
	vec3 N = normalize(vec3(modelMatrix * vec4(normal,    0.0)));
	TBN = mat3(T, B, N);


	gl_Position = projectionMatrix*viewingMatrix*modelMatrix*vec4(position,1.0f);
}
