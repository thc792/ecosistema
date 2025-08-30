document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.querySelector('.modal-close');

    // --- DATI DELLE AREE CLICCABILI ---
    // Ho inserito qui i dati reali del progetto basandomi sulle tue informazioni.
    const clickableAreasData = [
        {
            name: 'EditorSpartitoOnline',
            shape: 'rect',
            coords: '229,270,446,450',
            imageUrl: 'images/EditorSpartitoOnline.png',
            externalUrl: 'https://beyerop101.com/editor-spartito-online/',
            description: 'Visualizza i dettagli dell\'Editor di Spartiti Online'
        },
        {
            name: 'MidiEditor',
            shape: 'rect',
            coords: '237,500,437,667',
            imageUrl: 'images/MidiEditor.png',
            externalUrl: null, // Nessun link esterno, come confermato
            description: 'Visualizza i dettagli del MIDI Editor'
        },
        {
            name: 'PentagrammaInterattivo',
            shape: 'rect',
            coords: '236,818,441,984',
            imageUrl: 'images/PentagrammaInterattivo.png',
            externalUrl: 'https://beyerop101.com/pentagramma-interattivo/',
            description: 'Visualizza i dettagli del Pentagramma Interattivo'
        },
        {
            name: 'SpartitoPrincipale',
            shape: 'rect',
            coords: '571,628,866,887',
            imageUrl: 'images/SpartitoPrincipale.png',
            externalUrl: 'https://beyerop101.com/midi-trasformer/',
            description: 'Visualizza lo spartito e il MIDI Transformer'
        },
        {
            name: 'IAPianoTutor',
            shape: 'rect',
            coords: '1388,643,1686,902',
            imageUrl: 'images/IAPianoTutor.png',
            externalUrl: 'https://beyerop101.com/iapiano-tutor/',
            description: 'Visualizza i dettagli dell\'IA Piano Tutor'
        }
    ];

    // Funzione per creare gli elementi DOM per ogni area cliccabile
    function createClickableAreas() {
        clickableAreasData.forEach((areaData, index) => {
            const div = document.createElement('div');
            div.classList.add('clickable-area');
            div.dataset.index = index;

            const coords = areaData.coords.split(',').map(Number);
            div.style.left = `${coords[0]}px`;
            div.style.top = `${coords[1]}px`;
            div.style.width = `${coords[2] - coords[0]}px`;
            div.style.height = `${coords[3] - coords[1]}px`;

            // Aggiungi l'evento click per aprire la modale
            div.addEventListener('click', function() {
                const data = clickableAreasData[parseInt(this.dataset.index)];
                
                // Popola la modale con i dati corretti
                modalImage.src = data.imageUrl;
                
                if (data.externalUrl) {
                    modalLink.href = data.externalUrl;
                    modalLink.classList.remove('hidden');
                } else {
                    modalLink.classList.add('hidden');
                }

                // Mostra la modale
                modal.classList.add('visible');
            });

            // Aggiungi eventi per hover (mostra tooltip)
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

    // Funzione per chiudere la modale
    function closeModal() {
        modal.classList.remove('visible');
    }

    // Event listener per chiudere la modale
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        // Chiude la modale solo se si clicca sullo sfondo (overlay)
        if (e.target === modal) {
            closeModal();
        }
    });

    // Chiamata iniziale per creare le aree
    createClickableAreas();
});