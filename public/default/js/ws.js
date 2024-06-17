if (typeof window.FontAwesomeKitConfig === 'undefined') {
	var fa = document.createElement('script');
	fa.setAttribute('src','https://kit.fontawesome.com/2a8c24321e.js');
	fa.setAttribute('crossorigin','anonymous');
	document.body.appendChild(fa);
} 

	
	function getMainDomain(url) {
		// Create a URL object from the input URL
		const urlObj = new URL(url);
		
		// Extract the hostname
		let hostname = urlObj.hostname;
		
		// Regular expression to match the domain parts
		const domainParts = hostname.split('.').reverse();
		
		// Check if the last part is a country code (e.g., co.uk, com.au)
		if (domainParts.length > 2 && domainParts[1].length == 2) {
			return domainParts[2] + '.' + domainParts[1] + '.' + domainParts[0];
		} else {
			return domainParts[1] + '.' + domainParts[0];
		}
	}


    // Function to change the background color of the :before pseudo-element
    function changePseudoElementColor(selector, newColor, pseudo) {
        // Get all stylesheets
        const styleSheets = document.styleSheets;

        // Loop through all stylesheets
        for (let i = 0; i < styleSheets.length; i++) {
            const styleSheet = styleSheets[i];
            
            try {
                // Get all CSS rules in the stylesheet
                const rules = styleSheet.cssRules || styleSheet.rules;

                // Loop through all CSS rules
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];

                    // Check if the rule is for the :before pseudo-element of the specified selector
                    if (rule.selectorText === `${selector}::${pseudo}`) {
                        // Change the background color
                        rule.style.backgroundColor = newColor;
                    }
                }
            } catch (e) {
                // Catch any potential errors (such as cross-origin stylesheets)
                console.warn("Cannot access stylesheet:", styleSheet.href, e);
            }
        }
    }









	


	



	
	
	// Create WS indicator circle
	var style = document.createElement('style');
	style.type = 'text/css'; // Set the type attribute correctly
	style.innerHTML = `
		#ws:after,#ws:before {
			content: "";
			display: block;
		}
		#ws:before {
			position: relative;
			width: 300%;
			height: 300%;
			box-sizing: border-box;
			margin-left: -100%;
			margin-top: -100%;
			border-radius: 45px;
			-webkit-animation: 1.25s cubic-bezier(.215, .61, .355, 1) infinite pulse-ring;
			animation: 1.25s cubic-bezier(.215, .61, .355, 1) infinite pulse-ring;
		}
		#ws:after {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			border-radius: 15px;
			box-shadow: 0 0 8px rgba(0, 0, 0, .3);
			-webkit-animation: 1.25s cubic-bezier(.455, .03, .515, .955) -.4s infinite pulse-dot;
			animation: 1.25s cubic-bezier(.455, .03, .515, .955) -.4s infinite pulse-dot;
		}
		@-webkit-keyframes pulsate {
			0% {
				-webkit-transform: scale(1, 1);
				opacity: 1;
			}
			100% {
				-webkit-transform: scale(1.2, 1.2);
				opacity: 0;
			}
		}
		@-webkit-keyframes pulse-ring {
			0% {
				transform: scale(.33);
			}
			100%, 80% {
				opacity: 0;
			}
		}
		@keyframes pulse-ring {
			0% {
				transform: scale(.33);
			}
			100%, 80% {
				opacity: 0;
			}
		}
		@-webkit-keyframes pulse-dot {
			0%, 100% {
				transform: scale(.8);
			}
			50% {
				transform: scale(1);
			}
		}
		@keyframes pulse-dot {
			0%, 100% {
				transform: scale(.8);
			}
			50% {
				transform: scale(1);
			}
		}
	`;
	document.getElementsByTagName('head')[0].appendChild(style);
	

	let circ = document.createElement("div");
	circ.setAttribute("id", "ws");
	
	circ.innerHTML='<i style="width: 48px;height: 48px;line-height: 48px;font-weight: 700;display: flex;align-items: center;justify-content: center;border-radius: 100%;font-size: 22px;background-color:#f1f1f121;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);" class="ws fas fa-plug fa-beat" aria-hidden="true"></i>';
	circ.style.cssText = 'position: fixed;z-index: 5;left: 25px;bottom: 25px;opacity: 0.75;transition-timing-function: ease;transition-duration: .4s;transition-property: opacity, transform;';
	document.body.appendChild(circ);
	
	// Define the WebSocket URL based on the current subdomain
	const wsUrl = `${document.URL.substring(0,5) == "http:" ? 'ws' : 'wss'}://ws.${getMainDomain(window.location.href)}`;

	// Create WebSocket connection
	const socket = new WebSocket(wsUrl);

	// Function to update status
	function updateStatus(color, title) {
		document.querySelector('.ws').style.color = color;
		document.querySelector('.ws').setAttribute('title', title);
	}

	// WebSocket event listeners
	function doping(){ socket.send("ping")}
	let ping;
	socket.onopen = () => {
		updateStatus('#13e813', "WS is Open!");
		ping = setInterval(doping, 10000);
	};

	socket.onerror = (error) => {
		console.error('WebSocket error:', error);
		updateStatus('orange', "WS Errored!");
	};

	socket.onclose = () => {
		updateStatus('#e82525', "WS is Closed!");
		clearInterval(ping);
	};