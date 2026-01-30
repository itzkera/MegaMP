// Configuration de l'arrière-plan et gestion du chargement
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la navigation
    function showSection(sectionId) {
        // Masquer toutes les sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section cible
        const targetSection = document.getElementById(sectionId.replace('#', ''));
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    // Attacher les événements aux liens de navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Lien Discord
            if (href.startsWith('http')) {
                window.open(href, '_blank');
                return;
            }
            
            e.preventDefault();
            showSection(href);
        });
    });

    // Gestion des boutons Retour
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('main');
        });
    });

    // Chargement de l'image de fond
    const img = new Image();
    const loadingScreen = document.getElementById('loading-screen');
    
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    img.onload = function() {
        document.body.style.backgroundImage = `url('${img.src}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        
        // Cacher l'écran de chargement après un délai
        setTimeout(hideLoadingScreen, 1000);
    };
    
    img.onerror = function() {
        console.error('Erreur de chargement de l\'image d\'arrière-plan');
        document.body.style.backgroundColor = '#0a0a1a';
        if (loadingScreen) loadingScreen.style.display = 'none';
    };
    
    img.src = 'Background.png';
    
    // Animation des logos pendant le chargement
    setTimeout(() => {
        const firstLogo = document.getElementById('first-logo');
        const secondLogo = document.getElementById('second-logo');
        
        if (firstLogo && secondLogo) {
            firstLogo.style.opacity = '0';
            firstLogo.style.transition = 'opacity 1s ease-out';
            
            setTimeout(() => {
                firstLogo.style.display = 'none';
                secondLogo.style.display = 'block';
                secondLogo.style.opacity = '0';
                secondLogo.style.transition = 'opacity 1s ease-in';
                
                setTimeout(() => {
                    secondLogo.style.opacity = '1';
                }, 100);
            }, 1000);
        }
    }, 2000);
    
    // Afficher la section principale par défaut
    showSection('main');
});

// Fonction pour télécharger le build
function downloadBuild() {
    // Créer un lien temporaire pour le téléchargement
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://r2.ploosh.dev/24.20.zip';
    downloadLink.download = '24.20.zip';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Fonction pour rediriger vers Discord
function redirectToDiscord() {
    window.open('https://discord.com/channels/1459685692253671548/1462980621788778659', '_blank');
}
