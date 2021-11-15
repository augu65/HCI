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
        let id = sessionStorage.getItem('times');
        // Setup transmit data
        var inputName = String(event.srcElement.attributes[1].value);
        var sentenceId = inputName.slice(-1);
        var uuid = select('#uuid').value;
        var altKey = event.altKey ? 1 : 0;
        var ctrlKey = event.ctrlKey ? 1 : 0;
        var shiftKey = event.shiftKey ? 1 : 0;
		var data = {
		"uuid" : uuid,
		"sentenceId": sentenceId+"."+id,
		"keyEvent": event.type,
		"keyCode": event.keyCode,
		"keyChar": event.key,
		"altKey": altKey,
		"ctrlKey": ctrlKey,
		"shiftKey": shiftKey,
		"timestamp" : new Date().getTime()
		};
		console.log(data);
        // Uncomment to enable debugging
        list.push(data);
        
    };
	const button = document.querySelector('button');
	button.addEventListener('click', event => {
		let sent_list = {
			"jason ceci":"apple the reason for this is because  I thought  apple has beautiful devices, though i have decided to stick with what has worked for me throughout the years",
			"farhan chowdhury":"to solve these issues you should follow the directions on how to make your battery last longer which includes not leaving it plugged in to over charge and also letting the device die completely then charging it",
			"sara el-shawa":"the disadvantages of not having a kindle as you saw is that you will have to buy the book in any book store or online, pay for shipping cost, but you will be able to feel the pages, you can lend the book to whoever you want and also you could keep it for your own library",
			"jordan evans":"carrying  various chargers around is always a wise idea even if it means awkwardly sitting in a starbucks huddled around a used iphone.I enjoy samsung phones much more over iphones though i see the benefits of an apple smartphone device makes.",
			"connor geddes":"getting my laptop to connect to my phones hotspot can be tiresome at times. especially when I am in bed or if outside in a backyard. It makes taking notes or looking up an address a real pain.",
			"viraj guntamukkala":"they dont have the same procesing  power of a regular vidtuk but they make up for it with the endless number of applications that are available to aid us with almost every unthinkable task",
			"sohail habib":"you also have features available like bookmarking websites like bibme which can cite websites for you", 
			"fatemeh haghighi":"for me as franchise company most of our orders are coming from the website. imagines we close the store door but we are still getting orders from the web. Fate being on our side we could make such a high profit margin without the added overhead.",
			"mahmoud hazari":"carrying  various chargers around is always a wise idea even if it means awkwardly sitting in a starbucks huddled around a used iphone.I enjoy samsung phones much more over iphones though i see the benefits of an apple smartphone device makes.", 
			"nathan laundry":"well i personally do have a tablet and laptop but i prefer the laptop much more because it is bigger and easy to use because it has a keyboard unlike the apple tablet i've  adopted  over the year.",
			"wan qing li":"battery life is definitely an issue, i am always looking for a place to plug ",
			"cathrine nayrouz":"nowadays, technology is very helpful in my daily work environment because all of my school work are done through the use of computers.",
			"sina radpour":"i would have to work many extra hours, if i was teaching these classes using traditional paper and pencil methods",
			"yukun shi":"the yukon money count after the gold rush was higher than she thought.",
			"jonah stegman":"and while they're certainly functional and easy to operate, my job may have ended in disaster itself if i did not have a phone and access to the web at all times to check information or being in touch with my boss",
			"kevin sullivan":"i also load alot of music, pictures and apps on my samsung phone and it allows me to add an internal memory card for a few bucks unlike the iphone in order to get more space on your phone you have to use cloud device storage",
			"kaitlin venneri":"nowadays, technology is very helpful in my daily work environment because all of my school work are done through the use of computers and i can stay connected"

		};
		let times = parseInt(sessionStorage.getItem('times'),10);
		let odd = parseInt(sessionStorage.getItem('odd'),10);
		let random = parseInt(sessionStorage.getItem('random'),10);
		const input = document.getElementById('name_input');
		const name = document.getElementById('name');
		const sentence = document.getElementById('sentence');
		const input2 = document.getElementById('sentence_input');
		if (odd == 0){
			sessionStorage.setItem('odd', 1);
			if(random < 50){
			name.hidden =false;
			input.hidden = false;
			sentence.hidden = true;
			input2.hidden = true;
			}else{
			name.hidden =true;
			input.hidden = true;
			sentence.hidden = false;
			input2.hidden = false;
			}
		}else{
			random = Math.floor((Math.random() * 100) + 1);
			sessionStorage.setItem('random',random);
			sessionStorage.setItem('odd', 0);
			if(random > 50){
				name.hidden =false;
				input.hidden = false;
				sentence.hidden = true;
				input2.hidden = true;
			}else{
				name.hidden =true;
				input.hidden = true;
				sentence.hidden = false;
				input2.hidden = false;
			}
			if (times == 4){
				let data = {};
				data['name'] = sessionStorage.getItem('name');
				data['keypress'] = list
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "https://enao4ux6542qagn.m.pipedream.net", true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(data));
				xhr.onload = function() {
				if (xhr.status == 200) { 
					window.location.replace("/HCI/end.html")
				}}
			}else{
				times = times + 1
				sessionStorage.setItem('times',times);
			}
		}
		if (sessionStorage.getItem('name') in sent_list){
			sentence.innerHTML = sent_list[sessionStorage.getItem('name')];
		}
		input.value = "";
		input2.value = "";
	});
    window.addEventListener('keydown', (event) => {
        postData(event);
    });

    window.addEventListener('keyup', (event) => {
        postData(event);
    });
	
  })()

