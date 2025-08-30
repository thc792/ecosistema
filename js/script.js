document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.querySelector('.modal-close');

    // --- NUOVI DATI DELLE AREE CLICCABILI (COORDINATE RICALCOLATE) ---
    // Ho ricalcolato questi valori basandomi sull'immagine con le aree fuori posto.
    const clickableAreasData = [
        {
            name: 'EditorSpartitoOnline',
            shape: 'rect',
            coords: '228,268,448,453', // <-- Nuove coordinate
            imageUrl: 'images/EditorSpartitoOnline.png',
            externalUrl: 'https://beyerop101.com/editor-spartito-online/',
            description: 'Visualizza i dettagli dell\'Editor di Spartiti Online'
        },
        {
            name: 'MidiEditor',
            shape: 'rect',
            coords: '235,498,438,670', // <-- Nuove coordinate
            imageUrl: 'images/MidiEditor.png',
            externalUrl: null, 
            description: 'Visualizza i dettagli del MIDI Editor'
        },
        {
            name: 'PentagrammaInterattivo',
            shape: 'rect',
            coords: '235,818,442,986', // <-- Nuove coordinate
            imageUrl: 'images/PentagrammaInterattivo.png',
            externalUrl: 'https://beyerop101.com/pentagramma-interattivo/',
            description: 'Visualizza i dettagli del Pentagramma Interattivo'
        },
        {
            name: 'SpartitoPrincipale',
            shape: 'rect',
            coords: '570,628,868,890', // <-- Nuove coordinate
            imageUrl: 'images/SpartitoPrincipale.png',
            externalUrl: 'https://beyerop101.com/midi-trasformer/',
            description: 'Visualizza lo spartito e il MIDI Transformer'
        },
        {
            name: 'IAPianoTutor',
            shape: 'rect',
            coords: '1386,642,1688,905', // <-- Nuove coordinate
            imageUrl: 'images/IAPianoTutor.png',
            externalUrl: 'https://beyerop101.com/iapiano-tutor/',
            description: 'Visualizza i dettagli dell\'IA Piano Tutor'
        }
    ];

    // Funzione per creare gli elementi DOM per ogni area cliccabile
    function createClickableAreas() {
        document.querySelectorAll('.clickable-area').forEach(area => area.remove());

        clickableAreasData.forEach((areaData, index) => {
            const div = document.createElement('div');
            div.classList.add('clickable-area');
            div.dataset.index = index;

            const coords = areaData.coords.split(',').map(Number);
            div.style.left = `${coords[0]}px`;
            div.style.top = `${coords[1]}px`;
            div.style.width = `${coords[2] - coords[0]}px`;
            div.style.height = `${coords[3] - coords[1]}px`;

            div.addEventListener('click', function() {
                const data = clickableAreasData[parseInt(this.dataset.index)];
                modalImage.src = data.imageUrl;
                if (data.externalUrl) {
                    modalLink.href = data.externalUrl;
                    modalLink.classList.remove('hidden');
                } else {
                    modalLink.classList.add('hidden');
                }
                modal.classList.add('visible');
            });

            let tooltipDiv = null;
            div.addEventListener('mouseover', function() {
                const data = clickableAreasData[parseInt(this.dataset.index)];
                if (data.description) {
                    tooltipDiv = document.createElement('div');
                    tooltipDiv.classList.add('tooltip');
                    tooltipDiv.textContent = data.description;
                    document.body.appendChild(tooltipDiv);
                }
            });

            div.addEventListener('mousemove', function(e) {
                if (tooltipDiv) {
                    tooltipDiv.style.left = `${e.clientX + 15}px`;
                    tooltipDiv.style.top = `${e.clientY + 15}px`;
                }
            });

            div.addEventListener('mouseout', function() {
                if (tooltipDiv) {
                    tooltipDiv.remove();
                    tooltipDiv = null;
                }
            });

            imageContainer.appendChild(div);
        });
    }

    function closeModal() {
        modal.classList.remove('visible');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    createClickableAreas();
});