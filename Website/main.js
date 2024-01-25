import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Criação da cena 3D
let cena = new THREE.Scene();

// Obtém a referência do elemento do canvas no HTML
let myCanvas = document.getElementById('meuCanvas');

// Declaração de variáveis para os elementos da cena
let paredeFrontal = null;
let paredeLateral = null;
let janela = null;
let janela2 = null;
let chao,CortinaD,resto,rodas1,vento,Ecra,cortinaE, Portatil,PortatilBase, PortatilTeclado,PortatilBarra, PortatilTextura, Barra, Estante, janelaTextura1,janelaTextura2,janelaTextura3, Carpet;
let rodas, base, costas, apoios;
let livro1,livro2,livro3,livro4,livro5,quadro,livro6,livro7,livro8,livro9,livro11,livro12,livro13,livro14,livro15,livro16,livro17,livro18,livro19,livro20,livro21,livro22,livro23;
let zoomInPressed = false;
let gavetaEsquerda, gavetaDireita, portaEsquerda, portaDireita; 
let zoomOutPressed = false;
const zoomSpeed = 0.02;
let gavetaDisOpen = false;
let gavetaEsqisOpen = false;
let portaDisOpen = false;
let portaEsqisOpen = false;
let janelaisOpen = false;
let isVentoON = false;
let acaoAbrirGavetaEsquerda, acaoAbrirGavetaDireita, acaoAbrirPortaEsquerda, acaoAbrirPortaDireita,acaoAbrirJanela, lvento;


// Configuração da câmera
let camara = new THREE.PerspectiveCamera(50, 1280 / 720, 0.01, 1000);
camara.position.set(0, 1, 3);

// Configuração de animações usando o Mixer do Three.js
let mixer = new THREE.AnimationMixer(cena)
let candidates = [];

// Carregamento do modelo 3D 
let carregador = new GLTFLoader();
carregador.load(
    '/blender/model/FinalFinal1.gltf', function (gltf) {
        
        //Texturas para mais tarde serem aplicadas nos objetos da secretária
        const Teste1 = gltf.scene.getObjectByName('Teste1');
        const Teste2 = gltf.scene.getObjectByName('Teste2');
        const Teste3 = gltf.scene.getObjectByName('Teste3');
        const Teste4 = gltf.scene.getObjectByName('Teste4');

        // Adição do modelo carregado à cena
        cena.add(gltf.scene);

        // Verifica se os objetos com as texturas foram encontrados e esconde-os 
        if (Teste1 && Teste2 && Teste3 && Teste4) {
            // Mete a Mesh invisível
            Teste1.visible = false;
            Teste2.visible = false;
            Teste3.visible = false;
            Teste4.visible = false;

        } else {
            console.error('A Mesh com o nome especificado não foi encontrada.');
        }
        
        //Debug nome objetos
        /*gltf.scene.traverse(function (obj) {
            if (obj instanceof THREE.Mesh) {
                console.log('Nome da Mesh:', obj.name); // Nome da mesh
                console.log('Material da Mesh:', obj.material); // Material da mesh

                console.log('---');
            }
        });*/

        // Configuração de propriedades para cada objeto Mesh no modelo
        gltf.scene.traverse( function(x) {
            if (x.isMesh) {
                x.castShadow = true;
                x.receiveShadow = true;
                x.material.side = THREE.FrontSide;
                candidates.push(x);

            }        
    });    

    // Configuração de cada animação 
    gavetaEsquerda = THREE.AnimationClip.findByName( gltf.animations, 'Gaveta_LAction' );
    acaoAbrirGavetaEsquerda = mixer.clipAction( gavetaEsquerda );
    gavetaDireita = THREE.AnimationClip.findByName( gltf.animations, 'Gaveta_RAction' );
    acaoAbrirGavetaDireita = mixer.clipAction( gavetaDireita );

    portaEsquerda = THREE.AnimationClip.findByName( gltf.animations, 'Porta_LAction' );
    acaoAbrirPortaEsquerda = mixer.clipAction( portaEsquerda );
    portaDireita = THREE.AnimationClip.findByName( gltf.animations, 'Porta_RAction' );
    acaoAbrirPortaDireita = mixer.clipAction( portaDireita );

    janela = THREE.AnimationClip.findByName( gltf.animations, 'JanelaAberta' );
    acaoAbrirJanela = mixer.clipAction( janela );

    vento = THREE.AnimationClip.findByName( gltf.animations, 'KeyAction' );
    lvento = mixer.clipAction( vento);

    }
)


function MostrarCenario(objeto){

    
    chao = cena.getObjectByName('Chao');
    Estante = cena.getObjectByName('Estante');
    paredeFrontal = cena.getObjectByName('Plane');
    paredeLateral = cena.getObjectByName('Plane001'); // Parede lateral
    cortinaE = cena.getObjectByName('CortinaE');
    CortinaD = cena.getObjectByName('CortinaD');
    Barra = cena.getObjectByName('Barra');
    janela = cena.getObjectByName('Cube007');
    janela2 = cena.getObjectByName('Cube005');
    Portatil = cena. getObjectByName('Monitor_1');
    PortatilTextura = cena. getObjectByName('Monitor_2');
    PortatilBase = cena. getObjectByName('Base');
    PortatilTeclado = cena. getObjectByName('Teclado');
    PortatilBarra = cena. getObjectByName('BarraEspaco');
    Estante = cena.getObjectByName('Estante');
    janelaTextura1 = cena.getObjectByName('Cube005_1');
    janelaTextura2 = cena.getObjectByName('Cube007_1');
    
    Carpet = cena.getObjectByName('Carpet01');
    rodas = cena.getObjectByName('Cylinder003');
    base = cena.getObjectByName('leather');
    costas = cena.getObjectByName('metal_frame');
    apoios = cena.getObjectByName('Cube013');
    resto = cena.getObjectByName('Cube013_1');
    rodas1 = cena.getObjectByName('Cylinder003_1');
    livro1 = cena.getObjectByName('book01');
    livro2 = cena.getObjectByName('book02');
    livro3 = cena.getObjectByName('book03');
    livro4 = cena.getObjectByName('book04');
    livro5 = cena.getObjectByName('book05');
    livro6 = cena.getObjectByName('book06');
    livro7 = cena.getObjectByName('book07');
    livro8 = cena.getObjectByName('book08');
    livro9 = cena.getObjectByName('book09');
    livro11 = cena.getObjectByName('book011');
    livro12 = cena.getObjectByName('book012');
    livro13 = cena.getObjectByName('book013');
    livro14 = cena.getObjectByName('book014');
    livro15 = cena.getObjectByName('book015');
    livro16 = cena.getObjectByName('book016');
    livro17 = cena.getObjectByName('book017');
    livro18 = cena.getObjectByName('book018');
    livro19 = cena.getObjectByName('book019');
    livro20 = cena.getObjectByName('book020');
    livro21 = cena.getObjectByName('book021');
    livro22 = cena.getObjectByName('book022');
    livro23 = cena.getObjectByName('book023');
    quadro = cena.getObjectByName('frame04-obj002');
    Ecra = cena.getObjectByName('Monitors');

    if (objeto) {
        // Define a visibilidade de todos os objetos como false
        chao.visible = true;
        Estante.visible = true;
        paredeFrontal.visible = true;
        paredeLateral.visible = true;
        cortinaE.visible = true;
        CortinaD.visible = true;
        Barra.visible = true;
        janela.visible = true;
        janela2.visible = true;
        Portatil.visible = true;
        Estante.visible = true;
        PortatilTextura.visible = true;
        PortatilBase.visible = true;
        PortatilTeclado.visible = true;
        PortatilBarra.visible = true;
        janelaTextura1.visible = true;
        janelaTextura2.visible = true;
       
        Carpet.visible = true;
        rodas.visible = true;
        base.visible = true;
        costas.visible = true;
        apoios.visible = true;
        resto.visible = true;
        rodas1.visible = true;
        livro1.visible = true;
        livro2.visible = true;
        livro3.visible = true;
        livro4.visible = true;
        livro5.visible = true;
        livro6.visible = true;
        livro7.visible = true;
        livro8.visible = true;
        livro9.visible = true;
        livro11.visible = true;
        livro12.visible = true;
        livro13.visible = true;
        livro14.visible = true;
        livro15.visible = true;
        livro16.visible = true;
        livro17.visible = true;
        livro18.visible = true;
        livro19.visible = true;
        livro20.visible = true;
        livro21.visible = true;
        livro22.visible = true;
        livro23.visible = true;
        quadro.visible = true;
        Ecra.visible = true;
        
    }

}

function removerCenario(objeto){

    chao = cena.getObjectByName('Chao');
    Estante = cena.getObjectByName('Estante');
    paredeFrontal = cena.getObjectByName('Plane');
    paredeLateral = cena.getObjectByName('Plane001'); // Parede lateral
    cortinaE = cena.getObjectByName('CortinaE');
    CortinaD = cena.getObjectByName('CortinaD');
    Barra = cena.getObjectByName('Barra');
    janela = cena.getObjectByName('Cube007');
    janela2 = cena.getObjectByName('Cube005');
    Portatil = cena. getObjectByName('Monitor_1');
    PortatilTextura = cena. getObjectByName('Monitor_2');
    PortatilBase = cena. getObjectByName('Base');
    PortatilTeclado = cena. getObjectByName('Teclado');
    PortatilBarra = cena. getObjectByName('BarraEspaco');
    Estante = cena.getObjectByName('Estante');
    janelaTextura1 = cena.getObjectByName('Cube005_1');
    janelaTextura2 = cena.getObjectByName('Cube007_1');
    
    Carpet = cena.getObjectByName('Carpet01');
    rodas = cena.getObjectByName('Cylinder003');
    base = cena.getObjectByName('leather');
    costas = cena.getObjectByName('metal_frame');
    apoios = cena.getObjectByName('Cube013');
    resto = cena.getObjectByName('Cube013_1');
    rodas1 = cena.getObjectByName('Cylinder003_1');
    livro1 = cena.getObjectByName('book01');
    livro2 = cena.getObjectByName('book02');
    livro3 = cena.getObjectByName('book03');
    livro4 = cena.getObjectByName('book04');
    livro5 = cena.getObjectByName('book05');
    livro6 = cena.getObjectByName('book06');
    livro7 = cena.getObjectByName('book07');
    livro8 = cena.getObjectByName('book08');
    livro9 = cena.getObjectByName('book09');
    livro11 = cena.getObjectByName('book011');
    livro12 = cena.getObjectByName('book012');
    livro13 = cena.getObjectByName('book013');
    livro14 = cena.getObjectByName('book014');
    livro15 = cena.getObjectByName('book015');
    livro16 = cena.getObjectByName('book016');
    livro17 = cena.getObjectByName('book017');
    livro18 = cena.getObjectByName('book018');
    livro19 = cena.getObjectByName('book019');
    livro20 = cena.getObjectByName('book020');
    livro21 = cena.getObjectByName('book021');
    livro22 = cena.getObjectByName('book022');
    livro23 = cena.getObjectByName('book023');
    quadro = cena.getObjectByName('frame04-obj002');
    Ecra = cena.getObjectByName('Monitors');
 

    if (objeto) {

        // Define a visibilidade de todos os objetos como false
        chao.visible = false;
        Estante.visible = false;
        paredeFrontal.visible = false;
        paredeLateral.visible = false;
        cortinaE.visible = false;
        CortinaD.visible = false;
        Barra.visible = false;
        janela.visible = false;
        janela2.visible = false;
        Portatil.visible = false;
        Estante.visible = false;
        PortatilTextura.visible = false;
        PortatilBase.visible = false;
        PortatilTeclado.visible = false;
        PortatilBarra.visible = false;
        janelaTextura1.visible = false;
        janelaTextura2.visible = false;
        
        Carpet.visible = false;
        rodas.visible = false;
        base.visible = false;
        costas.visible = false;
        apoios.visible = false;
        resto.visible = false;
        rodas1.visible = false;
        livro1.visible = false;
        livro2.visible = false;
        livro3.visible = false;
        livro4.visible = false;
        livro5.visible = false;
        livro6.visible = false;
        livro7.visible = false;
        livro8.visible = false;
        livro9.visible = false;
        livro11.visible = false;
        livro12.visible = false;
        livro13.visible = false;
        livro14.visible = false;
        livro15.visible = false;
        livro16.visible = false;
        livro17.visible = false;
        livro18.visible = false;
        livro19.visible = false;
        livro20.visible = false;
        livro21.visible = false;
        livro22.visible = false;
        livro23.visible = false;
        quadro.visible = false;
        Ecra.visible = false;
        
    }

}

/* renderer... */
let renderer = new THREE.WebGLRenderer({ canvas: myCanvas },{ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(1280 , 720);

let controls = new OrbitControls(camara, renderer.domElement); // sem o THREE.
controls.enableDamping = true;
controls.DampingFactor = 0.25;
const zoomMin = 1;
const zoomMax = 6;
controls.minDistance = zoomMin;
controls.maxDistance = zoomMax;

const skyGeo = new THREE.SphereGeometry(500, 25, 25);
const skyMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sky = new THREE.Mesh(skyGeo, skyMat);
sky.material.side = THREE.BackSide;
cena.add(sky);


// Renderizar e animar
let delta = 0;			   // tempo desde a última atualização
let relogio = new THREE.Clock(); // componente que obtém o delta
let latencia_minima = 1 / 60;    // tempo mínimo entre cada atualização

function animar() {
    
    controls.update();
    requestAnimationFrame(animar);  // agendar animar para o próximo animation frame
    delta += relogio.getDelta();    // acumula tempo que passou desde a ultima chamada de getDelta

    mixer.update(delta);
    if (delta < latencia_minima){   // não exceder a taxa de atualização máxima definida
        return;
    }
    renderer.render(cena, camara);

    delta = delta % latencia_minima;// atualizar delta com o excedente
}



// Event Listener para o botão 'btn_play_portas'
document.getElementById('btn_play_portas').addEventListener('click', function () {
    // Verifica se ambas as portas estão fechadas
    if (!portaDisOpen && !portaEsqisOpen) {
        // Abre ambas as portas
        playAnimation(acaoAbrirPortaDireita, true);
        playAnimation(acaoAbrirPortaEsquerda, true);
        portaDisOpen = true;
        portaEsqisOpen = true;
    } else if (portaDisOpen && portaEsqisOpen) {
        // Fecha ambas as portas se estiverem abertas
        playAnimation(acaoAbrirPortaDireita, false);
        playAnimation(acaoAbrirPortaEsquerda, false);
        portaDisOpen = false;
        portaEsqisOpen = false;
    } else if (portaDisOpen && !portaEsqisOpen) {
        // Abre a porta esquerda se a direita estiver aberta
        playAnimation(acaoAbrirPortaEsquerda, true);
        portaEsqisOpen = true;
    } else if (!portaDisOpen && portaEsqisOpen) {
        // Abre a porta direita se a esquerda estiver aberta
        playAnimation(acaoAbrirPortaDireita, true);
        portaDisOpen = true;
    }
});

// Event Listener para o botão 'btn_play'
document.getElementById('btn_play').addEventListener('click', function () {
    // Verifica se todas as gavetas, portas e janelas estão fechadas
    if (!gavetaDisOpen && !gavetaEsqisOpen && !portaDisOpen && !portaEsqisOpen && !janelaisOpen && !isVentoON) {
        // Abre todas as gavetas, portas e janelas
        playAnimation(acaoAbrirPortaEsquerda, true);
        playAnimation(acaoAbrirPortaDireita, true);
        playAnimation(acaoAbrirGavetaDireita, true);
        playAnimation(acaoAbrirGavetaEsquerda, true);
        playAnimation(acaoAbrirJanela, true);
        playAnimation(lvento, true);
        // Atualiza os estados para indicar que todos estão abertos
        portaDisOpen = true;
        portaEsqisOpen = true;
        gavetaDisOpen = true;
        gavetaEsqisOpen = true;
        janelaisOpen = true;
        isVentoON = true;
    } else {
        // Fecha todas as gavetas, portas e janelas se alguma estiver aberta
        playAnimation(acaoAbrirPortaEsquerda, false);
        playAnimation(acaoAbrirPortaDireita, false);
        playAnimation(acaoAbrirGavetaDireita, false);
        playAnimation(acaoAbrirGavetaEsquerda, false);
        playAnimation(acaoAbrirJanela, false);
        playAnimation(lvento, false);
        // Atualiza os estados para indicar que todos estão fechados
        portaDisOpen = false;
        portaEsqisOpen = false;
        gavetaDisOpen = false;
        gavetaEsqisOpen = false;
        janelaisOpen = false;
        isVentoON = false;
    }
});

// Event Listener para o botão 'btn_play_gavetas'
document.getElementById('btn_play_gavetas').addEventListener('click', function () {
    // Verifica se ambas as gavetas estão fechadas
    if (!gavetaDisOpen && !gavetaEsqisOpen) {
        // Abre ambas as gavetas
        playAnimation(acaoAbrirGavetaDireita, true);
        playAnimation(acaoAbrirGavetaEsquerda, true);
        gavetaDisOpen = true;
        gavetaEsqisOpen = true;
    } else if (gavetaDisOpen && gavetaEsqisOpen) {
        // Fecha ambas as gavetas se estiverem abertas
        playAnimation(acaoAbrirGavetaDireita, false);
        playAnimation(acaoAbrirGavetaEsquerda, false);
        gavetaDisOpen = false;
        gavetaEsqisOpen = false;
    } else if (gavetaDisOpen && !gavetaEsqisOpen) {
        // Abre a gaveta esquerda se a direita estiver aberta
        playAnimation(acaoAbrirGavetaEsquerda, true);
        gavetaEsqisOpen = true;
    } else if (!gavetaDisOpen && gavetaEsqisOpen) {
        // Abre a gaveta direita se a esquerda estiver aberta
        playAnimation(acaoAbrirGavetaDireita, true);
        gavetaDisOpen = true;
    }
});


document.getElementById('btn_janela').addEventListener('click', function () {
    // Verifica se a janela está aberta para dar play na animação do vento
    if (!janelaisOpen) {
        playAnimation(acaoAbrirJanela, true);
        playVento(lvento, true);
        janelaisOpen = true;
        isVentoON = true;
    } else {
        playVento(lvento, false);
        isVentoON = false;

        setTimeout(function () {
            playAnimation(acaoAbrirJanela, false);
            janelaisOpen = false;
        }, 3000); // Atraso de 3000 milissegundos (3 segundos)
    }
});


function playVento(action, reverse) {
    action.paused = false;
    action.enabled = true;
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce, 0);

    if (reverse) {
        // Configura a animação para reprodução reversa

        action.timeScale = 0.5;
        if (action.time === action.getClip().duration) {
            action.time = 0;
        }
    } else {
        // Configura a animação para reprodução normal
        action.timeScale = -0.5;
        if (action.time === 0) {
            action.time = action.getClip().duration;
        }
    }

    // Inicia a animação
    action.play();
}
// Função para reproduzir uma animação com opção de reprodução reversa
function playAnimation(action, reverse) {
    action.paused = false;
    action.enabled = true;
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce, 0);

    if (reverse) {
        // Configura a animação para reprodução reversa

        action.timeScale = 0.2;
        if (action.time === action.getClip().duration) {
            action.time = 0;
        }
    } else {
        // Configura a animação para reprodução normal
        action.timeScale = -0.2;
        if (action.time === 0) {
            action.time = action.getClip().duration;
        }
    }

    // Inicia a animação
    action.play();
}


var lowBtn = document.getElementById('low-btn');
var mediumBtn = document.getElementById('medium-btn');
var highBtn = document.getElementById('high-btn');
var luzDirecional = criarLuzDirecional(4, 10000);  // Initialize the directional light with default values

function criarLuzDirecional(intensity, mapSize, blur) {
    const luzDirecional = new THREE.DirectionalLight("white");
    luzDirecional.position.set(2, 2, 0);
    luzDirecional.intensity = intensity;

    // Qualidade das Sombras
    luzDirecional.shadow.mapSize.width = mapSize;
    luzDirecional.shadow.mapSize.height = mapSize;
    luzDirecional.castShadow = true;
    luzDirecional.shadow.bias = -0.000009;
    luzDirecional.shadow.radius = 1;


    luzDirecional.shadow.map = new THREE.WebGLRenderTarget(mapSize, mapSize);
    luzDirecional.shadow.material = new THREE.ShadowMaterial({ blur: blur });

    cena.add(luzDirecional);

    return luzDirecional;
}

function updateShadowQuality(intensity, mapSize, blur) {
    luzDirecional.intensity = intensity;
    luzDirecional.shadow.mapSize.width = mapSize;
    luzDirecional.shadow.mapSize.height = mapSize;
    luzDirecional.shadow.material.blur = blur;
    luzDirecional.shadow.map = new THREE.WebGLRenderTarget(mapSize, mapSize);
}

lowBtn.addEventListener('click', function () {
    setShadowQuality('baixo');
    updateShadowQuality(3, 1000, 1); // Adjust the blur value as needed
});

mediumBtn.addEventListener('click', function () {
    setShadowQuality('medio');
    updateShadowQuality(3, 5000, 1); // Adjust the blur value as needed
});

highBtn.addEventListener('click', function () {
    setShadowQuality('alto');
    updateShadowQuality(3, 13000, 10); // Adjust the blur value as needed
});



function luzes(cena) {
    /* luzes... */
    const luzAmbiente = new THREE.AmbientLight("white");
    cena.add(luzAmbiente);

    /* point light */
    const luzPonto = new THREE.PointLight("white");
    luzPonto.position.set(0, 2, 2); //frente
    luzPonto.intensity = 6;
    cena.add(luzPonto);
    

    const luzEsquerda = new THREE.PointLight("white");
    luzEsquerda.position.set(0, 2, 2); //trás
    luzEsquerda.intensity = 2;
    cena.add(luzEsquerda);

    const luzTrasMesa = new THREE.PointLight("white");
    luzTrasMesa.position.set(2, 2, 0); // Direita
    luzTrasMesa.intensity = 0; // Ajuste a intensidade conforme necessário
    cena.add(luzTrasMesa);

    const luzTrasMesa1 = new THREE.PointLight("white");
    luzTrasMesa1.position.set(-2, 0, 2); //Esquerta
    luzTrasMesa1.intensity = 0; // Ajuste a intensidade conforme necessário
    cena.add(luzTrasMesa1);

    
}


function zoomIn() {

    camara.position.multiplyScalar(0.996); // You can adjust the factor as needed
   
}

// Function to handle zoom out
function zoomOut() {

    camara.position.multiplyScalar(1.004); // You can adjust the factor as needed

}

function resetCamera() {
    camara.position.set(0, 1, 3); // Set the desired position
}

document.getElementById('zoomInButton').addEventListener('mousedown', function() {
    zoomInPressed = true;
    zoomOutPressed = false;
    zoomLoop();
});

document.getElementById('zoomOutButton').addEventListener('mousedown', function() {
    zoomOutPressed = true;
    zoomInPressed = false;
    zoomLoop();
});

document.addEventListener('mouseup', function() {
    zoomInPressed = false;
    zoomOutPressed = false;
});

document.getElementById('resetButton').addEventListener('click', function() {
    resetCamera();
});


function zoomLoop() {
    if (zoomInPressed) {
        zoomIn();
    } else if (zoomOutPressed) {
        zoomOut();
    }

    if (zoomInPressed || zoomOutPressed) {
        requestAnimationFrame(zoomLoop);
    }
}

function toggleShadows() {
    // Toggle shadows in the renderer
    renderer.shadowMap.enabled = !renderer.shadowMap.enabled;

    // Toggle shadows for each candidate mesh
    candidates.forEach(function (mesh) {
        mesh.castShadow = !mesh.castShadow;
        mesh.receiveShadow = !mesh.receiveShadow;
        
    });

    // Update the button style and text
    toggleButtonS();
}

function toggleButtonS() {
    
    var button = document.getElementById('btn_sombras');

    // Toggle the background color and text color
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
        button.innerHTML = 'Desligar Sombras ';
    } else {
        button.classList.add('active');
        button.style.backgroundColor = 'black'; // Change to desired 'on' color
        button.style.color = 'white'; // Change to desired 'on' color
        button.innerHTML = 'Ligar Sombras '; // Change to desired 'on' text
    }
}

document.getElementById('btn_sombras').addEventListener('click', function () {
    toggleShadows();
});




function TrocarMaterial(objeto) {
    let tampo = cena.getObjectByName('Tampo');
    let Nicho = cena.getObjectByName('Cube004');
    let trasSecretaria = cena.getObjectByName('Tampo_2');
    const Pes = cena.getObjectByName('Pes');

    const outraMesh = cena.getObjectByName(objeto);

   
    if (tampo && outraMesh && Nicho && trasSecretaria && Pes) {
        // Atribua o material da outraMesh ao tampo.
        tampo.material = outraMesh.material;
        Nicho.material = outraMesh.material;
        trasSecretaria.material = outraMesh.material;
        Pes.material = outraMesh.material;
 

    } else {
        console.error('Uma das Meshes com o nome especificado não foi encontrada.');
    }

}

document.getElementById('menu_cores').onchange = function(){    
    switch(this.value){
        case '1':
            TrocarMaterial('Teste4');
            break;

        case '2':
            TrocarMaterial('Teste3');
            break;

        case '3':
            TrocarMaterial('Teste1');
        break;

        case '4':
            TrocarMaterial('Teste2');
        break;
    }
}


function buttons(){

    document.getElementById('btn_cenario').onclick = function(){
        camara.position.set(0,2,4);
        camara.lookAt(0,0,0);
        MostrarCenario(true);
        
    }

    document.getElementById('btn_retirar_cenario').onclick = function(){
        camara.position.set(0,1,3);
        camara.lookAt(0,0,0);
        removerCenario(true);
    }


    document.getElementById('menu_movel').onchange = function(){    
        switch(this.value){
            case '1':
                camara.position.set(0, 1, 3);//frente
                break;
            case '2':
                camara.position.set(0, 1, -3);//Atrás
                break;
            case '3':
                camara.position.set(-3, 1, 0);//esquerda
                break;
            case '4':
                camara.position.set(3, 1, 0);//direira
                break;
            case '5':
                camara.position.set(0, 3, 0);//cima
                break;
            case '6':
                camara.position.set(0, -3, 0);//baixo
                break;
        }
    }

}

function getVisibleObjects(scene) {
    let visibleObjects = [];
    scene.traverse((object) => {
        if (object.isMesh && object.visible) {
            visibleObjects.push(object);
        }
    });
    return visibleObjects;
}

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

myCanvas.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camara);
    let visibleObjects = getVisibleObjects(cena);
    let intersects = raycaster.intersectObjects(visibleObjects, true);

    if (intersects.length > 0) {
        let objectName = intersects[0].object.name;

        switch (objectName) {
            case 'Cube003':
                toggleGavetaEsquerda();
                break;
            case 'Cube021':
                toggleGavetaDireita();
                break;
            case 'Cube019_1':
            case 'Cube019':
                togglePortaEsquerda();
                break;
            case 'Cube015_1':
            case 'Cube015':
                togglePortaDireita();
                break;
            case 'Cube007':
            case 'Cube005':
                toggleJanela();
        }
    }
}

function togglePortaEsquerda() {
    playAnimation(acaoAbrirPortaEsquerda, !portaEsqisOpen);
    portaEsqisOpen = !portaEsqisOpen;
}

function togglePortaDireita() {
    playAnimation(acaoAbrirPortaDireita, !portaDisOpen);
    portaDisOpen = !portaDisOpen;
}

function toggleGavetaEsquerda() {
    playAnimation(acaoAbrirGavetaEsquerda, !gavetaEsqisOpen);
    gavetaEsqisOpen = !gavetaEsqisOpen;
}

function toggleGavetaDireita() {
    playAnimation(acaoAbrirGavetaDireita, !gavetaDisOpen);
    gavetaDisOpen = !gavetaDisOpen;
}

function toggleJanela() {
    playAnimation(acaoAbrirJanela, !janelaisOpen);
    janelaisOpen = !janelaisOpen;
}

window.onclick = function (evento) {
    const rect = myCanvas.getBoundingClientRect(); // Buscar a dimensao do canvas
    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    mouse.x = (x / rect.width) * 2 - 1;
    mouse.y = (y / rect.height) * -2 + 1;

    onMouseClick(evento);
};

luzes(cena);
animar();
buttons();


