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
	    console.log(event.srcElement.attributes[1]);
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
			"kaitlin venneri":"nowadays, technology is very helpful in my daily work environment because all of my school work are done through the use of computers and i can stay connected",
			"david flatla":"now that tablets are so widespread, and connectivity is available via wifi as well as data plans, the devices need to be secured in such a  way that secures both the device, its contents, and the networks it is connected to",
			"amna  sohail":"apple is great however i am an android user and it is so hard to naviagate through the apple system on cell phone in my daily environment. computers are great as we need to take  information with us, however it is easy to carry the laptops to the patient vs having to run to the desk",
			"kaylee bigelow":"some of the biggest challenges that i could find utilizing technology are that now a days anybody could find anything  by looking through your computer. They can see all of your private information with a click.",
			"vinay khetwani":"two video tapes were found on this day in the town in waterloo. National services were called as the information on the tapes was top secret. the constable in charge said this set of tapes was stolen a week ago.",
			"joshua guenther":"i do not like samsung mobile phones because they get virus easy and i don't like the interface. i work as a loss prevention guard and my manager always has a tablet on her which she brings everywhere she goes.",
			"evan switzer":"there are not disadvantagages  on electronics books, it has a dictionary which can be used just by clicking a word, you can highly anything with ease and revert the process, also you can make notes and not only that, you can carry hundreds of book in that device while a physical book you can only carry one or two due to the disize of the books",
			"sushmitha badiga":"digital technology has advanced so much in such a little time. however, now there is more than we can handle with new gadgets coming out every day. It's bad for people, they don’t know how to live without it anymore.",
			"virat joshi":"shi is the most helpful tool in my work environment since we can keep track of all the employees data. It makes my job easier.",
			"harshdeep grewal":"jewellery is getting very expensive today. the prices always seem to be going up, especially in september and december. its hard enough to find nice stones and for cheap. growing up this was never a problem.",
			"madhur tyagi":"when i made my first type of card there were hundreds of people lined up to buy them. now, i practiaclly give them away because nobody wants them."
		};
		let times = parseInt(sessionStorage.getItem('times'),10);
		let odd = parseInt(sessionStorage.getItem('odd'),10);
		let random = parseInt(sessionStorage.getItem('random'),10);
		const input = document.getElementById('name_input');
		const name = document.getElementById('name');
		const sentence = document.getElementById('sentence');
		const input2 = document.getElementById('sentence_input');
		if(input.hidden == false){
			if(input.value==""){
				alert("Please enter your first and last name in the field provided");
				input.focus();
				return;
			}
		}
		else {
			if(input2.value==""){
				alert("please enter the given sentence in the field provided");
				input2.focus();
				return;
			}
		}
		if (odd == 0){
			sessionStorage.setItem('odd', 1);
			if(random < 50){
				name.hidden =false;
				input.hidden = false;
				input.focus();
				sentence.hidden = true;
				input2.hidden = true;
			}else{
				name.hidden =true;
				input.hidden = true;
				sentence.hidden = false;
				input2.hidden = false;
				input2.focus();
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
				input.focus();
			}else{
				name.hidden =true;
				input.hidden = true;
				sentence.hidden = false;
				input2.hidden = false;
				input2.focus();
			}
			if (times == 9){
				let data = {};
				data['name'] = sessionStorage.getItem('name');
				data['keypress'] = list
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "https://enao4ux6542qagn.m.pipedream.net", true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader('x-pd-upload-body', 1);
				xhr.send(JSON.stringify(data));
				xhr.onload = function() {
				if (xhr.status == 200) { 
					window.location.replace("/HCI/end.html")
				}}
			}else{
				times = times + 1
				const iteration = document.getElementById('iterations');
				iteration.innerHTML = "Iterations: "+parseInt(times+1)+"/10";
				console.log(iteration);
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
	if (event.keyCode === 13) {
		document.getElementById("submits").click();
	}
    });
	
  })()

