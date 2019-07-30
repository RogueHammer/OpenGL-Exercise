#ifndef GL_WINDOW_H
#define GL_WINDOW_H

#include <GL/glew.h>

#include <glm/vec3.hpp>
#include <glm/glm.hpp>

#include "geometry.h"
#include "entity.h"

class OpenGLWindow
{
public:
    OpenGLWindow();

    void initGL();
    void render();
    bool handleEvent(SDL_Event e);
    void cleanup();

private:
    SDL_Window* sdlWin;
    
    GLuint vao;
    GLuint shader;
    GLuint vertexBuffer;

    Entity parentEntity;
    Entity childEntity;

    GeometryData geometry;

    int colorIndex;
    int translateDirection;
    int rotateDirection;
    int scaleDirection;
    bool cameraOrbit;
    bool lightOrbit;
    float cameraRotation;
    float lightRotation;
    float light1Radius;
    float light2Radius;

    glm::vec4 light_ambient;
    glm::vec4 light1_position;
    glm::vec4 light1_diffuse;
    glm::vec4 light1_specular;
    glm::vec4 light2_position;
    glm::vec4 light2_diffuse;
    glm::vec4 light2_specular;
    glm::vec4 material_ambient;
    glm::vec4 material_diffuse;
    glm::vec4 material_specular;

    float material_shininess;

    glm::vec4 ambient_product;
    glm::vec4 diffuse_product1;
    glm::vec4 specular_product1;
    glm::vec4 diffuse_product2;
    glm::vec4 specular_product2;

    glm::vec3 eyeLoc;
    glm::vec3 targetLoc;
    glm::vec3 upDir;
    glm::mat4 viewingMat;
    int viewingMatrixLoc;
    GLubyte image[320][320][3];
};

#endif
