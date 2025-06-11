        document.addEventListener('DOMContentLoaded', function() {
            const header = document.getElementById('header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            const chatbotToggler = document.querySelector('.chatbot-toggler');
            const chatbot = document.querySelector('.chatbot');
            const closeChatbot = document.querySelector('.close-chatbot');
            const chatbotMessages = document.getElementById('chatbotMessages');
            const chatbotInput = document.getElementById('chatbotInput');
            const sendBtn = document.getElementById('sendBtn');

            chatbotToggler.addEventListener('click', function() {
                chatbot.classList.toggle('active');
            });

            closeChatbot.addEventListener('click', function() {
                chatbot.classList.remove('active');
            });

            function addMessage(content, type) {
                const message = document.createElement('div');
                message.classList.add('message', type);
                message.innerHTML = `<p>${content}</p>`;
                chatbotMessages.appendChild(message);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }

            function handleUserMessage() {
                const userMessage = chatbotInput.value.trim();
                if (userMessage) {
                    addMessage(userMessage, 'outgoing');
                    chatbotInput.value = '';
                    
                    setTimeout(() => {
                        let botResponse;
                        if (userMessage.toLowerCase().includes('quote') || userMessage.toLowerCase().includes('price')) {
                            botResponse = "For accurate pricing, I recommend using our <a href='#quote' style='color: #f1c40f;'>quote form</a> or trying our <a href='#calculator' style='color: #f1c40f;'>cost calculator</a>. Would you like me to guide you through the process?";
                        } else if (userMessage.toLowerCase().includes('service') || userMessage.toLowerCase().includes('offer')) {
                            botResponse = "We specialize in custom patio covers and decks (both wood and composite). You can see our <a href='#services' style='color: #f1c40f;'>services</a> or browse our <a href='#gallery' style='color: #f1c40f;'>project gallery</a>. What specifically are you interested in?";
                        } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('call')) {
                            botResponse = "You can reach us at (503) 555-1234 or via email at info@builditpdx.com. Our office hours are Mon-Fri, 8AM-5PM. Would you like me to connect you now?";
                        } else {
                            botResponse = "Thanks for your message! For more detailed assistance, you might want to check our <a href='#quote' style='color: #f1c40f;'>quote page</a> or call us directly at (503) 555-1234. How else can I help?";
                        }
                        addMessage(botResponse, 'incoming');
                    }, 1000);
                }
            }

            sendBtn.addEventListener('click', handleUserMessage);
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleUserMessage();
                }
            });

            const uploadContainer = document.getElementById('uploadContainer');
            const fileUpload = document.getElementById('fileUpload');
            const renderingResult = document.getElementById('renderingResult');
            const renderedImage = document.getElementById('renderedImage');

            uploadContainer.addEventListener('click', function() {
                fileUpload.click();
            });

            fileUpload.addEventListener('change', function(e) {
                if (e.target.files.length) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        uploadContainer.style.display = 'none';
                        renderedImage.src = event.target.result;
                        renderingResult.style.display = 'block';
                    }
                    
                    reader.readAsDataURL(file);
                }
            });

            const calculateBtn = document.getElementById('calculateBtn');
            const calculatorResult = document.getElementById('calculatorResult');

            calculateBtn.addEventListener('click', function() {
                const projectType = document.getElementById('projectType').value;
                const size = parseInt(document.getElementById('size').value);
                const material = document.getElementById('material').value;
                const complexity = document.getElementById('complexity').value;
                
                let basePrice;
                switch(projectType) {
                    case 'patio': basePrice = 35; break;
                    case 'wood': basePrice = 25; break;
                    case 'composite': basePrice = 40; break;
                    default: basePrice = 30;
                }
                
                let materialMultiplier;
                switch(material) {
                    case 'standard': materialMultiplier = 1; break;
                    case 'premium': materialMultiplier = 1.5; break;
                    case 'luxury': materialMultiplier = 2; break;
                    default: materialMultiplier = 1;
                }
                
                let complexityMultiplier;
                switch(complexity) {
                    case 'simple': complexityMultiplier = 1; break;
                    case 'moderate': complexityMultiplier = 1.3; break;
                    case 'complex': complexityMultiplier = 1.7; break;
                    default: complexityMultiplier = 1;
                }
                
                const total = size * basePrice * materialMultiplier * complexityMultiplier;
                const lowEstimate = Math.floor(total * 0.85);
                const highEstimate = Math.floor(total * 1.15);
                
                document.querySelector('.calculator-result .price').textContent = `$${lowEstimate.toLocaleString()} - $${highEstimate.toLocaleString()}`;
                calculatorResult.style.display = 'block';
                
                calculatorResult.scrollIntoView({ behavior: 'smooth' });
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            const quoteForm = document.querySelector('.quote-form');
            quoteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your request! We will contact you shortly with your free quote.');
                quoteForm.reset();
            });
        });
