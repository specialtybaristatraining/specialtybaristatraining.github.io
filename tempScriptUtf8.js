        // Guided Tour Data
        const tourSteps = [
            {
                title: "Welcome to Barista Training!",
                content: "This quick tour will show you how to use the app and get the most out of your learning experience.",
                icon: "<i class='fas fa-mug-hot text-4xl text-amber-400 mb-2'></i>"
            },
            {
                title: "Dashboard & Progress",
                content: "Track your learning progress, points, and completed lessons right from the dashboard.",
                icon: "<i class='fas fa-tachometer-alt text-4xl text-sky-400 mb-2'></i>"
            },
            {
                title: "Lessons",
                content: "Access step-by-step lessons on espresso, milk, latte art, and more. Click a lesson to start!",
                icon: "<i class='fas fa-book-open text-4xl text-green-400 mb-2'></i>"
            },
            {
                title: "Certificate",
                content: "Complete all lessons to earn a free certificate. You can also get a verified certificate for a small fee.",
                icon: "<i class='fas fa-certificate text-4xl text-amber-500 mb-2'></i>"
            },
            {
                title: "Support & Community",
                content: "Need help? Use the sidebar to access the glossary, donate, or contact us for support.",
                icon: "<i class='fas fa-hands-helping text-4xl text-purple-400 mb-2'></i>"
            },
            {
                title: "Ready to Start?",
                content: "That's it! You're ready to explore. You can revisit this tour anytime from the sidebar menu.",
                icon: "<i class='fas fa-thumbs-up text-4xl text-green-500 mb-2'></i>"
            }
        ];

        let currentTourStep = 0;

        function showTourStep(step) {
            const stepData = tourSteps[step];
            document.getElementById('tourStepContent').innerHTML = `
                ${stepData.icon}
                <h2 class="text-2xl font-bold text-amber-400 mb-2">${stepData.title}</h2>
                <p class="text-gray-200 text-base">${stepData.content}</p>
            `;
            document.getElementById('prevTourStep').style.display = step === 0 ? 'none' : '';
            document.getElementById('nextTourStep').textContent = step === tourSteps.length - 1 ? 'Finish' : 'Next';
        }

        function openGuidedTour() {
            document.getElementById('guidedTourModal').classList.remove('hidden');
            showTourStep(0);
            currentTourStep = 0;
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Show tour for new users (first visit)
            if (!localStorage.getItem('baristaTourCompleted')) {
                setTimeout(openGuidedTour, 800);
            }
            document.getElementById('closeTourModal').onclick = function() {
                document.getElementById('guidedTourModal').classList.add('hidden');
                localStorage.setItem('baristaTourCompleted', '1');
            };
            document.getElementById('nextTourStep').onclick = function() {
                if (currentTourStep < tourSteps.length - 1) {
                    currentTourStep++;
                    showTourStep(currentTourStep);
                } else {
                    document.getElementById('guidedTourModal').classList.add('hidden');
                    localStorage.setItem('baristaTourCompleted', '1');
                }
            };
            document.getElementById('prevTourStep').onclick = function() {
                if (currentTourStep > 0) {
                    currentTourStep--;
                    showTourStep(currentTourStep);
                }
            };
        });

        // Icons Guide: definitions and behavior
        const iconsHelpData = [
            { id: 'hamburgerMenu', label: 'Menu (Sidebar)', desc: 'Open or close the sidebar where you can access lessons, search, and settings.' },
            { id: 'languageToggle', label: 'Language Selector', desc: 'Switch app languages. Choose your preferred language for lessons and UI.' },
            { id: 'themeToggle', label: 'Theme Toggle', desc: 'Toggle between light and dark modes for comfortable viewing.' },
            { id: 'profileButton', label: 'Profile', desc: 'Edit your name and email used for certificates and leaderboard.' },
            { id: 'dashboardVerifiedCert', label: 'Verified Certificate', desc: 'Request a verified certificate (paid) and submit payment proof.' },
            { id: 'dashboardShop', label: 'Shop / Digital Products', desc: 'Purchase digital add-ons such as printable guides and resources.' },
            // Support button removed from the hero; donation modal still available when needed.
            { id: 'search', label: 'Search Lessons', desc: 'Quickly find lessons by keyword or topic.' },
            { id: 'getVerifiedCertificate', label: 'Get Verified (Certificate page)', desc: 'Alternate entry to request the verified certificate from the certificate page.' }
        ];

        function createIconsHelpList() {
            const list = document.getElementById('iconsHelpList');
            list.innerHTML = '';
            iconsHelpData.forEach(item => {
                const li = document.createElement('li');
                li.className = 'p-3 bg-gray-800/60 rounded-md hover:bg-gray-800 cursor-pointer flex items-start gap-3';
                li.tabIndex = 0;
                li.innerHTML = `<strong class="w-40 inline-block text-amber-300">${item.label}</strong><span class="text-sm text-gray-300">${item.desc}</span>`;
                li.onclick = () => highlightUIElement(item);
                li.onkeydown = (e) => { if (e.key === 'Enter') highlightUIElement(item); };
                list.appendChild(li);
            });
        }

        function highlightUIElement(item) {
            // close existing tooltip and remove previous highlight
            document.querySelectorAll('.help-highlight').forEach(el => el.classList.remove('help-highlight'));
            const target = document.getElementById(item.id) || document.querySelector(`[data-tooltip][title][id='${item.id}']`) || document.querySelector(`#${item.id}`);
            // special fallback: search by id in attributes
            let el = document.getElementById(item.id);
            if (!el) el = document.querySelector(`[data-tooltip='${item.id}']`) || document.querySelector(`#${item.id}`) || document.querySelector(`[title='${item.label}']`);
            if (!el) {
                // if not in DOM, show a toast inside the modal
                const toast = document.createElement('div');
                toast.className = 'inline-block bg-amber-500 text-gray-900 px-3 py-2 rounded';
                toast.textContent = `${item.label} control not found on this screen.`;
                const modal = document.querySelector('#iconsHelpModal .modal-content-area');
                modal.appendChild(toast);
                setTimeout(()=>toast.remove(),2500);
                return;
            }

            // scroll to the element if it's outside view
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            // add highlight class
            el.classList.add('help-highlight');

            // create tooltip near element
            const rect = el.getBoundingClientRect();
            const tooltip = document.createElement('div');
            tooltip.className = 'icon-help-tooltip';
            tooltip.innerHTML = `<strong>${item.label}</strong><div style="margin-top:6px">${item.desc}</div>`;
            document.body.appendChild(tooltip);
            // position tooltip above or below based on space
            const top = rect.top - tooltip.offsetHeight - 12;
            if (top > 20) {
                tooltip.style.left = Math.max(12, rect.left) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 12) + 'px';
            } else {
                tooltip.style.left = Math.max(12, rect.left) + 'px';
                tooltip.style.top = (rect.bottom + 12) + 'px';
            }

            setTimeout(()=>{
                tooltip.remove();
                el.classList.remove('help-highlight');
            }, 3500);
        }

        // Wire help button and icons modal
        document.addEventListener('DOMContentLoaded', function() {
            createIconsHelpList();
            const helpBtn = document.getElementById('helpFloatingBtn');
            const iconsModal = document.getElementById('iconsHelpModal');
            helpBtn.onclick = () => { iconsModal.classList.remove('hidden'); iconsModal.classList.add('flex'); };
            document.getElementById('closeIconsHelp').onclick = () => { iconsModal.classList.add('hidden'); };
        });

        // Testimonials wiring: open/close overlay, Shift+click on day item opens it, floating button opens it
        document.addEventListener('DOMContentLoaded', function(){
            const overlay = document.getElementById('testimonialsOverlay');
            const openBtn = document.getElementById('openTestimonialsBtn');
            const closeBtn = document.getElementById('closeTestimonialsBtn');
            const dayList = document.getElementById('dayList');

            function showTestimonials(){
                if (!overlay) return;
                overlay.classList.remove('hidden'); overlay.classList.add('flex'); overlay.setAttribute('aria-hidden','false');
                document.addEventListener('keydown', escHandler);
            }
            function hideTestimonials(){
                if (!overlay) return;
                overlay.classList.add('hidden'); overlay.classList.remove('flex'); overlay.setAttribute('aria-hidden','true');
                document.removeEventListener('keydown', escHandler);
            }
            function escHandler(e){ if (e.key === 'Escape') hideTestimonials(); }

            if (openBtn) openBtn.addEventListener('click', showTestimonials);
            if (closeBtn) closeBtn.addEventListener('click', hideTestimonials);
            if (overlay) overlay.addEventListener('click', function(e){ if (e.target === overlay) hideTestimonials(); });

            // NOTE: removed non-home triggers for testimonials
            // - Shift+click on sidebar dayList previously opened testimonials from lesson sidebar
            // - Delegated listener for [data-open-testimonials] also opened the overlay from various places
            // To ensure testimonials appear only on the home screen, those global listeners were intentionally removed.
        });
        document.getElementById('paymentProofForm').onsubmit = async function(e) {
            e.preventDefault();
            const form = e.target;
            const status = document.getElementById('paymentProofStatus');
            status.textContent = 'Uploading...';
            const data = new FormData(form);
            try {
                const res = await fetch('/api/certificate/upload-proof', { method: 'POST', body: data });
                const result = await res.json();
                if (result.success) {
                    status.textContent = 'Proof uploaded! Await admin approval.';
                    form.reset();
                } else {
                    status.textContent = 'Upload failed.';
                }
            } catch (err) {
                status.textContent = 'Error uploading proof.';
            }
        };

        // Modal Manager Extensions (kept only for payment proof modal)
        // Defer wiring until BaristaApp is available to avoid ReferenceError when scripts run earlier
        (function registerPaymentProofModalHandlers(){
            function apply() {
                if (window.BaristaApp && window.BaristaApp.modalManager) {
                    window.BaristaApp.modalManager.showPaymentProofModal = function() {
                        const el = document.getElementById('paymentProofModal');
                        if (!el) return;
                        el.classList.remove('hidden');
                        el.classList.add('flex');
                    };
                    window.BaristaApp.modalManager.closePaymentProofModal = function() {
                        const el = document.getElementById('paymentProofModal');
                        if (!el) return;
                        el.classList.add('hidden');
                        el.classList.remove('flex');
                    };
                } else {
                    // try again shortly
                    setTimeout(apply, 80);
                }
            }
            apply();
        })();

        // Shop / Product modal handlers
        function openProductModal(productId){
            const modal = document.getElementById('productModal');
            if (!modal) {
                // modal removed while shop is disabled
                alert('The shop is currently closed. Please check back later.');
                return;
            }
            const map = {
                'ebook': { title: 'Barista Interview Prep E-Book', desc: 'Ace your next barista interview with expert tips and sample questions.', price: 5, cardCheckout: '#' },
                'stencils': { title: 'Advanced Latte Art Stencil Guide', desc: 'Printable stencils and pro tips for latte art.', price: 10, cardCheckout: '#' },
                'spreadsheet': { title: 'Coffee Shop Inventory Spreadsheet', desc: 'Inventory & ordering template for small cafes.', price: 7, cardCheckout: '#' }
            };
            const p = map[productId] || map['ebook'];
            document.getElementById('productProofProductId').value = productId;
            document.getElementById('productModalTitle').textContent = p.title;
            document.getElementById('productModalDesc').textContent = p.desc;
            document.getElementById('productModalPrice').textContent = `$${p.price}`;
            const payBtn = document.getElementById('productCardLink');
            payBtn.href = p.cardCheckout || '#';
            payBtn.textContent = `Buy with Card â€” $${p.price}`;
            // local pay button wiring â€” reuse donation modal so payments use the same instructions
            document.getElementById('productLocalPayBtn').onclick = function(){
                try{
                    // Inject a short contextual note into the donation modal explaining the product and next step
                    const donationModal = document.getElementById('donationModal');
                    if (donationModal) {
                        let note = donationModal.querySelector('#donationProductNote');
                        if (!note) {
                            note = document.createElement('div');
                            note.id = 'donationProductNote';
                            note.className = 'mt-3 p-3 bg-gray-800/40 text-sm text-amber-200 rounded';
                            const header = donationModal.querySelector('.modal-content-area > h3');
                            if (header && header.parentNode) header.parentNode.insertBefore(note, header.nextSibling);
                            else donationModal.querySelector('.modal-content-area').appendChild(note);
                        }
                        note.innerHTML = `<strong>Paying for:</strong> ${p.title} &nbsp; â€” After payment, click <button class="ml-2 inline-block px-3 py-1 bg-amber-500 text-gray-900 rounded" onclick="document.getElementById('donationModal').classList.add('hidden');document.getElementById('productModal').classList.remove('hidden');document.getElementById('productModal').classList.add('flex');document.getElementById('productProofForm').classList.remove('hidden');">Upload Proof</button> to return here and upload your payment screenshot.`;
                    }
                    // Open donation modal (reuses the same QR/bank UI)
                    if (window.BaristaApp && window.BaristaApp.modalManager && window.BaristaApp.modalManager.showDonationModal) window.BaristaApp.modalManager.showDonationModal();
                    else { document.getElementById('donationModal').classList.remove('hidden'); }
                }catch(e){ console.warn('productLocalPayBtn.onclick error', e); }
            };
            document.getElementById('productModal').classList.remove('hidden');
            document.getElementById('productModal').classList.add('flex');
        }
        const closeProductBtn = document.getElementById('closeProductModal');
        if (closeProductBtn) {
            closeProductBtn.onclick = function(){
                const modal = document.getElementById('productModal'); if(modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
                const pf = document.getElementById('productProofForm'); if(pf) pf.classList.add('hidden');
            };
        }

        // Sample PDF generation (client-side preview)
        const sampleDownloadBtn = document.getElementById('productSampleDownload');
        if (sampleDownloadBtn) {
            sampleDownloadBtn.onclick = function(){
                const titleEl = document.getElementById('productModalTitle');
                const title = titleEl ? titleEl.textContent : 'Sample';
                try{
                    const { jsPDF } = window.jspdf || window.jspdf || {};
                if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined' && !window.jspdf) {
                    // fallback: create a simple Blob and download
                    const blob = new Blob([`${title}\n\nThis is a sample preview. Purchase to get the full product.`], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = `${title.replace(/\s+/g,'_')}_sample.txt`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                    return;
                }
                const doc = new jspdf.jsPDF();
                doc.setFontSize(18); doc.text(title, 15, 25);
                doc.setFontSize(12); doc.text('This is a preview of the product. Purchase to receive the full version.', 15, 40);
                doc.save(`${title.replace(/\s+/g,'_')}_sample.pdf`);
            }catch(e){
                const blob = new Blob([`${title}\n\nThis is a sample preview. Purchase to get the full product.`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = `${title.replace(/\s+/g,'_')}_sample.txt`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
            }
        };
        } // close sampleDownloadBtn if-block

        // Show proof upload form when user clicks "I've Paid"
        const _productUploadProofBtn = document.getElementById('productUploadProofBtn');
        if (_productUploadProofBtn) _productUploadProofBtn.onclick = function(){
            const _productProofFormEl = document.getElementById('productProofForm');
            if (_productProofFormEl) _productProofFormEl.classList.remove('hidden');
        };

    // Handle product proof form submission
    // Developer notes:
    // - This handler attempts to POST the proof to /api/shop/upload-proof and handles multiple response formats:
    //   1) binary (application/pdf, application/octet-stream) - downloaded via Blob
    //   2) JSON with downloadUrl - client tries to fetch the URL as a blob then falls back to opening the URL
    //   3) JSON with base64 payload (downloadBase64 + filename) - decoded and downloaded
    // - If the server does not return a downloadable resource, the handler falls back to the local sample download button (#productSampleDownload).
    // - Keep this logic in sync with server behavior. If the server uses signed URLs or requires auth, prefer returning the file bytes or a CORS-enabled pre-signed URL.
    // - Update the /api/shop/upload-proof endpoint contract before changing client logic.
    // Behavior:
    // - disable inputs during upload
    // - POST form to /api/shop/upload-proof
    // - if server returns { success: true, downloadUrl } open the URL (start download)
    // - if server returns { success: true, downloadBase64, filename } create blob and trigger download
    // - if server responds with binary (pdf/blob) download it directly
    // - fallback to client-side sample download button on error
        const _productProofForm = document.getElementById('productProofForm');
        if (_productProofForm) _productProofForm.onsubmit = async function(e){
            e.preventDefault();
            const form = e.target;
            const status = document.getElementById('productProofStatus');
            // collect interactive controls to disable
            const controls = Array.from(form.querySelectorAll('input, button, select, textarea'));
            function setDisabled(val){ controls.forEach(c=>{ try{ c.disabled = val; }catch(e){} }); }
            setDisabled(true);
            status.textContent = 'Uploading payment proof...';

            try{
                const data = new FormData(form);
                const res = await fetch('/api/shop/upload-proof', { method: 'POST', body: data });

                if (!res.ok) {
                    // if server returned a non-JSON error page, treat as failure
                    const txt = await res.text().catch(()=>'');
                    throw new Error('Server error: ' + res.status + ' ' + (txt && txt.slice(0,200)));
                }

                const contentType = (res.headers.get('content-type') || '').toLowerCase();

                // If server returned binary file directly (PDF, octet-stream)
                if (contentType.includes('application/pdf') || contentType.includes('application/octet-stream') || contentType.includes('application/zip')){
                    const blob = await res.blob();
                    const filename = (form.querySelector('[name="productId"]') && form.querySelector('[name="productId"]').value) ? `${form.querySelector('[name="productId"]').value}.pdf` : 'product_download.pdf';
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                    status.textContent = 'Download started.';
                    form.reset();
                    setDisabled(false);
                    return;
                }

                // Otherwise expect JSON with details
                const json = await res.json().catch(()=>null);
                if (json && json.success){
                    status.textContent = 'Proof uploaded! Preparing download...';
                    form.reset();

                    // 1) direct download URL
                    if (json.downloadUrl){
                        console.log('Server provided downloadUrl:', json.downloadUrl);
                        status.textContent = 'Download link received â€” attempting to fetch file...';
                        // Try to fetch the file as blob (better UX) then trigger download. If CORS blocks this, fall back to opening the URL.
                        try{
                            const downloadResponse = await fetch(json.downloadUrl, { method: 'GET' });
                            if (downloadResponse.ok) {
                                const blob = await downloadResponse.blob();
                                const filename = json.filename || (form.querySelector('[name="productId"]') && form.querySelector('[name="productId"]').value) ? `${form.querySelector('[name="productId"]').value}.pdf` : 'download.pdf';
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a'); a.href = url; a.download = json.filename || filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                                status.textContent = 'Download started.';
                                setDisabled(false);
                                return;
                            } else {
                                console.warn('Could not fetch downloadUrl as blob, status:', downloadResponse.status);
                                // fallback to opening the URL in a new tab
                                const a = document.createElement('a'); a.href = json.downloadUrl; a.target = '_blank'; if (json.filename) a.download = json.filename; document.body.appendChild(a); a.click(); a.remove();
                                status.textContent = 'Download opened in new tab. If nothing happened, check your popup blocker or contact support.';
                                setDisabled(false);
                                return;
                            }
                        }catch(fetchErr){
                            console.warn('Error fetching downloadUrl directly:', fetchErr);
                            // fallback to opening the URL in new tab
                            const a = document.createElement('a'); a.href = json.downloadUrl; a.target = '_blank'; if (json.filename) a.download = json.filename; document.body.appendChild(a); a.click(); a.remove();
                            status.textContent = 'Opened download link in a new tab. If nothing happened, your browser blocked it.';
                            setDisabled(false);
                            return;
                        }
                    }

                    // 2) server returned base64 content and filename
                    if (json.downloadBase64 && json.filename){
                        // downloadBase64 may include data: prefix or be raw base64
                        const base64 = json.downloadBase64.indexOf('base64,') !== -1 ? json.downloadBase64.split('base64,')[1] : json.downloadBase64;
                        const byteChars = atob(base64);
                        const byteNumbers = new Array(byteChars.length);
                        for (let i=0;i<byteChars.length;i++) byteNumbers[i] = byteChars.charCodeAt(i);
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: json.downloadMime || 'application/octet-stream' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = json.filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                        status.textContent = 'Download ready. Check your downloads.';
                        setDisabled(false);
                        return;
                    }

                    // 3) accepted but no file yet - inform user
                    status.textContent = json.message || 'Upload accepted. Our team will verify and send the download link via email.';
                    setDisabled(false);
                    return;
                }

                // Unexpected response shape - fallback to client-side sample
                status.textContent = 'Upload completed. Starting fallback sample download.';
                const _sampleBtn = document.getElementById('productSampleDownload'); if (_sampleBtn) _sampleBtn.click();
            }catch(err){
                console.warn('product proof upload error', err);
                status.textContent = 'Upload failed. Providing sample download as fallback.';
                const _sampleBtn = document.getElementById('productSampleDownload'); if (_sampleBtn) _sampleBtn.click();
            }finally{
                setDisabled(false);
            }
        };
