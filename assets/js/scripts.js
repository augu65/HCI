(function() {
    "use strict";
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight

      if (!header.classList.contains('header-scrolled')) {
        offset -= 20
      }

      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)

    /**
     * Scroll with offset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });

    /**
     * Page Activate
     */
    window.addEventListener('load', () => {
        // Reset the form
        select('#kb-form').reset();

        // Generate UUID
        select('#uuid').value = uuidv4();
    });
    var list = [];
    /**
     * Send keystroke data to server
     */
    const postData = (event) => {
        // Create request object
        
        // Setup transmit data
        var inputName = String(event.srcElement.attributes[1].value);
        var sentenceId = inputName.slice(-1);
        var uuid = select('#uuid').value;
        var altKey = event.altKey ? 1 : 0;
        var ctrlKey = event.ctrlKey ? 1 : 0;
        var shiftKey = event.shiftKey ? 1 : 0;
		var data = {
		"uuid" : uuid,
		"sentenceId": sentenceId,
		"keyEvent": event.type,
		"keyCode": event.keyCode,
		"keyChar": event.key,
		"altKey": altKey,
		"ctrlKey": ctrlKey,
		"shiftKey": shiftKey,
		"timestamp" : new Date().getTime()
		};
        // Uncomment to enable debugging
        list.push(data);
        
    };
	const button = document.querySelector('button');
	button.addEventListener('click', event => {
		let data = {};
		data['age'] = sessionStorage.getItem('age');
		data['education']= sessionStorage.getItem('education');
		data['gender']= sessionStorage.getItem('gender');
		data['name'] = sessionStorage.getItem('name');
		data['proficiency'] = sessionStorage.getItem('proficiency');
		data['spend'] = sessionStorage.getItem('spend');
		data['keypress'] = list
		console.log(data)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://enao4ux6542qagn.m.pipedream.net", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.addEventListener("load", transferComplete);

		
		xhr.send(JSON.stringify(data));
	});
	function transferComplete(evt) {
	setTimeout(window.location.replace("/HCI/study.html"),10000)
	}
    window.addEventListener('keydown', (event) => {
        postData(event);
    });

    window.addEventListener('keyup', (event) => {
        postData(event);
    });
	
  })()

