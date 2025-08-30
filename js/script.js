document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.querySelector('.modal-close');

    // --- TENTATIVO #3: COORDINATE FINALI BASATE SULLA CORREZIONE DEL LAYOUT GRANDE ---
    const clickableAreasData = [
        {
            name: 'EditorSpartitoOnline',
            shape: 'rect',
            coords: '220, 260, 410, 420', // <-- Correzione finale
            imageUrl: 'images/EditorSpartitoOnline.png',
            externalUrl: 'https://beyerop101.com/editor-spartito-online/',
            description: 'Visualizza i dettagli dell\'Editor di Spartiti Online'
        },
        {
            name: 'MidiEditor',
            shape: 'rect',
            coords: '235, 480, 420, 625', // <-- Correzione finale
            imageUrl: 'images/MidiEditor.png',
            externalUrl: null, 
            description: 'Visualizza i dettagli del MIDI Editor'
        },
        {
            name: 'PentagrammaInterattivo',
            shape: 'rect',
            coords: '235, 825, 430, 975', // <-- Correzione finale
            imageUrl: 'images/PentagrammaInterattivo.png',
            externalUrl: 'https://beyerop101.com/pentagramma-interattivo/',
            description: 'Visualizza i dettagli del Pentagramma Interattivo'
        },
        {
            name: 'SpartitoPrincipale',
            shape: 'rect',
            coords: '560, 620, 890, 860', // <-- Correzione finale (Ancora principale)
            imageUrl: 'images/SpartitoPrincipale.png',
            externalUrl: 'https://beyerop101.com/midi-trasformer/',
            description: 'Visualizza lo spartito e il MIDI Transformer'
        },
        {
            name: 'IAPianoTutor',
            shape: 'rect',
            coords: '1385, 630, 1680, 890', // <-- Correzione finale
            imageUrl: 'images/IAPianoTutor.png',
            externalUrl: 'https://beyerop101.com/iapiano-tutor/',
            description: 'Visualizza i dettagli dell\'IA Piano Tutor'
        }
    ];

    // (Il resto del codice rimane invariato)

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