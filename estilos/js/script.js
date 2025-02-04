particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 180, 
            "density": {
                "enable": true,
                "value_area": 1000 
            }
        },
        "color": {
            "value": "#ffffff" 
        },
        "shape": {
            "type": "circle", 
        },
        "opacity": {
            "value": 0.3, 
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.3,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.2, 
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5, 
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.3 
                }
            },
            "push": {
                "particles_nb": 6 
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Garantir que o canvas está em primeiro plano para interação
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('#particles-js canvas');
    if (canvas) {
        canvas.style.zIndex = '1';
        canvas.style.pointerEvents = 'auto';
    }
});
